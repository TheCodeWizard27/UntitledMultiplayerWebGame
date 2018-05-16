"use strict";
const Core = require("../../src/core/Core.js");

let Server = {
	server: null,
	
	getInstance(io) {
		if(this.server == null) {
			this.server = {
				init(){
					Core.getInstance(false);
				}
			};
		}
		console.log("Server init");
		return this.server;
	}
};

module.exports = Server;