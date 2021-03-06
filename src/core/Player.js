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
		this.pos = pos;
		this._dir = CONST.DIRECTION.DOWN;
		this.markers = [];
		this._markCooldown = 0;
		this._walking = false;
		this._size = {width: 128, height: 128};
		this._keyBuffer = new Map();
		this._currentKeys = new Set();
		this._score = 0;
		this._id = id;
		
		Graphics.getInstance().addPlayer(this._id, this.pos);
		//socket.emit("I_AM_NEW", this); TODO Benny Networking
	}
	
	update() {
		this._walking = false;
		this.handleInput();
		
		//socket.emit("RECEIVE_DATA", this); TODO Benny Networking
		
		if(this._markCooldown > 0) {
			this._markCooldown--;
		}
		this.markers.forEach(function(marker) {
			marker.update();
		});
	}
	
	handleInput() {
		for(let value of this._currentKeys) {
			if([CONST.DIRECTION.UP, CONST.DIRECTION.DOWN, CONST.DIRECTION.RIGHT, CONST.DIRECTION.LEFT].includes(value)) {
				this._dir = value;
				this.pos.x += this._dir.x * CONST.GAME_CONF.SPEED;
				this.pos.y += this._dir.y * CONST.GAME_CONF.SPEED;
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
	
	/**
	 * shoots a marker relative to pos and dir
	 */
	mark() {
		if(this._markCooldown <= 0) {
			this.markers.push(new Marker(this.pos, this._dir));
			this._markCooldown = 7;
		}
	};
	
	/**
	 * adds input to player
	 * @param key    keycode
	 */
	addKey(key) {
		this._currentKeys.add(key);
	}
	
	/**
	 * removes input to player
	 * @param key    keycode
	 */
	removeKey(key) {
		this._currentKeys.delete(key);
	}
	
	/**
	 * Deletes Player Sprite for deleting playerobj
	 */
	destroy() {
		this.markers.forEach(x => x.destroy());
		Graphics.getInstance().removePlayer(this._id);
	}
};