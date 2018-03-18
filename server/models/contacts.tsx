const mongoosec = require ("mongoose");

// Contacts Schema

const ContactSchema = mongoosec.Schema({
    // the id of the user that is logged in
    user : {
        type:String,
        required:true
    },

    //the name of the user that is logged in
    username : {
        type:String,
        required:true
    },
    
    contact : {
        type:String,
        required:true
    },

    contactname : {
        type:String,
        required:true
    }


},{collection:"UsersContacts"})

const Contact = module.exports = mongoosec.model("Contact", ContactSchema);