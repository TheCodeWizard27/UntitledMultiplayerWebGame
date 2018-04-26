"use strict";

const Lobby = require("./Lobby");

class LobbyManager {
	constructor() {
		this._lobbies = [];
		this.i = 0;
	}
	
	addPlayerToALobby(player) {
		for(let lobby of this._lobbies) {
			if(lobby.tryToAddPlayer(player)) {
				player.setLobby(lobby);
				return;
			}
		}
		let newLobby = new Lobby(this.i++); // TODO Change id to a better value
		newLobby.tryToAddPlayer(player);
		this._lobbies.push(newLobby);
	}
}

module.exports = LobbyManager;