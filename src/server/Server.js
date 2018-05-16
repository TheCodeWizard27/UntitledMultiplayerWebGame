let Server = {
	server : null,
	
	getInstance(io) {
		if(this.server = null) {
			this.server = {
			}
		}
		console.log("Server init");
		return this.server;
	}
};

module.exports = Server;