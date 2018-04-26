"use strict";
const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const port = 3000;
const hostname = "lh";

const SC = require("./src/Const.js");

const Connection = require("./src/Connection");
const Player = require("./src/Player");
const LobbyManager = require("./src/LobbyManager");

app.use(express.static(path.join(__dirname, "public")));

const lobbyManager = new LobbyManager();

io.on(SC.IO.NEW_CONNECTION, socket => {
	let connection = new Connection(socket);
	let player = new Player(connection);
	lobbyManager.addPlayerToALobby(player);
	console.log("Added Player with ID \"%s\" to Lobby %i", socket.id, player.getLobby().getId());
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});