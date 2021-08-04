const fs = require("fs");
const path = require("path");

module.exports = app => {
	const ray = [{
		name: "c",
		source: "c",
		type: "p",
		size: 0,
		ctime: 0,
		mtime: 0,
		mime: ""
	}];

	const prefix = "file-system";

	function scan(source) {
		console.log(source);

		for (let file of fs.readdirSync(path.join(prefix, source))) {
			if (file[0] != "." || file == ".meta") {
				const lstat = fs.lstatSync(path.join(prefix, source, file));
				const isDirectory = lstat.isDirectory();
				const ext = path.extname(file);

				const item = {
					name: `${source}/${file}`,
					source: `/${source}/${file}`,
					type: isDirectory ? "d" : "f",
					size: lstat.size,
					ctime: lstat.ctime,
					mtime: lstat.mtime
				}
				
				ray.push(item);

				if (file.endsWith(".lnk")) {
					const lines = fs.readFileSync(path.join(prefix, source, file)).toString().split("\n");

					item.link = {
						path: lines[0],
						title: lines[1],
						icon: lines[2]
					}
				}

				if (isDirectory) {
					scan(`${source}/${file}`);
				}
			}
		}
	}

	scan("c");

	app.get("/ray", (req, res) => {
		console.log("RAY HIT");

		res.json(ray);
	})
}