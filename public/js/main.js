"use strict";
//import io from "socket.io-client";
import {SERVER_CONFIGURATION as SC} from "./Const.js";
import GameController from "./GameController.js";

let div;

window.addEventListener("load", () => {
	console.log("INIT");
	let gameController = GameController.getInstance();
	gameController.init();
});