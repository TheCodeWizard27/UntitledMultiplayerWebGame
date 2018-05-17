"use strict";
const Client = require("../../src/client/Client.js");

let Graphics = {
	graphics: null,
	
	getInstance() {
		if(this.graphics == null) {
			this.graphics = {
				_stage: null,
				_playerMap: new Map(),
				_markerMap: new Map(),
				_playerSheet: null,
				_collectableSheet: null,
				_markerSheet: null,
				_loader: null,
				
				init() {
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
					
					let tempClient = Client.getInstance();
					createjs.Ticker().addEventListener("tick", tempClient.update().bind(tempClient));
					tempClient.start();
				},
				
				addPlayer(id, pos) {
					let tempSprite = createjs.Sprite(this._playerSheet);
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
				
				addMarker(marker) {
					let tempSprite = createjs.Sprite(this._markerSheet);
					tempSprite.x = marker._pos.x;
					tempSprite.y = marker._pos.y;
					
					this._stage.addChild(tempSprite);
					this._markerMap.set(marker, tempSprite);
				},
				removeMarker(marker) {
					if(this._markerMap.has(marker)) {
						this._stage.removeChild(this._markerMap.get(marker));
						this._markerMap.delete(marker);
					}
				},
				updateView(event){
					this._stage.update(event);
				}
			};
		}
		return this.graphics;
	}
};

module.exports = Graphics;