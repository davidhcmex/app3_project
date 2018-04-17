//const express = require('express');
//commonjs will never catch typescript errors
import * as express from "express"
//var expressValidator = require("express-validator");
import * as expressValidator from "express-validator"
let Conversation = require("../models/conversations");
let router = express.Router();
let User = require("../models/users");
let Contact = require("../models/contacts");
//const bcrypt = require("bcryptjs");
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
import config from "../config/jwtconfig"

//import * as passport from "passport";

//express validator middleware
router.use(expressValidator(
    {
        errorFormatter: function (param, msg, value) {
            var namespace = param && param.split("."),
                root = namespace && namespace.shift(),
                formParam = root;

            while (namespace && namespace.length) {
                formParam += "[" + namespace.shift() + "]"
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            }
        }
    }));

router.post("/", function (req, res) {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    req.checkBody("username", "Name is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Email Format is required").isEmail();
    req.checkBody("password", "Password is required").notEmpty();
    req.checkBody("passwordConfirmation", "Password Conf is required").notEmpty();
    req.checkBody("passwordConfirmation", "Passwords do not match").equals(req.body.password);

    let errors = req.validationErrors();
    if (errors) {
        console.log(errors)
        // res.status(400).json({errors:errors})
        res.send({ errors: errors, isValid: false })
    }
    else {
        let newUser = new User({
            username: username,
            email: email,
            password: password
        })
        res.send({ isValid: true })
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) {

                    console.log(err);
                }
                newUser.password = hash;
                newUser.save((err: any, doc: any) => {
                    //  console.log("nuevo", doc._id)
                    if (err) {
                        console.log(err);
                        return;
                    }
                    // CREATING a conversation for ALL the contacts (ALL contacts in a general room)
                    Conversation.findOneAndUpdate(
                        { "creator": doc._id },
                        { $set: { "creator": doc._id, "gral": true }, $push: { "members": doc._id } },
                        { upsert: true, returnNewDocument: true }, function (err: any, doc: any) {
                            console.log("after upsert")
                            //  console.log(doc)
                        }
                    );


                    // else {
                    //    // req.flash("success", "You are now registered and can log in");
                    //     res.redirect("/users/login");
                    // }
                });
            })
        })
    }
})

// updating the global conversation and creating a 1:1 conversation
router.post("/addconversation", function (req, res, next) {


    Conversation.findOneAndUpdate(
        { $and: [{ "creator": req.body.userId }, { "gral": true }] },//{ $and:"creator": req.body.userId }, 
        { $set: { "creator": req.body.userId }, $push: { "members": req.body.contactId } },
        // { $set: { "creator": req.body.userId, "members": [req.body.userId, req.body.contactId] } },
        { upsert: false, returnNewDocument: true }, function (err: any, doc: any) {

            if (!doc) {
                console.log("just once")
                let newConversation = new Conversation({
                    creator: req.body.userId,
                    members: [req.body.userId, req.body.contactId],
                    gral: true
                })
                newConversation.save()

            }
            console.log("after upsert1")
            //  console.log(doc)
            let newConversation = new Conversation({
                creator: req.body.userId,
                members: [req.body.userId, req.body.contactId],
                gral: false
            })
            newConversation.save((err: any, doc: any) => {
                console.log(err)
                let newContact = new Contact({
                    user: req.body.userId,
                    username: req.body.userName,
                    contact: req.body.contactId,
                    contactname: req.body.contactName,
                    conversationId: doc._id
                })

                newContact.save((err: any) => {
                    newContact = new Contact({
                        user: req.body.contactId,
                        username: req.body.contactName,
                        contact: req.body.userId,
                        contactname: req.body.userName,
                        conversationId: doc._id
                    })
                    newContact.save((err: any) => {
                        if (!(err))
                            res.send({ "ok": "ok" })
                        else
                            (console.log(err))
                    });
                })
            }
            );

        }
    );

    // Conversation.findOneAndUpdate(
    //     { $and: [{ "creator": req.body.userId }, { "gral": true }] },//{ $and:"creator": req.body.userId }, 
    //      //{ $set: { "creator": req.body.userId }, $push: { "members": req.body.contactId } },
    //     { $set: { "creator": req.body.userId, "members": [req.body.userId, req.body.contactId] } },
    //     { upsert: true, returnNewDocument: true }, function (err: any, doc: any) {
    //         console.log("after upsert1")
    //         //  console.log(doc)
    //         let newConversation = new Conversation({
    //             creator: req.body.userId,
    //             members: [req.body.userId, req.body.contactId],
    //             gral: false
    //         })
    //         newConversation.save((err: any, doc: any) => {
    //             console.log(err)
    //             let newContact = new Contact({
    //                 user: req.body.userId,
    //                 username: req.body.userName,
    //                 contact: req.body.contactId,
    //                 contactname: req.body.contactName,
    //                 conversationId: doc._id
    //             })

    //             newContact.save((err: any) => {
    //                 newContact = new Contact({
    //                     user: req.body.contactId,
    //                     username: req.body.contactName,
    //                     contact: req.body.userId,
    //                     contactname: req.body.userName,
    //                     conversationId: doc._id
    //                 })
    //                 newContact.save((err: any) => {
    //                     if (!(err))
    //                         res.send({ "ok": "ok" })
    //                     else
    //                         (console.log(err))
    //                 });
    //             })
    //         }
    //         );

    //     }
    // );


})


//get the conversations (or groups) that userID belongs to
//(there is always a member = userID), after this ending
//point, we "getnames" (the next ending point)
router.post("/getgroups", function (req, res, next) {


    console.log("aca")
    Conversation.find({
        $and: [{ members: { $elemMatch: { $eq: req.body.userId } } },
        { "gral": true }]
    })
        .select('_id').exec((err: any, otherGroupsIds: any) => {
            console.log("Other")
            console.log(otherGroupsIds)
            res.send(otherGroupsIds)
        })
})

router.post("/getnames", function (req, res, next) {


    console.log(req.body.arrayOfIds)
    // Conversation.find({ "_id": req.body.arrayOfIds[0]._id }).

    req.body.arrayOfIds.map((elem: any) =>
        Conversation.find({ "_id": elem }, { _id: 1 })
            .populate("members", { username: 1, email: 1 })
            .exec((err: any, rec: any) => {
             //   console.log(JSON.stringify(rec, null, "\t"))

                res.send(rec)
            }))


    //   res.send(rec))

});

router.post("/getnamesmessages", function (req, res, next) {

    console.log("I am here getting names")
 
    console.log(req.body.arrayOfMessages)
    res.send(req.body.arrayOfMessages)
    // Conversation.find({ "_id": req.body.arrayOfIds[0]._id }).




    //   res.send(rec))

});




router.post("/userlist", function (req, res, next) {

    User.find((req.body.searchParam) ? { username: { $regex: req.body.searchParam, $options: "i" } } : {}).
        limit(5).
        select('username').exec(function (err: any, users: any) {

            res.send(users)
        });
})


router.post("/contactlist", function (req, res, next) {
    Contact.find({ user: req.body.userIdParam }).exec(function (err: any, contacts: any) {
        res.send(contacts)
    });
})

router.post("/add", function (req, res, next) {
    // const username = req.body.username;
    // const password = req.body.password;

    let newContact = new Contact({
        user: req.body.userId,
        username: req.body.username,
        contact: req.body.contactId,
        contactname: req.body.contactName

    })
    console.log(req.body)
    newContact.save(function (err: any) {
        if (!(err))
            res.send({ "ok": "ok" })
        else
            (console.log(err))
    });
})

router.post("/login", function (req, res, next) {
    // const username = req.body.username;
    // const password = req.body.password;

    const { username, password } = req.body


    req.checkBody("username", "Name is required").notEmpty();
    req.checkBody("password", "Password is required").notEmpty();

    let errors = req.validationErrors();
    if (errors) {
        console.log("errores")
        console.log(errors)

        res.send({ errors: errors, isValid: false })
        return
    }
    else {

        let query = { username: username };
        //  console.log(query)
        let errors = {}
        User.findOne(query, function (err: any, user: any) {
            if (err) throw err;
            if (!user) {
                console.log("No User With that name")
                errors = [{ param: "User Name", msg: "No user with that name" }]

                res.send({ errors: errors, isValid: false })

            }
            else {
                //match password
                // console.log(user)
                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if (isMatch) {
                        console.log("Password Matchoo")
                        const token = jwt.sign({
                            id: user._id,
                            username: username
                        }, config.jwtSecret)
                        //   res.json({token})


                        //res.send({ token: token, isValid: true })

                        res.cookie("auth", token, { httpOnly: true, sameSite: true });

                        res.send({ isValid: true, id: user._id, username: user.username });

                    }
                    else {
                        console.log("No Password Match")
                        errors = [{ param: "Password", msg: "Incorrect Password" }]

                        res.send({ errors: errors, isValid: false })
                    }
                })
            }
        })
    }


})

// passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/users/login",
//     failureFlash: true
// }
// )(req, res, next)

module.exports = router;

