'use strict';
// Server Configuration
export const SERVER_CONFIGURATION = {
	IO: {
		NEW_CONNECTION: "connect",
		ON_EVENT: "event",
		DISCONNECT: "disconnect",
		IN: {
			USER_INPUT: "Input",
			IN_TEST1: "In1",
			IN_TEST2: "In2",
			IN_TEST3: "In3"
		},
		OUT: {
			INIT: "Init",
			INPUT_RESPONSE: "Input response",
			OUT_TEST1: "Out1",
			OUT_TEST2: "Out2",
			OUT_TEST3: "Out3"
		}
	},
	
	GAME: {
		FPS: 30,
		MAX_PLAYER: 4,
		SPEED: 20,
		MARKER_SPEED: 40,
		SHOOT_COOLDOWN: 4,
		GRID_WIDTH: 1400,
		GRID_HEIGHT: 710,
		GRID_TILES_COUNT_X: 20,
		GRID_TILES_COUNT_Y: 20
	}
};

export const DIRECTION = {
	UP: new createjs.Point(0,-1),
	DOWN: new createjs.Point(0,1),
	LEFT: new createjs.Point(-1,0),
	RIGHT: new createjs.Point(1,0),
	WAITING: new createjs.Point(0,0)
};