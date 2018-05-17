"use strict";
const Client = require("../../src/client/Client.js");

let Core = {
	core: null,
	
	getInstance() {
		if(this.core == null) {
			this.core = {
				
				init() {
				
				},
				
				start() {
					//TODO Benny IDK
				},
				
				update(gameObj) {
					if(gameObj !== undefined) {
						gameObj._playerMap.forEach(function(value, key, map) {
							value.update();
						});
					}
				}
			};
		}
		return this.core;
	}
};

module.exports = Core;