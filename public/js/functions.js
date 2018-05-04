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
export function comparePoints(){
	if(arguments.length < 2) throw new Error("To little args");
	return Array.prototype.every.call(arguments, (el,i,arr)=> arr[0].x === el.x && arr[0].y === el.y);
}