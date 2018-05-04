'use strict';
import Graphics from "./Graphics.js";
import GameController from "./GameController.js";

export default class Marker{
	constructor(pos, dir){
		this._pos = pos;
		this._speed = new createjs.Point(GAME_CONF.MARKER_SPEED*dir.x, GAME_CONF.MARKER_SPEED*dir.y);
		this._sprite = Graphics.getInstance().createMarker();
		this._sprite.x = this._pos.x;
		this._sprite.y = this._pos.y;
	}
	
	destroy(){
		Graphics.getInstance().removeSprite(this._sprite);
	}
	
	update(){
		let stage = GameController.getInstance()._stage;
		
		this._sprite.x += this._speed.x;
		this._sprite.y += this._speed.y;
		stage.setBounds(0,0,1400,710);
		this._sprite.setBounds(this._sprite.x,this._sprite.y,32,32);
//		console.log(this._sprite.getBounds());
//		console.log(stage.getBounds().intersects(this._sprite.getBounds()));
	}
}