"use strict";

const SC = require("./Const");

class Lobby {
	constructor(id) {
		this._players = [];
		this._id = id;
	}
	
	tryToAddPlayer(player) {
		if(this._players.length < SC.GAME.MAX_PLAYER) {
			player.setLobby(this);
			this._players.push(player);
			return true;
		}
		return false;
	}
	
	removePlayer(player) { return this._players = this._players.filter(e => e !== player); }
	
	getId() { return this._id;}
	
}

module.exports = Lobby;