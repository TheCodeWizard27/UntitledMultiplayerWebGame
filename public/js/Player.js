'use strict';

/**
 * Player Class holds information about the position, the direction, the score, all markers.
 * Each player has its own keyBuffer
 */
export default class Player{
	/**
	 * Creates Player Object
	 * @param graphics for deleting adding sprites to stage
	 */
	constructor(pos, graphics){
		this._graphics = graphics;
		this._pos = pos;
		this._dir = new createjs.Point(0,1);
		this._markers = [];
		this._markCooldown = 0;
		this._walking = false;
		this._keyBuffer = new Set();
		this._score = 0;
		this._sprite = this._graphics.createPlayer();
	}
	
	/**
	 * shoots a marker relative to pos and dir
	 */
	mark(){
		if(this._markCooldown <= 0){
			//TODO add Marker shoot code
		}
	}
	
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
		this._graphics.removeSprite(this._sprite);
	}
}