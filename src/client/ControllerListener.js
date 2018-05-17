"use strict";

const CONST = require("../../src/core/Const.js");
const Functions = require("../core/Functions.js");

/**
 * This Listener triggers events, when something happens on a phisical game controller.
 * Start the listening period with the {@link ControllerListener.start()} method
 */
module.exports = class ControllerListener {
	
	constructor() {
		this._gamepads = new Map();
		
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
		
		window.addEventListener("gamepadconnected", this._preOnEventConnect.bind(this));
		window.addEventListener("gamepaddisconnected", this._preOnEventDisconnect.bind(this));
	}
	
	_preOnEventConnect(pad) {
		let i = String(pad.gamepad.index);
		let obj = {};
		obj.index = i;
		obj.data = pad.gamepad;
		obj._btnLast = [];
		obj._axisLast = CONST.DIRECTION.WAITING.clone();
		obj._multiKeyPresses = false;
		this._gamepads.set(i, obj);
		this._onEventConnect(this._gamepads.get(i));
	}
	
	_preOnEventDisconnect(pad) {
		let i = String(pad.gamepad.index);
		let deletedPad = this._gamepads.get(i);
		this._gamepads.delete(i);
		this._onEventDisconnect(deletedPad);
	}
	
	/**
	 * This function starts the listenning period
	 */
	start() {
		if(this._loopInterval) return;
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
		
		for(let e of Object.values(navigator.getGamepads())) {
			if(e) {
				this._gamepads.get(String(e.index)).data = e;
			}
		}
		
		for(let [padI, pad] of this._gamepads) {
			let nowPressedButtons = [];
			// Buttons
			for(let nr = 0; nr < pad.data.buttons.length; nr++) {
				let btn = pad.data.buttons[nr];
				btn.nr = nr;
				
				if(!btn.pressed) continue;
				
				if(!pad._btnLast.includes(nr)) {
					pad._btnLast.push(nr);
					this._btnCallbackDown({id: pad.data.id, index: padI}, btn);
				}
				
				this._btnCallbackPressed({id: pad.data.id, index: padI}, btn);
				nowPressedButtons.push(nr);
			}
			
			for(let last of pad._btnLast) {
				if(!nowPressedButtons.includes(last)) {
					let btn = pad.data.buttons[last];
					btn.nr = last;
					this._btnCallbackUp({id: pad.data.id, index: padI}, btn);
				}
			}
			pad._btnLast = nowPressedButtons;
			
			let axis0 = pad.data.axes[0];
			let axis1 = pad.data.axes[1];
			// D-Pad axes
			let cord = CONST.DIRECTION.WAITING.clone();
			if(Math.abs(axis0) + Math.abs(axis1) >= this._minDelta) {
				if(axis0 > this._minDelta / 2) cord.x = 1;
				else if(axis0 < -this._minDelta / 2) cord.x = -1;
				
				if(axis1 > this._minDelta / 2) cord.y = 1;
				else if(axis1 < -this._minDelta / 2) cord.y = -1;
				
				if(cord.x !== 0 && cord.y !== 0) {
					if(pad._multiKeyPresses) continue;
					if(cord.x === pad._axisLast.x) cord.x = 0;
					else if(cord.y === pad._axisLast.y) cord.y = 0;
					else cord = CONST.DIRECTION.WAITING.clone();
					pad._multiKeyPresses = true;
				} else {
					pad._multiKeyPresses = false;
				}
			}
			
			if(cord.x === 0 && cord.y === 0) cord = CONST.DIRECTION.WAITING;
			if(cord.x === 1 && cord.y === 0) cord = CONST.DIRECTION.RIGHT;
			if(cord.x === 0 && cord.y === 1) cord = CONST.DIRECTION.DOWN;
			if(cord.x === -1 && cord.y === 0) cord = CONST.DIRECTION.LEFT;
			if(cord.x === 0 && cord.y === -1) cord = CONST.DIRECTION.UP;
			
			if(!Functions.comparePoints(cord, CONST.DIRECTION.WAITING)) {
				this._dpadEventPressed({id: pad.data.id, index: padI}, cord);
			}
			
			if(Functions.comparePoints(cord, pad._axisLast)) continue;
			
			if(!Functions.comparePoints(pad._axisLast, CONST.DIRECTION.WAITING)) {
				this._dpadEventUp({id: pad.data.id, index: padI}, pad._axisLast);
			}
			if(!Functions.comparePoints(cord, CONST.DIRECTION.WAITING)) {
				this._dpadEventDown({id: pad.data.id, index: padI}, cord);
			}
			pad._axisLast = cord.clone();
		}
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
		this["_btnCallback" + Functions.upperFirst(key.toLowerCase())] = callback;
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
		this["_dpadEvent" + Functions.upperFirst(key.toLowerCase())] = callback;
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
		this["_onEvent" + Functions.upperFirst(key.toLowerCase())] = callback;
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
};