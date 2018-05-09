"use strict";

const SC = require("./Const");

class Lobby {
	constructor(id, player = null) {
		this._players = [];
		if(player) {
			player.setLobby(this);
			this._players.push(player);
		}
		this._id = id;
	}
	
	tryToAddPlayer(player) {
		if(this._players.length < SC.GAME_CONF.MAX_PLAYER) {
			player.setLobby(this);
			this._players.push(player);
			return true;
		}
		return false;
	}
	
	removePlayer(player) { return this._players = this._players.filter(e => e !== player); }
	
	getId() { return this._id;}
	
	start() {
		return new Promise(this._startAsync);
	}
	
	// TODO Lukas GAMELOOP
	_startAsync(resolve, reject) {
		// THIS HERE IS ASYNC
		console.log(this);
		resolve();
	}
	
}

module.exports = Lobby;