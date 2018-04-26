"use strict";

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
//_socket.emit(SC.IO.OUT.OUT_TEST1, "I");
//_socket.emit(SC.IO.OUT.OUT_TEST2, "II");
//_socket.emit(SC.IO.OUT.OUT_TEST3, "III");
//
//_socket.on(SC.IO.IN.IN_TEST1, data => {
//	console.log("%s btn %s",_socket.id ,data);
//});
//_socket.on(SC.IO.IN.IN_TEST2, data => {
//	console.log("%s btn %s",_socket.id ,data);
//});
//_socket.on(SC.IO.IN.IN_TEST3, data => {
//	console.log("%s btn %s",_socket.id ,data);
//});
//
//_socket.on("btn", data => {
//	console.log("%i %s btn %s",Date.now() ,_socket.id ,data);
//});
//