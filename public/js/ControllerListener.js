"use strict";

import {upperFirst} from "./functions.js";

/**
 * This Listener triggers events, when something happens on a phisical game controller
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
		
		this.log = document.getElementById("log");
		
		this._i = 0;
	}
	
	/**
	 * This function starts the listenning period
	 */
	start() {
		this._scanGamePads(this);
		console.table(this._gamepads);
		this._loopInterval = setInterval(this._loop.bind(this), 10, this);
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
		// After every 10 loop sycles the scan function is going to get called
		if(this._i >= 10) {
			this._scanGamePads();
			this._i = 0;
		} else this._i++;
		
		for(let pad of this._gamepads) {
			let nowPressedButtons = [];
			let nowPressedAxes = [];
			// Buttons
			for(let nr = 0; nr < pad.buttons.length; nr++) {
				let btn = pad.buttons[nr];
				btn.nr = nr;
				
				if(!btn.pressed) continue;
				
				if(!pad._btnLast.includes(nr)) {
					pad._btnLast.push(nr);
					this._btnCallbackDown({id:pad.id, index:pad.index}, btn);
				}
				
				this._btnCallbackPressed({id:pad.id, index:pad.index}, btn);
				nowPressedButtons.push(nr);
			}
			
			for(let last of pad._btnLast) {
				if(!nowPressedButtons.includes(last)) {
					let btn = pad.buttons[last];
					btn.nr = last;
					this._btnCallbackUp({id:pad.id, index:pad.index}, btn);
				}
			}
			pad._btnLast = nowPressedButtons;
			
			// D-Pad axes
			
			let axis0 = Math.round(pad.axes[0] * 10) / 10;
			let axis1 = Math.round(pad.axes[1] * 10) / 10;
			let cord = {x: 0, y: 0};
			if(Math.abs(axis0) + Math.abs(axis1) >= this._minDelta) {
				if(axis0 > this._minDelta / 2) cord.x = 1;
				if(axis0 < -this._minDelta / 2) cord.x = -1;
				if(axis1 > this._minDelta / 2) cord.y = 1;
				if(axis1 < -this._minDelta / 2) cord.y = -1;
				this._dpadEventPressed({id:pad.id, index:pad.index}, cord);
			}
			
			if(JSON.stringify(cord) === JSON.stringify(pad._axisLast)) continue;
			
			if(JSON.stringify(pad._axisLast) !== JSON.stringify({x: 0, y: 0})) {
				this._dpadEventUp({id:pad.id, index:pad.index}, pad._axisLast);
			}
			if(JSON.stringify(cord) !== JSON.stringify({x: 0, y: 0})) {
				this._dpadEventDown({id:pad.id, index:pad.index}, cord);
			}
			
			pad._axisLast = cord;
			
		}
	}
	
	_scanGamePads() {
		let navigatorGamepads = Object.values(navigator.getGamepads()) || [];
		
		for(let pad of navigatorGamepads) {
			if(!pad || this._gamepads.includes(pad)) continue;
			pad._btnLast = [];
			pad._axisLast = {x: 0, y: 0};
			this._gamepads.push(pad);
			this._onEventConnect(pad);
		}
		
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
	
	//	/**
	//	 * Get the current direction from the d-pad
	//	 * @returns {{x : number, y : number}}
	//	 */
	//	getDPadDirection() {
	//		return pad._dpadDirection;
	//	}
	
	/**
	 * This function sets the accurancy (a float between 0 and 1) for the dpad trigger event
	 * @param {number} accurancy
	 */
	setDpadDelta(accurancy) {
		this._minDelta = Math.abs(accurancy);
	}
}