const socket = io();
socket.on("ret", data => {
	console.log(data);
});
socket.emit("connection", "JOIN");
socket.emit("hui", "HALLO");