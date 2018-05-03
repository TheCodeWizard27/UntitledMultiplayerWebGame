'use strict';
import {SERVER_CONFIGURATION as SC} from "./Const.js";
import Graphics from "./Graphics.js";

export default class Marker{
	constructor(pos, dir){
		this._pos = pos;
		this._speed = new createjs.Point(SC.GAME.MARKER_SPEED*dir.x, SC.GAME.MARKER_SPEED*dir.y);
		this._sprite = Graphics.getInstance().createMarker();
	}
	
	destroy(){
		Graphics.getInstance().removeSprite(this._sprite);
	}
}