"use strict";
const Graphics = require("../../src/client/Graphics.js");

let Client = {
	client: null,
	
	getInstance() {
		if(this.client == null) {
			this.client = {
				_graphics: Graphics.getInstance(),
				
				init() {
					this._graphics.init();
				}
			};
		}
		console.log("client init");
		return this.client;
	}
};

module.exports = Client;