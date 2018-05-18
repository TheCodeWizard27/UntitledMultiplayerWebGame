"use strict";
const Graphics = require("../client/Graphics.js");
const CONST = require("./Const.js");

module.exports = class Marker {
	constructor(pos, dir) {
		this.pos = pos.clone();
		this._speed = new createjs.Point(CONST.GAME_CONF.MARKER_SPEED * dir.x, CONST.GAME_CONF.MARKER_SPEED * dir.y);
		Graphics.getInstance().addMarker(this, dir);
	}
	
	destroy() {
		Graphics.getInstance().removeMarker(this);
	}
	
	update() {
		this.pos.x += this._speed.x;
		this.pos.y += this._speed.y;
	}
};