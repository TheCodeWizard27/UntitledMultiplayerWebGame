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
		
		this._dpadDirection = {x: 0, y: 0};
		
		this._dpadEventUp = () => {};
		this._dpadEventRight = () => {};
		this._dpadEventDown = () => {};
		this._dpadEventLeft = () => {};
		this._dpadEventWaiting = () => {};
		
		this._btnLast = [];
		this._i = 0;
	}
	
	/**
	 * This function starts the listenning period
	 */
	start() {
		this._scanGamePads(this);
		this._loopInterval = setInterval(this._loop, 10, this);
	}
	
	/**
	 * This function stops the listenning period
	 * @returns {boolean} It returns true, when the intervall was terminated successfully and it returns false, when
	 * no intervall was defined in the past
	 */
	stop() {
		if(this._loopInterval) {
			clearInterval(this._loopInterval);
			return true;
		}
		return false;
	}
	
	_loop(base) {
		// After every 5 loop sycles the scan function going to be called
		if(base._i >= 5) {
			base._scanGamePads(base);
			base._i = 0;
		} else base._i++;
		
		let nowPressed = [];
		for(let pad of base._gamepads) {
			// Buttons
			for(let nr = 0; nr < pad.buttons.length; nr++) {
				let btn = pad.buttons[nr];
				btn.nr = nr;
				
				if(!btn.pressed) continue;
				
				if(!base._btnLast.includes(nr)) {
					base._btnLast.push(nr);
					base._btnCallbackDown(pad.id, btn);
				}
				
				base._btnCallbackPressed(pad.id, btn);
				nowPressed.push(nr);
			}
			
			for(let last of base._btnLast) {
				if(!nowPressed.includes(last)) {
					let btn = pad.buttons[last];
					btn.nr = last;
					base._btnCallbackUp(pad.id, btn);
				}
			}
			base._btnLast = nowPressed;
			
			// D-Pad axes
			let axis = Math.abs(pad.axes[9]); // TODO I have no clue why index 9?!
			switch(axis) {
				// Up
			case 1:
				base._dpadDirection = {x: 0, y: -1};
				base._dpadEventUp(pad.id, base._dpadDirection);
				break;
				// Right
			case 0.4285714030265808:
				base._dpadDirection = {x: 1, y: 0};
				base._dpadEventRight(pad.id, base._dpadDirection);
				break;
				// Down
			case 0.14285719394683838:
				base._dpadDirection = {x: 0, y: 1};
				base._dpadEventDown(pad.id, base._dpadDirection);
				break;
				// Left
			case 0.7142857313156128:
				base._dpadDirection = {x: -1, y: 0};
				base._dpadEventLeft(pad.id, base._dpadDirection);
				break;
				// Default
			default:
				base._dpadDirection = {x: 0, y: 0};
				base._dpadEventWaiting(pad.id, base._dpadDirection);
			}
		}
	}
	
	_scanGamePads(base) {
		let navigatorGamepads = Object.values(navigator.getGamepads()) || [];
		
		for(let pad of navigatorGamepads) {
			if(!pad || base._gamepads.includes(pad)) continue;
			base._gamepads.push(pad);
			console.log(pad);
			base._onEventConnect(pad);
		}
		
		for(let pad of base._gamepads.filter(x => !navigatorGamepads.includes(x)) || []){
			base._onEventDisconnect(pad);
		}
		
		base._gamepads = base._gamepads.filter(x => navigatorGamepads.includes(x)) || [];
	}
	
	/**
	 * This function is used to set the induvidually events.
	 * <ul><li>pressed</li>
	 *     <li>up</li>
	 *     <li>down</li></ul>
	 * @param {String} key - The name of the event
	 * @param {function(String: name, Object: button)} callback - The function, which are going to be called
	 */
	setButtonCallback(key, callback) {
		this["_btnCallback" + upperFirst(key.toLowerCase())] = callback;
	}
	
	/**
	 * This function is used to set the induvidually events.
	 * <ul><li>up</li>
	 *     <li>right</li>
	 *     <li>down</li>
	 *     <li>left</li>
	 *     <li>Waiting - When nothing happens</li></ul>
	 * @param {String} key - The name of the event
	 * @param {function(String: name, Object)} callback - The function, which are going to be
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
	 * @param {function(String: name, Object)} callback - The function, which are going to be
	 * called
	 */
	setGlobalEvents(key, callback) {
		this["_onEvent" + upperFirst(key.toLowerCase())] = callback;
	}
	
	/**
	 * Get the current direction from the d-pad
	 * @returns {{x : number, y : number}}
	 */
	getDPadDirection() {
		return this._dpadDirection;
	}
}