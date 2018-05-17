"use strict";
const Graphics = require("../client/Graphics.js");
const CONST = require("./Const.js");

module.exports = class Marker {
	constructor(pos, dir) {
		this._pos = pos.clone();
		this._speed = new createjs.Point(CONST.GAME_CONF.MARKER_SPEED * dir.x, CONST.GAME_CONF.MARKER_SPEED * dir.y);
		Graphics.getInstance().addMarker(this, dir);
	}
	
	destroy() {
		Graphics.getInstance().removeMarker(this);
	}
	
	update() {
		this._pos.x += this._speed.x;
		this._pos.y += this._speed.y;
	}
};