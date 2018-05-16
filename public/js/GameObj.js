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
					if(this._playerList.size < 4 && !this._playerList.has(identifier)){
						this._playerList.set(identifier, new Player(new createjs.Point(0,0), identifier));
					}
				},
				removePlayer : function(identifier){
					if(this._playerList.has(identifier)){
						this._playerList.get(identifier).delete();
						this._playerList.delete(identifier);
						console.log(this._playerList);
					}
				},
				addPlayerKey : function(identifier,key){
					if(this._playerList.has(identifier)){this._playerList.get(identifier).addKey(key);}
				},
				removePlayerKey : function(identifier,key){
					if(this._playerList.has(identifier)){this._playerList.get(identifier).removeKey(key);}
				},
				
				update : function(){
					this._playerList.forEach(function(value, key, map){
						value.update();
					});
				}
			}
		}
		return this._gameObj;
	}
};

export default GameObj;