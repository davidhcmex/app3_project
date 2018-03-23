//const express = require('express');
//commonjs will never catch typescript errors
import * as express from "express"
//var expressValidator = require("express-validator");
import * as expressValidator from "express-validator"
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
                newUser.save(function (err: any) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    // else {
                    //    // req.flash("success", "You are now registered and can log in");
                    //     res.redirect("/users/login");
                    // }
                });
            })
        })
    }
})

router.post("/userlist", function (req, res, next) {
    // const username = req.body.username;
    // const password = req.body.password;

    console.log(req.body)
    User.find((req.body.searchParam) ? { username: { $regex: req.body.searchParam, $options: "i" } } : {}).
        limit(5).
        select('username').exec(function (err: any, users: any) {
            console.log(users)
            res.send(users)
        });
})


router.post("/contactlist", function (req, res, next) {
    // const username = req.body.username;
    // const password = req.body.password;

    console.log(req.body)
    Contact.find({ user: req.body.userIdParam }).exec(function (err: any, contacts: any) {
        console.log("ACA")
        console.log(contacts)
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
        console.log(query)
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
                console.log(user)
                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if (isMatch) {
                        console.log("Password Matchoo")
                        const token = jwt.sign({
                            id: user._id,
                            username: username
                        }, config.jwtSecret)
                        //   res.json({token})


                        //res.send({ token: token, isValid: true })

                        res.cookie("auth", token, { httpOnly: true, sameSite:true });
                        
                        res.send({ isValid: true, id: user._id, username:user.username });

                    }
                    else {
                        console.log("No Password Match")
                        errors = [{ param: "Password", msg: "Passwords do not match" }]

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