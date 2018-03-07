"use strict";
var mongoose = require("mongoose");
// User Schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
var User = module.exports = mongoose.model("User", UserSchema);
