"use strict";
const Core = require("../../src/core/Core.js");
const Graphics = require("../../src/client/Graphics.js");

module.exports = {
	client: null,
	
	getInstance() {
		if(this.client == null) {
			this.client = {
				_core: Core.getInstance(),
				_graphics: Graphics.getInstance(),
				
				init() {
					this._core.init();
					this._graphics.init(this);	//inits graphics that after loading calls this.start
				},
				
				start() {
					//TODO Benny add EventListeners and such
				},
				
				update(event) {
					this._core.update();
					
					this._graphics.updateView(event);
				}
			};
		}
		console.log("client init");
		return this.client;
	}
};