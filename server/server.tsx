//const express = require('express');

import * as express from "express"
import * as mongoose from "mongoose"

const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

//const mongoose = require("mongoose");
const config = require("./config/database");

let users = require("./routes/users");


//mongoose.connect("mongodb://localhost/nodekb");
mongoose.connect(config.database);
let db = mongoose.connection;

db.once("open", function () {
    console.log("Connected to MongoDB");
})

db.on("error", function (err) {
    console.log(err);
})

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use("/api/users", users);

app.get('/api/hello', function (req: express.Request, res:express.Response) {
  res.send({ express: 'Hello From Express' });
});


app.listen(port, () => console.log(`Listening on port ${port}`));