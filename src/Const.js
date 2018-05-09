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
	SPEED: 20,
	MARKER_SPEED: 40,
	SHOOT_COOLDOWN: 4,
	GRID_WIDTH: 800,
	GRID_HEIGHT: 600,
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
};

module.exports = {SERVER: SERVER, GAME_CONF: GAME_CONF, CONTROLLER: CONTROLLER};