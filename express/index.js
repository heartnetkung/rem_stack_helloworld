const env = require("../env");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const https = require("https");

const main = async () => {
	//mongoose
	var mongoStatus = "not connected";
	mongoose
		.connect(env.mongo_url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => (mongoStatus = "connected"))
		.catch((e) => (mongoStatus = e.message));

	//routes
	var routes = {
		"/health": (req, res) => res.send("healthy"),
		"/hello": (req, res) => res.json({ text: "world" }),
		"/mongo": (req, res) => res.json({ mongoStatus }),
	};

	//express
	var app = express();
	app.use(cors());
	for (var route in routes) app.get(route, routes[route]);

	if (!env.https) return app.listen(env.port);

	var httpsConfig = {
		key: fs.readFileSync(path.join(__dirname, "..", "privkey.pem"), "utf8"),
		cert: fs.readFileSync(path.join(__dirname, "..", "cert.pem"), "utf8"),
		ca: fs.readFileSync(path.join(__dirname, "..", "chain.pem"), "utf8"),
	};
	https.createServer(httpsConfig, app).listen(env.port);
};

if (require.main === module) main().catch((e) => console.error(e));
