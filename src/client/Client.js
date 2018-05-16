let Client = {
	client : null,
	
	getInstance() {
		if(this.client = null){
			this.client = {
			
			}
		}
		console.log("client init");
		return this.client;
	}
};

module.exports = Client;

Client.getInstance();