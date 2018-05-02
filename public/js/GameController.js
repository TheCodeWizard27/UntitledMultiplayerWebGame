"use strict";
import {Graphics} from "./Graphics.js";

export default class GameController{
	constructor(){
		console.log("init GameController");
		var _stage = new createjs.Stage("window");
		var _graphics = new Graphics(_stage);
	}
}