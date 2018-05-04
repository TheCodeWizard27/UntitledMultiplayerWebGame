"use strict";
//import io from "socket.io-client";
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
	
	
	
//	let cl = new ControllerListener();
//	cl.setGlobalEvents(CONTROLLER.GLOBAL.CONNECT, pad => console.log("CONNECT %o", pad));
//	cl.setGlobalEvents(CONTROLLER.GLOBAL.CONNECT, pad => console.log("DISCONNECT %o", pad));
//
//	cl.setButtonCallback(CONTROLLER.DOWN, (id, btn)=>console.log("BTN DOWN %s %o", id, btn));
//	cl.setButtonCallback(CONTROLLER.UP, (id, btn)=>console.log("BTN UP %s %o", id, btn));
////	cl.setButtonCallback("pressed", (id, btn)=>console.log("BTN PRESSED %s %o", id, btn));
//
//	cl.setDPadCallback(CONTROLLER.DOWN, (id, axis) => console.log("AXIS DOWN %s %o", id, axis));
//	cl.setDPadCallback(CONTROLLER.UP, (id, axis) => console.log("AXIS UP %s %o", id, axis));
//
//	cl.start();
//
});