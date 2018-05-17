"use strict";
const CONST = require("../../src/core/Const.js");

let Graphics = {
	graphics: null,
	
	getInstance() {
		if(this.graphics == null) {
			this.graphics = {
				_client: null,
				_stage: null,
				_playerMap: new Map(),
				_markerMap: new Map(),
				_playerSheet: null,
				_collectableSheet: null,
				_markerSheet: null,
				_loader: null,
				
				init(client) {
					this._client = client;
					this._stage = new createjs.Stage("window");
					this._loader = new createjs.LoadQueue(false);
					
					let manifest = [
						{src: "link.png", id: "Link"},
						{src: "bullet.png", id: "Bullet"}
					];
					
					this._loader.addEventListener("complete", this.completedLoading.bind(this));
					this._loader.loadManifest(manifest, false, "public/assets/textures/");
					this._loader.load();
				},
				
				completedLoading() {
					this._playerSheet = new createjs.SpriteSheet({
						"framerate": 6,
						"images": [this._loader.getResult("Link")],
						"frames": {"width": 31, "height": 48},
						"animations": {
							"fDown": [0, 1, "fDown", 0.1],
							"fLeft": [4, 5, "fLeft", 0.1],
							"fRight": [8, 9, "fRight", 0.1],
							"fUp": [12, 13, "fUp", 0.1],
							"wDown": {frames: [1, 2, 3, 0], next: "wDown", speed: 1},
							"wLeft": {frames: [5, 6, 7, 4], next: "wLeft", speed: 1},
							"wRight": {frames: [9, 10, 11, 8], next: "wRight", speed: 1},
							"wUp": {frames: [13, 14, 15, 12], next: "wUp", speed: 1}
						}
					});
					
					this._markerSheet = new createjs.SpriteSheet({
						"images": [this._loader.getResult("Bullet")],
						"frames": {"width": 32, "height": 32}
					});
					
					createjs.Ticker.addEventListener("tick", this._client.update.bind(this._client));
					this._client.start();
				},
				
				addPlayer(id, pos) {
					let tempSprite = new createjs.Sprite(this._playerSheet);
					tempSprite.x = pos.x;
					tempSprite.y = pos.y;
					
					this._stage.addChild(tempSprite);
					this._playerMap.set(id, tempSprite);
				},
				removePlayer(id) {
					if(this._playerMap.has(id)) {
						this._stage.removeChild(this._playerMap.get(id));
						this._playerMap.delete(id);
					}
				},
				
				addMarker(marker, dir) {
					let tempSprite = new createjs.Sprite(this._markerSheet);
					tempSprite.x = marker._pos.x;
					tempSprite.y = marker._pos.y;
					
					switch(dir) {
					case CONST.DIRECTION.UP:
						tempSprite.rotation = 270;
						break;
					case CONST.DIRECTION.DOWN:
						tempSprite.rotation = 90;
						break;
					case CONST.DIRECTION.RIGHT:
						tempSprite.rotation = 0;
						break;
					case CONST.DIRECTION.LEFT:
						tempSprite.rotation = 180;
						break;
					}
					
					this._stage.addChild(tempSprite);
					this._markerMap.set(marker, tempSprite);
				},
				removeMarker(marker) {
					if(this._markerMap.has(marker)) {
						this._stage.removeChild(this._markerMap.get(marker));
						this._markerMap.delete(marker);
					}
				},
				update(event, gameObj) {
					this._handleAnimations(gameObj);
					this._stage.update(event);
				},
				_handleAnimations(gameObj) {
					gameObj._playerMap.forEach(function(player, key, map) {
						let animationString;
						let tempSprite = this._playerMap.get(player._id);
						
						tempSprite.x = player._pos.x;
						tempSprite.y = player._pos.y;
						
						switch(player._dir) {
						case CONST.DIRECTION.UP:
							animationString = "Up";
							break;
						case CONST.DIRECTION.DOWN:
							animationString = "Down";
							break;
						case CONST.DIRECTION.RIGHT:
							animationString = "Right";
							break;
						case CONST.DIRECTION.LEFT:
							animationString = "Left";
							break;
						}
						
						if(!player._walking && tempSprite.currentAnimation !== "f" + animationString) {
							tempSprite.gotoAndPlay("f" + animationString);
						} else if(player._walking && tempSprite.currentAnimation !== "w" + animationString) {
							tempSprite.gotoAndPlay("w" + animationString);
						}
						
						player._markers.forEach(function(marker) {
							let tempMarker = this._markerMap.get(marker);
							tempMarker.x = marker._pos.x;
							tempMarker.y = marker._pos.y;
						}.bind(this));
					}.bind(this));
				}
			};
		}
		return this.graphics;
	}
};

module.exports = Graphics;