"use strict";

import GameController from "./GameController.js";

let Graphics = {
	_graphics : null,
	
	/**
	 * singleton getInstance of Graphics function
	 * @param stage	for adding removing sprites
	 */
	getInstance : function(stage){
		if(this._graphics == null){
			this._graphics = {
				_stage : stage,
				_playerSheet : null,
				_collectableSheet : null,
				_markerSheet : null,
				_loader : new createjs.LoadQueue(false),
				
				/**
				 * starts loading
				 */
				init : function(){
					let manifest = [
						{src: "link.png", id: "Link"}
					];
					this._loader.addEventListener("complete", this.completedLoading.bind(this));
					this._loader.loadManifest(manifest, true, "assets/textures/");
				},

				/**
				 * gets called after loading and initializes sprites
				 */
				completedLoading : function(){
					let gameController = GameController.getInstance();
					
					//player sprite sheet
					this._playerSheet = new createjs.SpriteSheet({
						framerate : 6,
						"images": [this._loader.getResult("Link")],
						"frames": {"width": 32, "height": 48},
						"animations" : {
							"fDown" : [0,0,"fDown",0.1],	//TODO Idle animations
							"fLeft" : [4,4,"fLeft",0.1],
							"fRight" : [8,8,"fRight",0.1],
							"fUp" : [12,12,"fUp",0.1],
							"wDown" : {frames : [1,2,3,0], next: "wDown", speed: 1},
							"wLeft" : {frames : [5,6,7,4], next: "wLeft", speed: 1},
							"wRight" : {frames : [9,10,11,8], next: "wRight", speed: 1},
							"wUp" : {frames : [13,14,15,12], next: "wUp", speed: 1}
						}
					});
					
					//init game loop after loading
					createjs.Ticker.addEventListener("tick", gameController.update.bind(gameController));
				},
				
				/**
				 * Creates Playersprite and adds it to the Stage for it to get drawn
				 * @returns { Sprite }
				 */
				createPlayer : function(){
					let tempSprite = new createjs.Sprite(this._playerSheet);
					this._stage.addChild(tempSprite);
					return tempSprite;
				},
				
				createCollectable : function(){
					//TODO createCollectable Sprite with return
				},
				createMarker : function(){
					//TODO create marker sprite with return
				},
				
				/**
				 * Removes passed sprite on stage for deletion
				 * @param sprite
				 */
				removeSprite : function(sprite){
					this._stage.removeChild(sprite);
				}
			}
		}
		return this._graphics;
	}
};

export default Graphics;