"use strict";

import {upperFirst, comparePoints} from "./functions.js";

/**
 * This Listener triggers events, when something happens on a phisical game controller.
 * Start the listening period with the {@link ControllerListener.start()} method
 */
export default class ControllerListener {
	
	constructor() {
		this._gamepads = [];
		
		this._onEventDisconnect = () => {};
		this._onEventConnect = () => {};
		
		this._btnCallbackPressed = () => {};
		this._btnCallbackDown = () => {};
		this._btnCallbackUp = () => {};
		
		this._dpadEventPressed = () => {};
		this._dpadEventDown = () => {};
		this._dpadEventUp = () => {};
		this._minDelta = 0.8;
		
		this._intervalDelay = 10;
		
		window.addEventListener("gamepadconnected", this._scanAddGamePads.bind(this));
		window.addEventListener("gamepaddisconnected", this._scanRemoveGamePads.bind(this));
	}
	
	/**
	 * This function starts the listenning period
	 */
	start() {
		if(this._loopInterval) return;
		this._scanAddGamePads();
		this._loopInterval = setInterval(this._loop.bind(this), this._intervalDelay);
	}
	
	/**
	 * This function stops the listenning period
	 * @returns {boolean} It returns true, when the interval was terminated successfully and it returns false, when
	 * no intervall was defined in the past
	 */
	stop() {
		if(this._loopInterval) {
			clearInterval(this._loopInterval);
			return true;
		}
		return false;
	}
	
	_loop() {
		
		for(let pad of this._gamepads) {
			navigator.getGamepads();
			let nowPressedButtons = [];
			// Buttons
			for(let nr = 0; nr < pad.buttons.length; nr++) {
				let btn = pad.buttons[nr];
				btn.nr = nr;
				
				if(!btn.pressed) continue;
				
				if(!pad._btnLast.includes(nr)) {
					pad._btnLast.push(nr);
					this._btnCallbackDown({id: pad.id, index: pad.index}, btn);
				}
				
				this._btnCallbackPressed({id: pad.id, index: pad.index}, btn);
				nowPressedButtons.push(nr);
			}
			
			for(let last of pad._btnLast) {
				if(!nowPressedButtons.includes(last)) {
					let btn = pad.buttons[last];
					btn.nr = last;
					this._btnCallbackUp({id: pad.id, index: pad.index}, btn);
				}
			}
			pad._btnLast = nowPressedButtons;
			
			let axis0 = pad.axes[0];
			let axis1 = pad.axes[1];
			// D-Pad axes
			let cord = DIRECTION.WAITING.clone();
			if(Math.abs(axis0) + Math.abs(axis1) >= this._minDelta) {
				if(axis0 > this._minDelta / 2) cord.x = 1;
				else if(axis0 < -this._minDelta / 2) cord.x = -1;
				
				if(axis1 > this._minDelta / 2) cord.y = 1;
				else if(axis1 < -this._minDelta / 2) cord.y = -1;
				
				if(cord.x !== 0 && cord.y !== 0) {
					if(pad._multiKeyPresses) continue;
					if(cord.x === pad._axisLast.x) cord.x = 0;
					else if(cord.y === pad._axisLast.y) cord.y = 0;
					else cord = DIRECTION.WAITING.clone();
					pad._multiKeyPresses = true;
				} else {
					pad._multiKeyPresses = false;
				}
			}
			
			if(cord.x === 0 && cord.y === 0) cord = DIRECTION.WAITING;
			if(cord.x === 1 && cord.y === 0) cord = DIRECTION.RIGHT;
			if(cord.x === 0 && cord.y === 1) cord = DIRECTION.DOWN;
			if(cord.x === -1 && cord.y === 0) cord = DIRECTION.LEFT;
			if(cord.x === 0 && cord.y === -1) cord = DIRECTION.UP;
			
			if(!comparePoints(cord, DIRECTION.WAITING)) {
				this._dpadEventPressed({id: pad.id, index: pad.index}, cord);
			}
			
			if(comparePoints(cord, pad._axisLast)) continue;
			
			if(!comparePoints(pad._axisLast, DIRECTION.WAITING)) {
				this._dpadEventUp({id: pad.id, index: pad.index}, pad._axisLast);
			}
			if(!comparePoints(cord, DIRECTION.WAITING)) {
				this._dpadEventDown({id: pad.id, index: pad.index}, cord);
			}
			
			pad._axisLast = cord.clone();
		}
	}
	
	_scanAddGamePads() {
		let navigatorGamepads = Object.values(navigator.getGamepads()) || [];
		
		for(let pad of navigatorGamepads) {
			if(!pad || this._gamepads.includes(pad)) continue;
			pad._btnLast = [];
			pad._axisLast = DIRECTION.WAITING.clone();
			pad._multiKeyPresses = false;
			this._gamepads.push(pad);
			this._onEventConnect(pad);
		}
	}
	
	_scanRemoveGamePads() {
		let navigatorGamepads = Object.values(navigator.getGamepads()) || [];
		for(let pad of this._gamepads.filter(x => !navigatorGamepads.includes(x)) || []) {
			this._onEventDisconnect(pad);
		}
		
		this._gamepads = this._gamepads.filter(x => navigatorGamepads.includes(x)) || [];
	}
	
	/**
	 * This function is used to set the induvidually events.
	 * <ul><li>pressed</li>
	 *     <li>up</li>
	 *     <li>down</li></ul>
	 * @param {String} key - The name of the event
	 * @param {function(String: name, Object: button)} callback - The function, which is going to be called
	 */
	setButtonCallback(key, callback) {
		this["_btnCallback" + upperFirst(key.toLowerCase())] = callback;
	}
	
	/**
	 * This function is used to set the induvidually events.
	 * <ul><li>pressed</li>
	 *     <li>up</li>
	 *     <li>down</li></ul>
	 * @param {String} key - The name of the event
	 * @param {function(String: name, Object)} callback - The function, which is going to be
	 * called
	 */
	setDPadCallback(key, callback) {
		this["_dpadEvent" + upperFirst(key.toLowerCase())] = callback;
	}
	
	/**
	 * This function is used to set the global events.
	 * <ul><li>connect</li>
	 *     <li>disconnect</li></ul>
	 * @param {String} key - The name of the event
	 * @param {function(Object: pad)} callback - The function, which is going to be
	 * called
	 */
	setGlobalEvents(key, callback) {
		this["_onEvent" + upperFirst(key.toLowerCase())] = callback;
	}
	
	/**
	 * This function sets the accurancy (a float between 0 and 1) for the dpad trigger event
	 * @param {number} accurancy
	 */
	setDpadDelta(accurancy) {
		this._minDelta = Math.abs(accurancy);
	}
	
	/**
	 * Set the delay between the intervals.
	 * After the change, you need to {@link reload()}
	 * @param {number} delay
	 */
	setIntervalDelay(delay) {
		this._intervalDelay = delay;
	}
	
	/**
	 * This function reloads the delay in the interval
	 */
	reload() {
		this.stop();
		this.start();
	}
}