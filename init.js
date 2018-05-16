let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let Server = require('./src/server/Server.js');

//By default, we forward the / path to index.html automatically.
app.get( '/', function( req, res ){
	res.sendFile( 'index.html' , { root:__dirname + '/public' });
});

//This handler will listen for requests on /*, any file from the root of our server.
//See expressjs documentation for more info on routing.
app.get( '/*' , function( req, res, next ) {

	let file = req.params[0];

	res.sendFile( __dirname + '/' + file );
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

Server.getInstance(io).init();
