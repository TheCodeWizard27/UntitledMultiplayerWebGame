"use strict";

export class Graphics{
	constructor(stage){
		this._stage = stage;
		this._playerSheet;
		this._collectableSheet;
		this._markerSheet;
	}
	
	createPlayer(){
		//TODO create function with return of the player sprite
	}
	
	createCollectable(){
		//TODO create function with return of the Collectable Sprite
	}
	
	createMarker(){
		//TODO create function with return of the marker Sprite
	}
	
	removeSprite(sprite){
		this._stage.removeChild(sprite);
	}
	
}