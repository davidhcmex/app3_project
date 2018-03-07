"use strict";
//const express = require('express');
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var app = express();
var port = process.env.PORT || 5000;
var bodyParser = require("body-parser");
//const mongoose = require("mongoose");
var config = require("./config/database");
var users = require("./routes/users");
//mongoose.connect("mongodb://localhost/nodekb");
mongoose.connect(config.database);
var db = mongoose.connection;
db.once("open", function () {
    console.log("Connected to MongoDB");
});
db.on("error", function (err) {
    console.log(err);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.get('/api/hello', function (req, res) {
    res.send({ express: 'Hello From Express' });
});
app.listen(port, function () { return console.log("Listening on port " + port); });
