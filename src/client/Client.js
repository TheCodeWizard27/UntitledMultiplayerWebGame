"use strict";
const Core = require("../../src/core/Core.js");
const Graphics = require("../../src/client/Graphics.js");
const GameObj = require("../../src/core/GameObj.js");
const Vector = require("../../src/core/Vector.js");
const CONST = require("../../src/core/Const.js");
const ControllerListener = require("../../src/client/ControllerListener.js");

module.exports = {
	client: null,
	
	getInstance() {
		if(this.client == null) {
			this.client = {
				_core: Core.getInstance(),
				_gameObj: null,
				_graphics: Graphics.getInstance(),
				_controllerListener: null,
				
				init() {
					this._core.init();
					this._graphics.init(this);	//inits graphics that after loading calls this.start
					this._gameObj = new GameObj;
				},
				
				start() {
					this._controllerListener = new ControllerListener();
					this._controllerListener.setGlobalEvents("connect", this.onControllerConnect.bind(this));
					this._controllerListener.setGlobalEvents("disconnect", this.onControllerDisconnect.bind(this));
					this._controllerListener.setButtonCallback("down", this.onBtnDown.bind(this));
					this._controllerListener.setButtonCallback("up", this.onBtnUp.bind(this));
					this._controllerListener.setDPadCallback("down", this.onDPadDown.bind(this));
					this._controllerListener.setDPadCallback("up", this.onDPadUp.bind(this));
					this._controllerListener.start();
				},
				
				update(event) {
					this._core.update(this._gameObj);
					
					this._graphics.updateView(event);
				},
				
				onControllerConnect(pad) {
					this._gameObj.addPlayer(pad.index, new Vector(0, 0));
				},
				onControllerDisconnect(pad) {
					this._gameObj.removePlayer(pad.index);
				},
				onBtnDown(name, object) {
					let tempPlayer = this._gameObj.getPlayer(name.index);
					if(tempPlayer !== undefined) {
						tempPlayer.addKey(object);
					}
				},
				onBtnUp(name, object) {
					let tempPlayer = this._gameObj.getPlayer(name.index);
					if(tempPlayer !== undefined) {
						tempPlayer.removeKey(object);
					}
				},
				onDPadDown(name, object) {
					let tempPlayer = this._gameObj.getPlayer(name.index);
					if(tempPlayer !== undefined) {
						tempPlayer.addKey(this._getDirectionfromString(object.toString()));
					}
				},
				onDPadUp(name, object) {
					console.log("up");
					let tempPlayer = this._gameObj.getPlayer(name.index);
					if(tempPlayer !== undefined) {
						tempPlayer.removeKey(this._getDirectionfromString(object.toString()));
					}
				},
				_getDirectionfromString(string) {
					switch(string) {
					case CONST.DIRECTION.UP.toString():
						return CONST.DIRECTION.UP;
					case CONST.DIRECTION.DOWN.toString():
						return CONST.DIRECTION.DOWN;
					case CONST.DIRECTION.RIGHT.toString():
						return CONST.DIRECTION.RIGHT;
					case CONST.DIRECTION.LEFT.toString():
						return CONST.DIRECTION.LEFT;
					}
				}
			};
		}
		console.log("client init");
		return this.client;
	}
};