"use strict";
var mongoosec = require("mongoose");
// Contacts Schema
var ContactSchema = mongoosec.Schema({
    // the id of the user that is logged in
    user: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    contactname: {
        type: String,
        required: true
    },
    conversationId: {
        type: String,
        required: true
    }
}, { collection: "UsersContacts" });
var Contact = module.exports = mongoosec.model("Contact", ContactSchema);