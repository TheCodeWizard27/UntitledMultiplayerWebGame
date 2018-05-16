"use strict";

class Functions {
	/**
	 * Make the first letter of a string uppercase
	 * @param str
	 * @returns {string}
	 */
	static upperFirst(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
	
	/**
	 * Compare all passed  {@link createjs.Point points}
	 * @returns {boolean}
	 */
	static comparePoints(pt1, pt2) { return pt1.x === pt2.x && pt1.y === pt2.y;}
	
	static s4() {
		return Math.floor(( 1 + Math.random() ) * 0x10000)
			.toString(16)
			.substring(1);
	}
	
	static uuid(){return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4();}
}

module.exports = Functions;