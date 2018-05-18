"use strict";
const Player = require("../../src/core/Player.js");

module.exports = class GameObj {
	constructor() {
		this.playerMap = new Map();
	}
	
	addPlayer(id, pos) {
		if(this.playerMap.size < 4 && !this.playerMap.has(id)) {
			this.playerMap.set(id, new Player(id, pos));
		}
	}
	
	removePlayer(id) {
		if(this.playerMap.has(id)) {
			this.playerMap.get(id).destroy();
			this.playerMap.delete(id);
		}
	}
};
