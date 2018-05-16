"use strict";

let Core = {
	core: null,
	
	getInstance() {
		if(this.core == null) {
			this.core = {
			
			};
		}
		console.log("init core");
		return this.core;
	}
};