"use strict";
import Graphics from "./Graphics.js";
import GameObj from "./GameObj.js";

let GameController = {
	_gameController : null,
	
	getInstance : function(){
		if(this._gameController == null){
			this._gameController = {
				_stage : new createjs.Stage("window"),
				_graphics : null,
				_gameObj : null,
				
				init : function(){
					this._graphics = Graphics.getInstance(this._stage);
					this._graphics.init();
					this._gameObj = GameObj.getInstance();
				},
				
				update : function(){
					this._stage.update();
				}
			}
		}
		return this._gameController;
	}
};

export default GameController;