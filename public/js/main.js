"use strict";
//import io from "socket.io-client";
import GameController from "./GameController.js";
import ControllerListener from "./ControllerListener.js";

window.addEventListener("load", () => {
	console.log("INIT");
	/*let windowResize = function(e){
		let faktor = window.innerWidth / GAME_CONF.GRID_WIDTH;
		let canvas = document.getElementById("window");
		
		canvas.style.width = window.innerWidth.toString()+"px";
		canvas.style.height = (GAME_CONF.GRID_HEIGHT*faktor).toString()+"px";
	};
	windowResize();
	window.onresize = windowResize;*/
	
// GameController.getInstance().init();

	let cl = new ControllerListener();
	cl.setGlobalEvents(CONTROLLER.GLOBAL.CONNECT, pad => console.log("CONNECT %o", pad));
	cl.setGlobalEvents(CONTROLLER.GLOBAL.DISCONNECT, pad => console.log("DISCONNECT %o", pad));

	cl.setButtonCallback(CONTROLLER.DOWN, (id, btn) => console.log("BTN DOWN %s %o", id, btn));
	cl.setButtonCallback(CONTROLLER.UP, (id, btn) => console.log("BTN UP %s %o", id, btn));
	//	cl.setButtonCallback(CONTROLLER.PRESSED, (id, btn)=>console.log("BTN PRESSED %s %o", id, btn));

	cl.setDPadCallback(CONTROLLER.DOWN, (id, axis) => console.log("AXIS DOWN %s %o", id, axis));
	cl.setDPadCallback(CONTROLLER.UP, (id, axis) => console.log("AXIS UP %s %o", id, axis));
	// cl.setDPadCallback(CONTROLLER.PRESSED, (id, axis) => console.log("AXIS PRESSED %s %o", id, axis));

	cl.start();

});