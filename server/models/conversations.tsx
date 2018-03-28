const mongoosed = require ("mongoose");
let Users = require("../models/users");


// Contacts Schema

const ConversationSchema = mongoosed.Schema({
    // the id of the user that is logged in
    creator: {
        type:String,
        required:true
    },
    gral: {
        type:Boolean,
        required:true
    },

    members: [{ type: mongoosed.Schema.Types.ObjectId, ref: 'User' }],

}, {collection:"conversations"})

const Conversation = module.exports = mongoosed.model("Conversations", ConversationSchema);