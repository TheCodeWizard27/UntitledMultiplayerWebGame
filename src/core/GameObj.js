"use strict";
const Player = require("../../src/core/Player.js");

module.exports = class GameObj {
	constructor() {
		this._playerMap = new Map();
	}
	
	addPlayer(id, pos) {
		if(this._playerMap.size < 4 && !this._playerMap.has(id)) {
			this._playerMap.set(id, new Player(id, pos));
		}
	}
	
	removePlayer(id) {
		if(this._playerMap.has(id)) {
			this._playerMap.get(id).destroy();
			this._playerMap.delete(id);
		}
	}
	
	getPlayer(id) {
		if(this._playerMap.has(id)) {
			return this._playerMap.get(id);
		} else {
			return undefined;
		}
	}
};
