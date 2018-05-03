'use strict';
import Graphics from "./Graphics.js";

/**
 * Collectable Class holds information about a collectable
 */
export default class Collectable{
	/**
	 * creates Collectable
	 * @param pos	position
	 * @param graphics	to add the sprite
	 */
	constructor(pos){
		this._pos = pos;
		this._sprite = Graphics.getInstance().createCollectable();
	}
	
	/**
	 * removes sprite from stage for deletion
	 * @param graphics
	 */
	destroy(){
		Graphics.getInstance().removeSprite(this._sprite);
	}
}