"use strict";
import Graphics from "./Graphics.js";

let GameController = {
	init : function(){
		this._stage = new createjs.Stage("window");		//creates stage to draw on with canvas
		
		this._graphics = Graphics.getInstance(this._stage);
		this._graphics.init(this);
	},
	
	update : function(){
	
	}
};

export default GameController;