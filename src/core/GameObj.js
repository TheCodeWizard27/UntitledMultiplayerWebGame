"use strict";
const Player = require("../../src/core/Player.js");

module.exports = class GameObj {
	constructor() {
		this._playerList = new Map();
	}
	
	addPlayer(id, pos) {
		if(this._playerList.size < 4 && !this._playerList.has(id)) {
			this._playerList.set(id, new Player(id, pos));
		}
	}
	
	removePlayer(id) {
		if(this._playerList.has(id)) {
			this._playerList.get(id).destroy();
			this._playerList.delete(id);
		}
	}
	
	getPlayer(id) {
		if(this._playerList.has(id)) {
			return this._playerList.get(id);
		} else {
			return undefined;
		}
	}
};
