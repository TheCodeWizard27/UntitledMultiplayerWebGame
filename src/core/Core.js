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
				
				update(){
					//TODO Benny Game Logic Update
				},
				serverUpdate(){
					//TODO Benny Server Update + foreach(lobby) this.update
				}
			};
		}
		return this.core;
	}
};

module.exports = Core;