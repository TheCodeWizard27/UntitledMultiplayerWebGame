"use strict";
import Graphics from "./Graphics.js";
import GameObj from "./GameObj.js";
import ControllerListener from "./ControllerListener.js";
import {uuid} from "./functions.js";

let GameController = {
	_gameController : null,
	
	getInstance : function(){
		if(this._gameController == null){
			this._gameController = {
				_stage : new createjs.Stage("window"),
				_graphics : null,
				_gameObj : null,
				_controllerListener : null,
				
				init : function(){
					this._graphics = Graphics.getInstance(this._stage);
					this._graphics.init();
					this._gameObj = GameObj.getInstance();
					
					this._controllerListener = new ControllerListener();
					this._controllerListener.setGlobalEvents(CONTROLLER.GLOBAL.CONNECT, this.controllerConnect.bind(this));
					this._controllerListener.setGlobalEvents(CONTROLLER.GLOBAL.DISCONNECT, this.controllerDisconnect.bind(this));
					this._controllerListener.setButtonCallback(CONTROLLER.DOWN, this.controllerBtnDown.bind(this));
					this._controllerListener.setButtonCallback(CONTROLLER.UP, this.controllerBtnUp.bind(this));
					this._controllerListener.setDPadCallback(CONTROLLER.DOWN, this.controllerDPadDown.bind(this));
					this._controllerListener.setDPadCallback(CONTROLLER.UP, this.controllerDPadUp.bind(this));
				},
				
				start : function(){
					createjs.Ticker.addEventListener("tick", this.update.bind(this));
					this._controllerListener.start();
					
					socket.on("NEW_PLAYER", (player)=>{
						this._gameObj.addPlayer(player);
					});
					
					socket.on("SEND_DATA", (player)=>{
						this._gameObj._playerList.set(player._id, player);
					});
					
				},
				
				update : function(){
					this._gameObj.update();
					this._stage.update();
				},
				
				/**
				 * adds newly connected controller with player to game
				 * @param pad	the controller with identifier
				 */
				controllerConnect : function(pad){
					this._gameObj.addPlayer(uuid()); // TODO Lukas
				},
				/**
				 * remove disconnected controller with player
				 * @param pad	the disconnected controller
				 */
				controllerDisconnect : function(pad){
					this._gameObj.removePlayer(pad.index);
				},
				
				/**
				 * adds pressed button to players keybuffer
				 * @param id	identifier for player
				 * @param btn	the button pressed
				 */
				controllerBtnDown : function(id, btn){
					this._gameObj.addPlayerKey(id.index, btn);
				},
				/**
				 * removes pressed button to players keybuffer
				 * @param id	identifier for player
				 * @param btn	the button released
				 */
				controllerBtnUp : function(id, btn){
					this._gameObj.removePlayerKey(id.index, btn);
				},
				
				/**
				 * adds direction to Player with keybuffer
				 * @param id	identifier for player
				 * @param axis	which direction was pressed
				 */
				controllerDPadDown : function(id, axis){
					this._gameObj.addPlayerKey(id.index, createjs.Point(axis.x, axis.y));
				},
				/**
				 * removes direction to Player with keybuffer
				 * @param id	identifier for player
				 * @param axis	which direction was released
				 */
				controllerDPadUp : function(id, axis){
					this._gameObj.removePlayerKey(id.index, createjs.Point(axis.x, axis.y));
				}
 			}
		}
		return this._gameController;
	}
};

export default GameController;