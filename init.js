const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const port = 3000;
const hostname = "lh";

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
	console.log("CONNECTION");
	socket.on("hui", data => {
		console.log("hui %s", data);
		socket.emit("ret", "Muahaasdshah");
	});
	
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

//import * as express from "express";
//import * as http from "http";
//import ioL from "socket.io";
////import $ from "jquery";
//
//console.log("START");
//
//let app = express();
//let server = http.Server(app);
//let io = ioL(server);
//let port = 2424;
//let sockets = {};
//
//app.get('/', function(req, res) {
//	res.sendfile('index.html');
//});
//
////Whenever someone connects this gets executed
//io.on('connection', function(socket) {
//	console.log('A user connected');
//
//	//Whenever someone disconnects this piece of code executed
//	socket.on('disconnect', function () {
//		console.log('A user disconnected');
//	});
//
//	socket.on("hi", x => console.log(x));
//});
//
//http.listen(3000, function() {
//	console.log('listening on *:3000');
//});

