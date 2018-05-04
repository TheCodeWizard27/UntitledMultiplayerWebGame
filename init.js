"use strict";
const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const port = 3000;
const hostname = "localhost";

const SC = require("./src/Const.js").SERVER;

const Connection = require("./src/Connection.js");
const Player = require("./src/Player.js");
const LobbyManager = require("./src/LobbyManager.js");

app.use(express.static(path.join(__dirname, "public")));

const lobbyManager = new LobbyManager();

io.on(SC.NEW_CONNECTION, socket => {
	let connection = new Connection(socket);
	let player = new Player(connection);
	lobbyManager.addPlayerToALobby(player);
	
	connection.on(SC.DISCONNECT, () => {
		console.log("DISCONNECT %s", socket.id);
		player.disconnect();
	});
	
	connection.on("I_AM_NEW", (me)=>{
		socket.broadcast.emit("NEW_PLAYER", me);
	});
	
	connection.on("RECEIVE_DATA", (me)=>{
		socket.broadcast.emit("SEND_DATA", me);
	});
	
	console.log("Added Player with ID \"%s\" to Lobby %i", socket.id, player.getLobby().getId());
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});