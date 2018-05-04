"use strict";
//import io from "socket.io-client";
import {SERVER_CONFIGURATION as SC} from "./Const.js";
import GameController from "./GameController.js";
import ControllerListener from "./ControllerListener.js";

window.addEventListener("load", () => {
	/*let windowResize = function(e){
		let faktor = window.innerWidth / SC.GAME.GRID_WIDTH;
		let canvas = document.getElementById("window");
		
		canvas.style.width = window.innerWidth.toString()+"px";
		canvas.style.height = (SC.GAME.GRID_HEIGHT*faktor).toString()+"px";
	};
	windowResize();
	window.onresize = windowResize;*/
	
	GameController.getInstance().init();
	
	let cl = new ControllerListener();
	cl.setGlobalEvents("connect", pad => console.log("CONNECT %o", pad));
	cl.setGlobalEvents("disconnect", pad => console.log("DISCONNECT %o", pad));
	
	cl.setButtonCallback("down", (id, btn)=>console.log("BTN DOWN %s %o", id, btn));
	cl.setButtonCallback("up", (id, btn)=>console.log("BTN UP %s %o", id, btn));
	cl.setButtonCallback("pressed", (id, btn)=>console.log("BTN PRESSED %s %o", id, btn));
	
	cl.setDPadCallback("down", (id, axis) => console.log("AXIS DOWN %s %o", id, axis));
	cl.setDPadCallback("up", (id, axis) => console.log("AXIS UP %s %o", id, axis));
	
	cl.start();
});