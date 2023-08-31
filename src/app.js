const express = require("express");
const app = express();
const userRoutes = require("./Routes/UserRoutes");
const connectToDB = require("./db/DbConnection")
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json({ limit: "10mb" }));
require("dotenv").config();
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use(cors());


connectToDB();

app.use("/", userRoutes);

module.exports = app;