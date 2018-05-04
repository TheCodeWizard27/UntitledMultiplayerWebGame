'use strict';
import Graphics from "./Graphics.js";
import Marker from "./Marker.js";
import {DIRECTION} from "./Const.js";

/**
 * Player Class holds information about the position, the direction, the score, all markers.
 * Each player has its own keyBuffer
 */
export default class Player{
	/**
	 * Creates Player Object
	 * @param graphics for deleting adding sprites to stage
	 */
	constructor(pos){
		this._pos = pos;
		this._dir = DIRECTION.DOWN;
		this._markers = [];
		this._markCooldown = 0;
		this._walking = false;
		this._keyBuffer = new Set();
		this._score = 0;
		
		this._sprite = Graphics.getInstance().createPlayer();
	}
	
	update() {
		this.handleInput();
		
		if(this._markCooldown > 0){ this._markCooldown--; }
		
		this._markers.forEach(function(value) {
			value.update();
		});
	}
	
	handleInput(){
		this._keyBuffer.forEach(function(value){
			switch(value.nr){
			case 1:
				this.mark();
				break;
			default:
				console.log(value);
				break;
			}
		}.bind(this));
	}
	
	/**
	 * shoots a marker relative to pos and dir
	 */
	mark(){
		if(this._markCooldown <= 0){
			this._markers.push(new Marker(this._pos, this._dir));
			this._markCooldown = 7;
		}
	};
	
	/**
	 * adds input to player
	 * @param key	keycode
	 */
	addKey(key){
		this._keyBuffer.add(key);
	}
	/**
	 * removes input to player
	 * @param key	keycode
	 */
	removeKey(key){
		this._keyBuffer.delete(key);
	}
	
	/**
	 * Deletes Player Sprite for deleting playerobj
	 */
	delete(){
		Graphics.getInstance().removeSprite(this._sprite);
	}
}