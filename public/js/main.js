console.log("INIT");

//import io from "socket.io-client";
import {SERVER_CONFIGURATION as SC} from "./Const.js";

const socket = io();

window.addEventListener("load", () => {
	document.getElementById("log").innerHTML = socket.id;
});

socket.on(SC.IO.OUT.OUT_TEST1, data => {
	console.log(data);
});

socket.on(SC.IO.OUT.OUT_TEST2, data => {
	console.log(data);
});

socket.on(SC.IO.OUT.OUT_TEST3, data => {
	console.log(data);
});

socket.emit(SC.IO.IN.IN_TEST1, "1");
socket.emit(SC.IO.IN.IN_TEST2, "2");
socket.emit(SC.IO.IN.IN_TEST3, "3");

document.getElementById("trigger").onclick = () => {
	socket.emit("btn", "KNOPP");
};