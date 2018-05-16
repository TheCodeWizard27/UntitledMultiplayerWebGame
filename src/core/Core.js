"use strict";

let Core = {
	core: null,
	
	getInstance() {
		if(this.core == null) {
			this.core = {
				
				init() {
				
				},
				
				start() {
					console.log("start");
				}
			};
		}
		console.log("init core");
		return this.core;
	}
};

module.exports = Core;