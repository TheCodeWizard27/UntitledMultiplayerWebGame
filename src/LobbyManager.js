"use strict";

const Lobby = require("./Lobby");

class LobbyManager {
	constructor() {
		this._lobbies = [];
		this.i = 0;
	}
	
	addPlayerToALobby(player) {
		for(let lobby of this._lobbies.map(e=>e[0])) {
			if(lobby.tryToAddPlayer(player)) {
				player.setLobby(lobby);
				return;
			}
		}
		let newLobby = new Lobby(this.i++, player); // TODO Change id to a better value
		let res = newLobby.start();
		this._lobbies.push([newLobby, res]);
	}
}

module.exports = LobbyManager;