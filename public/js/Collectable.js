'use strict';

/**
 * Collectable Class holds information about a collectable
 */
export default class Collectable{
	/**
	 * creates Collectable
	 * @param pos	position
	 * @param graphics	to add the sprite
	 */
	constructor(pos, graphics){
		this._pos = pos;
		this._sprite = graphics.createCollectable();
	}
	
	/**
	 * removes sprite from stage for deletion
	 * @param graphics
	 */
	destroy(graphics){
		graphics.removeSprite(this._sprite);
	}
}