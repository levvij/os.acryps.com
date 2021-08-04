const express = require("express");
const path = require("path");
const ws = require("express-ws");

// create app
const app = express();

// register websockets
ws(app);

// register nogap service
app.ws("/nogap", socket => {
	console.log("NEW NOGAP SOCKET");
});

// init config
app.get("/config/init", (req, res) => res.json([]));

// static fs serve
app.use(express.static(path.join(__dirname, "fs")));

// start application
app.listen(process.env.PORT || 2000);