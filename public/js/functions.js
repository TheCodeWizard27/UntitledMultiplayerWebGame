"use strict";

/**
 * Make the first letter of a string uppercase
 * @param str
 * @returns {string}
 */
export function upperFirst(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Compare all passed  {@link createjs.Point points}
 * @returns {boolean}
 */
export function comparePoints(pt1, pt2) { return pt1.x === pt2.x && pt1.y === pt2.y;}

export function uuid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}