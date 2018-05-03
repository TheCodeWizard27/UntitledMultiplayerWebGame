"use strict";
//import io from "socket.io-client";
import {SERVER_CONFIGURATION as SC} from "./Const.js";
import GameController from "./GameController.js";

let div;

window.addEventListener("load", () => {
	console.log("INIT");
	div = document.getElementById("conns");
	document.getElementById("add").onclick = () => {
		new Connection();
	};
	GameController.init();
});

class Connection {
	constructor() {
		this._socket = io();
		this.udiv = document.createElement("div");
		this.udiv.setAttribute("class", "connection");
		
		let idiv = document.createElement("div");
		idiv.setAttribute("class", "flex");
		
		
		let p = document.createElement("p");
		let btn = document.createElement("button");
		btn.innerText = "DIE";
		btn.onclick = () => this.close();
		
		this.udiv.appendChild(document.createElement("hr"));
		
		idiv.appendChild(p);
		idiv.appendChild(btn);
		
		this.udiv.appendChild(idiv);
		this.udiv.appendChild(document.createElement("hr"));
		div.appendChild(this.udiv);
		
		this._socket.on(SC.IO.NEW_CONNECTION, () => {
			let id = this._socket.id;
			console.log("%o", id);
			this.udiv.id = id;
			p.innerText = id;
		});
	}
	
	close() {
		div.removeChild(this.udiv);
		this._socket.close();
	}
}

//
//addEventListener("load", () => {
//	document.getElementById("log").innerHTML = _socket.id;
//});
//
//_socket.on(SC.IO.OUT.OUT_TEST1, data => {
//	console.log(data);
//});
//
//_socket.on(SC.IO.OUT.OUT_TEST2, data => {
//	console.log(data);
//});
//
//_socket.on(SC.IO.OUT.OUT_TEST3, data => {
//	console.log(data);
//});
//
//_socket.emit(SC.IO.IN.IN_TEST1, "1");
//_socket.emit(SC.IO.IN.IN_TEST2, "2");
//_socket.emit(SC.IO.IN.IN_TEST3, "3");