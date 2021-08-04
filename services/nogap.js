const ws = require("express-ws");

module.exports = app => {
	ws(app);

	app.ws("/nogap", socket => {
		console.log("NEW NOGAP SOCKET");

		socket.onmessage = event => {
			const message = JSON.parse(event.data);

			console.log("MESSAGE", message);

			if (message.type == "connect") {
				socket.send(JSON.stringify({
					tag: "connect",
					clients: [],
					node: Math.random().toString(36).substr(2)
				}));
			}
		}
	});
};