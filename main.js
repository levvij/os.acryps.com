const express = require("express");
const path = require("path");

const stzr = require("./services/stzr");
const nogap = require("./services/nogap");
const ray = require("./services/ray");

// create app
const app = express();

// init config
app.get("/config/init", (req, res) => res.json([]));

// build ray
ray(app);

// register services
stzr(app);
nogap(app);

// static fs serve
app.use(express.static(path.join(__dirname, "file-system")));

// start application
app.listen(process.env.PORT || 2000);