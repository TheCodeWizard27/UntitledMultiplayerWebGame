"use strict";
// Server Configuration
const SERVER = {
	NEW_CONNECTION: "connect",
	ON_EVENT: "event",
	DISCONNECT: "disconnect",
	IN: {
		USER_INPUT: "Input"
	},
	OUT: {
		INIT: "Init",
		INPUT_RESPONSE: "Input response"
	}
};
const GAME_CONF = {
	FPS: 30,
	MAX_PLAYER: 4,
	SPEED: 10,
	MARKER_SPEED: 40,
	SHOOT_COOLDOWN: 4,
	GRID_WIDTH: 1400,
	GRID_HEIGHT: 710,
	GRID_TILES_COUNT_X: 20,
	GRID_TILES_COUNT_Y: 20
};

const CONTROLLER = {
		PRESSED: "pressed",
		UP: "up",
		DOWN: "down",
		GLOBAL: {
			CONNECT: "connect",
			DISCONNECT: "disconnect"
		}
	}
;

const DIRECTION = {
	UP: new createjs.Point(0, -1),
	DOWN: new createjs.Point(0, 1),
	LEFT: new createjs.Point(-1, 0),
	RIGHT: new createjs.Point(1, 0),
	WAITING: new createjs.Point(0, 0)
};

const socket = io();