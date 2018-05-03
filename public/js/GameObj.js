'use strict';

import Graphics from "./Graphics.js";
import Player from "./Player.js";

/**
 * GameObj Object stores important information
 * @type {{_gameObj : null, getInstance : (function() : null)}}
 */
let GameObj = {
	_gameObj: null,
	
	/**
	 * creates one time only GameObj instance
	 */
	getInstance: function() {
		if(this._gameObj == null) {
			//creates new GameObj Object
			this._gameObj = {
				_playerList: new Map(),
				_collectables: [],
				
				addPlayer : function(identifier){
					this._playerList[identifier] = new Player(new createjs.Point(0,0));
				}
			}
		}
		return this._gameObj;
	}
};

export default GameObj;