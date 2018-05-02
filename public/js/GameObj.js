'use strict';

let GameObj = {
	_gameObj: null,			//"static" gameObj variable for singleton
	
	getInstance: function() {
		if(this._gameObj == null) {
			//creates new GameObj Object
			this._gameObj = {
				_playerList: new Map(),
				_collectables: [],
			}
		}
		return this._gameObj;
	}
};

export default GameObj;