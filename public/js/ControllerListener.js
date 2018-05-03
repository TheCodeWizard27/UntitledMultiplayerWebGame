"use strict";

import {upperFirst} from "./functions.js";
import {DIRECTION} from "./Const.js";

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
		this._btnLast = [];
		
		this._dpadEventUp = () => {};
		this._dpadEventRight = () => {};
		this._dpadEventDown = () => {};
		this._dpadEventLeft = () => {};
		this._dpadEventWaiting = () => {};
		
		this._dpadDirection = DIRECTION.WAITING;
		
		this._i = 0;
	}
	
	/**
	 * This function starts the listenning period
	 */
	start() {
		this._scanGamePads(this);
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
		
		let nowPressed = [];
		for(let pad of this._gamepads) {
			// Buttons
			for(let nr = 0; nr < pad.buttons.length; nr++) {
				let btn = pad.buttons[nr];
				btn.nr = nr;
				
				if(!btn.pressed) continue;
				
				if(!this._btnLast.includes(nr)) {
					this._btnLast.push(nr);
					this._btnCallbackDown(pad.id, btn);
				}
				
				this._btnCallbackPressed(pad.id, btn);
				nowPressed.push(nr);
			}
			
			for(let last of this._btnLast) {
				if(!nowPressed.includes(last)) {
					let btn = pad.buttons[last];
					btn.nr = last;
					this._btnCallbackUp(pad.id, btn);
				}
			}
			this._btnLast = nowPressed;
			
			// D-Pad axes
			let axis = Math.abs(pad.axes[9]); // TODO I have no clue why index 9?!
			switch(axis) {
				// Up
			case 1:
				this._dpadDirection = DIRECTION.UP;
				this._dpadEventUp(pad.id, this._dpadDirection);
				break;
				// Right
			case 0.4285714030265808:
				this._dpadDirection = DIRECTION.RIGHT;
				this._dpadEventRight(pad.id, this._dpadDirection);
				break;
				// Down
			case 0.14285719394683838:
				this._dpadDirection = DIRECTION.DOWN;
				this._dpadEventDown(pad.id, this._dpadDirection);
				break;
				// Left
			case 0.7142857313156128:
				this._dpadDirection = DIRECTION.LEFT;
				this._dpadEventLeft(pad.id, this._dpadDirection);
				break;
				// Default
			default:
				this._dpadDirection = DIRECTION.WAITING;
				this._dpadEventWaiting(pad.id, this._dpadDirection);
			}
		}
	}
	
	_scanGamePads() {
		let navigatorGamepads = Object.values(navigator.getGamepads()) || [];
		
		for(let pad of navigatorGamepads) {
			if(!pad || this._gamepads.includes(pad)) continue;
			this._gamepads.push(pad);
			this._onEventConnect(pad);
		}
		
		for(let pad of this._gamepads.filter(x => !navigatorGamepads.includes(x)) || []){
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
	 * @param {function(Object: pad)} callback - The function, which are going to be
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