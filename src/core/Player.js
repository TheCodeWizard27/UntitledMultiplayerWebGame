"use strict";
const Graphics = require("../client/Graphics.js");
const CONST = require("./Const.js");
const Marker = require("../../src/core/Marker.js");

/**
 * Player Class holds information about the position, the direction, the score, all markers.
 * Each player has its own keyBuffer
 */
module.exports = class Player {
	constructor(id, pos) {
		this._pos = pos;
		this._dir = CONST.DIRECTION.DOWN;
		this._markers = [];
		this._markCooldown = 0;
		this._walking = false;
		this._size = {width: 128, height: 128};
		this._keyBuffer = new Set();
		this._score = 0;
		this._id = id;
		
		Graphics.getInstance().addPlayer(this._id, this._pos);
		//socket.emit("I_AM_NEW", this); TODO Benny Networking
	}
	
	update() {
		this._walking = false;
		this.handleInput();
		
		//socket.emit("RECEIVE_DATA", this); TODO Benny Networking
		
		if(this._markCooldown > 0) {
			this._markCooldown--;
		}
		
		//this.handleAnimations(); //Hanlde Animations In Graphics
		
		this._markers.forEach(function(value) {
			value.update();
		});
	}
	
	handleInput() {
		for(let value of this._keyBuffer) {
			if([CONST.DIRECTION.UP, CONST.DIRECTION.DOWN, CONST.DIRECTION.RIGHT, CONST.DIRECTION.LEFT].includes(value)) {
				this._dir = value;
				this._pos.x += this._dir.x * CONST.GAME_CONF.SPEED;
				this._pos.y += this._dir.y * CONST.GAME_CONF.SPEED;
				this._walking = true;
			} else {
				switch(value.nr) {
				case 1:
					this.mark();
					break;
				}
			}
		}
	}
	
	handleAnimations() {
		/*let animationString;
		
		switch(this._dir) {
		case DIRECTION.UP:
			animationString = "Up";
			break;
		case DIRECTION.DOWN:
			animationString = "Down";
			break;
		case DIRECTION.RIGHT:
			animationString = "Right";
			break;
		case DIRECTION.LEFT:
			animationString = "Left";
			break;
		}
		
		if(!this._walking && this._sprite.currentAnimation !== "f" + animationString) {
			this._sprite.gotoAndPlay("f" + animationString);
			
		} else if(this._walking && this._sprite.currentAnimation !== "w" + animationString) {
			this._sprite.gotoAndPlay("w" + animationString);
		}*/
		//TODO Benny copy and adapt to Graphics class
	}
	
	/**
	 * shoots a marker relative to pos and dir
	 */
	mark() {
		if(this._markCooldown <= 0) {
			this._markers.push(new Marker(this._pos, this._dir));
			this._markCooldown = 7;
		}
	};
	
	/**
	 * adds input to player
	 * @param key    keycode
	 */
	addKey(key) {
		this._keyBuffer.add(key);
	}
	
	/**
	 * removes input to player
	 * @param key    keycode
	 */
	removeKey(key) {
		this._keyBuffer.delete(key);
	}
	
	/**
	 * Deletes Player Sprite for deleting playerobj
	 */
	destroy() {
		this._markers.forEach(x => x.destroy());
		Graphics.getInstance().removePlayer(this._id);
	}
};