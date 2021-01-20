const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

// Connection to DB
const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/mevn-backend";
const options = { useNewUrlParser: true, useCreateIndex: true };

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

app.use("/api", require("./routes/nota"));

// Middleware para Vue.js router modo history
const history = require("connect-history-api-fallback");
const { Router } = require("express");
app.use(history());

// Static
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Servidor en línea en el puerto: ${port}`);
});
