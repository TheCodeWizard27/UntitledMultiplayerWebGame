"use strict";

let Graphics = {
	_graphics : null,
	
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
						{src: "pikachu.png", id: "pika"}
					];
					
					this._loader.addEventListener("complete", this.completedLoading.bind(this));
					this._loader.loadManifest(manifest, true, "img/");
				},

				/**
				 * gets called after loading and initializes sprites
				 */
				completedLoading : function(){
					//player sprite sheet
					this._playerSheet = new createjs.SpriteSheet({
						"images": [this._loader.getResult("pika")],
						"frames": {"width": 64, "height": 64}
					});
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