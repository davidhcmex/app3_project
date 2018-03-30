"use strict";
var mongoosed = require("mongoose");
var Users = require("../models/users");
// Contacts Schema
var ConversationSchema = mongoosed.Schema({
    // the id of the user that is logged in
    creator: {
        type: String,
        required: true
    },
    gral: {
        type: Boolean,
        required: true
    },
    // comments: [{
    //     text: String,
    //     postedBy: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     }
    // }]
    members: [{ type: mongoosed.Schema.Types.ObjectId, ref: 'User' }],
}, { collection: "conversations" });
var Conversation = module.exports = mongoosed.model("Conversations", ConversationSchema);
