"use strict";

const SC = require("./Const");

class Connection {
	constructor(socket) {
		this._socket = socket;
	}
	
	on(eventName, callback) {
		this._socket.on(eventName, callback);
	}
}

module.exports = Connection;

//
//console.log("CONNECTION");
//
//socket.emit(SC.IO.OUT.OUT_TEST1, "I");
//socket.emit(SC.IO.OUT.OUT_TEST2, "II");
//socket.emit(SC.IO.OUT.OUT_TEST3, "III");
//
//socket.on(SC.IO.IN.IN_TEST1, data => {
//	console.log("%s btn %s",socket.id ,data);
//});
//socket.on(SC.IO.IN.IN_TEST2, data => {
//	console.log("%s btn %s",socket.id ,data);
//});
//socket.on(SC.IO.IN.IN_TEST3, data => {
//	console.log("%s btn %s",socket.id ,data);
//});
//
//socket.on("btn", data => {
//	console.log("%i %s btn %s",Date.now() ,socket.id ,data);
//});
//