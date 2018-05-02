'use strict';

export default class Marker{
	constructor(pos, dir, graphics){
		this._pos = pos;
		this._speed = dir;	//TODO add speed calulation
		this._sprite = graphics.createMarker();
	}
	
	destroy(graphics){
		graphics.removeSprite(this._sprite);
	}
}