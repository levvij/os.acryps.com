const multer = require("multer");

module.exports = app => {
	const formData = multer();

	const files = {};

	app.post("/stzr/create/", (req, res) => {
		res.json(Math.random().toString(36).substr(2));
	});

	app.post("/stzr/mkdir", (req, res) => {
		res.json(true);
	});

	app.post("/stzr/write", formData.fields([
		{ name: "container" },
		{ name: "path" },
		{ name: "file" },
		{ name: "mime" }
	]), (req, res) => {
		const id = Math.random().toString(36).substr(2);

		files[id] = {
			body: req.files.file[0].buffer,
			mime: req.body.mime,
			path: id,
			name: req.body.name
		}
	
		res.json(files[id]);
	});

	app.get("/stzr/container/:container/:file", (req, res) => {
		const file = files[req.params.file];

		if (file.mime) {
			res.header("content-type", file.mime);
		}

		res.end(file.body);
	});

	app.post("/stzr/meta", (req, res) => {
		res.json({
			files: [],
			size: 0xffff
		});
	});
};