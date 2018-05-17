"use strict";
const Core = require("../../src/core/Core.js");
global.window = global.document = global;

let Server = {
	server: null,
	
	getInstance(io) {
		if(this.server == null) {
			this.server = {
				io: io,
				init() {
					Core.getInstance(false);
				}
			};
		}
		console.log("Server init");
		return this.server;
	}
};

module.exports = Server;