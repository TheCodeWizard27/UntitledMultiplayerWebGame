"use strict";
const Graphics = require("../client/Graphics.js");
const CONST = require("./Const.js");

module.exports = class Marker {
	constructor(pos, dir) {
		this._pos = pos;
		this._speed = new createjs.Point(CONST.GAME_CONF.MARKER_SPEED * dir.x, CONST.GAME_CONF.MARKER_SPEED * dir.y);
		Graphics.getInstance().addMarker(this);
		
		/*TODO Benny import into Graphicshanlder
		switch(dir) {
		case CONST.DIRECTION.UP:
			this._sprite.rotation = 270;
			break;
		case CONST.DIRECTION.DOWN:
			this._sprite.rotation = 90;
			break;
		case CONST.DIRECTION.RIGHT:
			this._sprite.rotation = 0;
			break;
		case CONST.DIRECTION.LEFT:
			this._sprite.rotation = 180;
			break;
		}
		
		this._sprite.x = this._pos.x;
		this._sprite.y = this._pos.y;
		
		let circle = new createjs.Shape();
		circle.graphics.beginFill("red").drawCircle(0, 0, 4).endFill();
		circle.cache(-4, -4, 8, 8);
		circle.x = this._pos.x;
		circle.y = this._pos.y;
		GameController.getInstance()._stage.addChild(circle);
		*/
	}
	
	destroy() {
		Graphics.getInstance().removeMarker(this);
	}
	
	update() {
		/*TODO Benny import into Graphicshandler
		this._sprite.x += this._speed.x;
		this._sprite.y += this._speed.y;
		stage.setBounds(0, 0, 1400, 710);
		this._sprite.setBounds(this._sprite.x, this._sprite.y, 32, 32);
		//		console.log(this._sprite.getBounds());
		//		console.log(stage.getBounds().intersects(this._sprite.getBounds()));
		*/
	}
};