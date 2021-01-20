const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
	res.send("Hello World!");
});

// Middleware para Vue.js router modo history
const history = require("connect-history-api-fallback");
app.use(history());

// Static
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Servidor en línea en el puerto: ${port}`);
});
