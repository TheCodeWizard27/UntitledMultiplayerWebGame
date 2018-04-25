"use strict";
const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const port = 3000;
const hostname = "lh";

const SC = require("./src/Const.js");

app.use(express.static(path.join(__dirname, "public")));

io.on(SC.IO.NEW_CONNECTION, socket => {
	console.log("CONNECTION");
	
	socket.emit(SC.IO.OUT.OUT_TEST1, "I");
	socket.emit(SC.IO.OUT.OUT_TEST2, "II");
	socket.emit(SC.IO.OUT.OUT_TEST3, "III");
	
	socket.on(SC.IO.IN.IN_TEST1, data => {
		console.log("%s btn %s",socket.id ,data);
	});
	socket.on(SC.IO.IN.IN_TEST2, data => {
		console.log("%s btn %s",socket.id ,data);
	});
	socket.on(SC.IO.IN.IN_TEST3, data => {
		console.log("%s btn %s",socket.id ,data);
	});
	
	socket.on("btn", data => {
		console.log("%s btn %s",socket.id ,data);
	});
	
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});