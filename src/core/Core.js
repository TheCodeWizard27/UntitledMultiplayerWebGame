"use strict";

const Client = require("../../src/client/Client.js");
const ControllerListener = require("../../src/client/ControllerListener.js"); //TODO Benny ControllListener

let Core = {
	core: null,
	
	getInstance(isClient) {
		if(this.core == null) {
			this.core = {
				
				init() {
				
				},
				
				start() {
					if(isClient) {
						let client = Client.getInstance();
						
					} else {
					
					}
				}
			};
		}
		console.log("init core");
		return this.core;
	}
};

module.exports = Core;