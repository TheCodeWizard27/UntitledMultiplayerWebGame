"use strict";
const Core = require("../../src/core/Core.js");
global.window = global.document = global;

let Server = {
		server: null,
		_last: 0,
		_timeOut: 45,
		
		getInstance(io) {
			if(this.server == null) {
				this.server = {
					io: io,
					init() {
						Core.getInstance(false);
						this._last = Date.now();
						this.update();
					},
					
					update() {
						Core.getInstance().serverUpdate();
						
						let currTime = Date.now();
						let timeToCall = Math.max(0, this._timeOut - ( currTime - this._last ));
						window.setTimeout(this.update.bind(this), timeToCall);
					}
				};
			}
			console.log("Server init");
			return this.server;
		}
	}
;

module.exports = Server;