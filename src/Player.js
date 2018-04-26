"use strict";

class Player {
	constructor(connection) {
		this._connection = connection;
		this._myLobby = null;
		//		this._connection.on(SC.IO.IN.IN_TEST1, (x) => console.log(x));
	}
	
	disconnect() { this._myLobby.removePlayer(this); }
	
	setLobby(lobby) { this._myLobby = lobby;}
	
	getLobby() {return this._myLobby;}
}

module.exports = Player;