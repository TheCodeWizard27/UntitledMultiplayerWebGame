"use strict";
// Server Configuration
const SERVER_CONFIGURATION = {
	IO: {
		NEW_CONNECTION: "connect",
		ON_EVENT: "event",
		DISCONNECT: "disconnect",
		IN: {
			USER_INPUT: "input",
			IN_TEST1: "in1",
			IN_TEST2: "in2",
			IN_TEST3: "in3"
		},
		OUT: {
			INIT: "init",
			INPUT_RESPONSE: "input response",
			OUT_TEST1: "OUT1",
			OUT_TEST2: "OUT2",
			OUT_TEST3: "OUT3"
		}
	},
	GAME: {
		FPS: 30,
		MAX_PLAYER: 4,
		SPEED: 20,
		SHOOT_COOLDOWN: 4,
		GRID_WIDTH: 800,
		GRID_HEIGHT: 600,
		GRID_TILES_COUNT_X: 20,
		GRID_TILES_COUNT_Y: 20
	}
};

module.exports = SERVER_CONFIGURATION;
