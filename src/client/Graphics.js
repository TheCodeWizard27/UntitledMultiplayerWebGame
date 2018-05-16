"use strict";

let Graphics = {
	graphics : null,
	
	getInstance() {
		if(this.graphics = null) {
			this.graphics = {
			
			}
		}
		console.log("graphics init");
		return this.graphics;
	}
};

module.exports = Graphics;