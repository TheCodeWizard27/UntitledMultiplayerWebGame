"use strict";

import GameController from "./GameController.js";

let Graphics = {
	_graphics: null,
	
	/**
	 * singleton getInstance of Graphics function
	 * @param stage    for adding removing sprites
	 */
	getInstance: function(stage) {
		if(this._graphics == null) {
			this._graphics = {
				_stage: stage,
				_playerSheet: null,
				_collectableSheet: null,
				_markerSheet: null,
				_loader: new createjs.LoadQueue(false),
				
				/**
				 * starts loading
				 */
				init: function() {
					let manifest = [
						{src: "link.png", id: "Link"},
						{src: "bullet.png", id: "Bullet"},
						{src: "trump_idle.png", id: "TrumpIdle"},
						{src: "trump_run.png", id: "TrumpRun"}
					];
					this._loader.addEventListener("complete", this.completedLoading.bind(this));
					this._loader.loadManifest(manifest, false, "./assets/textures/");
					this._loader.load();
				},
				
				/**
				 * gets called after loading and initializes sprites
				 */
				completedLoading: function() {
					let gameController = GameController.getInstance();
					
					//player sprite sheet
					this._playerSheet = new createjs.SpriteSheet({
						"framerate": 10,
						"images": [this._loader.getResult("TrumpIdle"), this._loader.getResult("TrumpRun")],
						"frames": {"width": 256, "height": 256},
						"animations": {
							"fDown": [0, 9, "fDown", 0.3],	//TODO Benny Idle animations
							"fRight": [10, 19, "fRight", 1],
							"fUp": [20, 29, "fUp", 1],
							"fLeft": [30, 39, "fLeft", 1],
							"wDown": [40, 45, "wDown", 1],	//TODO Benny Idle animations
							"wRight": [46, 51, "wRight", 1],
							"wUp": [52, 57, "wUp", 1],
							"wLeft": [58, 63, "wLeft", 1]
							
							//							"fDown" : [0,1,"fDown",0.1],
							//							"fLeft" : [4,5,"fLeft",0.1],
							//							"fRight" : [8,9,"fRight",0.1],
							//							"fUp" : [12,13,"fUp",0.1],
							//							"wDown" : {frames : [1,2,3,0], next: "wDown", speed: 1},
							//							"wLeft" : {frames : [5,6,7,4], next: "wLeft", speed: 1},
							//							"wRight" : {frames : [9,10,11,8], next: "wRight", speed: 1},
							//							"wUp" : {frames : [13,14,15,12], next: "wUp", speed: 1}
							
						}
					});
					this._markerSheet = new createjs.SpriteSheet({
						"images": [this._loader.getResult("Bullet")],
						"frames": {"width": 32, "height": 32}
					});
					
					//init game loop after loading
					gameController.start();
				},
				
				/**
				 * Creates Playersprite and adds it to the Stage for it to get drawn
				 * @returns { Sprite }
				 */
				createPlayer: function() {
					let tempSprite = new createjs.Sprite(this._playerSheet);
					//					tempSprite.setBounds(50,50,50,50);
					this._stage.addChild(tempSprite);
					return tempSprite;
				},
				
				createCollectable: function() {
					//TODO Benny createCollectable Sprite with return
				},
				createMarker: function() {
					let tempSprite = new createjs.Sprite(this._markerSheet);
					this._stage.addChild(tempSprite);
					return tempSprite;
				},
				
				/**
				 * Removes passed sprite on stage for deletion
				 * @param sprite
				 */
				removeSprite: function(sprite) {
					this._stage.removeChild(sprite);
				}
			};
		}
		return this._graphics;
	}
};

export default Graphics;