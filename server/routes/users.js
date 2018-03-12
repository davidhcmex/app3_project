"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require('express');
//commonjs will never catch typescript errors
var express = require("express");
//var expressValidator = require("express-validator");
var expressValidator = require("express-validator");
var router = express.Router();
var User = require("../models/users");
//const bcrypt = require("bcryptjs");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var jwtconfig_1 = require("../config/jwtconfig");
//import * as passport from "passport";
//express validator middleware
router.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param && param.split("."), root = namespace && namespace.shift(), formParam = root;
        while (namespace && namespace.length) {
            formParam += "[" + namespace.shift() + "]";
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));
router.post("/", function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    req.checkBody("username", "Name is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Email Format is required").isEmail();
    req.checkBody("password", "Password is required").notEmpty();
    req.checkBody("passwordConfirmation", "Password Conf is required").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        // res.status(400).json({errors:errors})
        res.send({ errors: errors, isValid: false });
    }
    else {
        var newUser_1 = new User({
            username: username,
            email: email,
            password: password
        });
        res.send({ isValid: true });
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser_1.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                newUser_1.password = hash;
                newUser_1.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    // else {
                    //    // req.flash("success", "You are now registered and can log in");
                    //     res.redirect("/users/login");
                    // }
                });
            });
        });
    }
});
router.post("/find", function (req, res, next) {
    // const username = req.body.username;
    // const password = req.body.password;
    //let query = { username: username };
    var query = User.find();
    query.find({ username: /w*/ }).find(function (res) { console.log(res); });
    // User.findOne(query, function (err: any, user: any) {
    //     if (err) throw err;
    //     if (!user) {
    //         console.log("No User With that name")
    //         errors = [{ param: "User Name", msg: "No user with that name" }]
    //         res.send({ errors: errors, isValid: false })
    //     }
    //     else {
    //         //match password
    //         console.log(user)
    //         bcrypt.compare(password, user.password, function (err, isMatch) {
    //             if (isMatch) {
    //                 console.log("Password Matchoo")
    //                 const token = jwt.sign({
    //                     id: user._id,
    //                     username: username
    //                 }, config.jwtSecret)
    //                 //   res.json({token})
    //                 //res.send({ token: token, isValid: true })
    //                 res.cookie ("auth", token, { httpOnly: true });
    //                 res.send({ isValid: true });
    //             }
    //             else {
    //                 console.log("No Password Match")
    //                 errors = [{ param: "Password", msg: "Passwords do not match" }]
    //                 res.send({ errors: errors, isValid: false })
    //             }
    //         })
    //     }
    // })
});
router.post("/login", function (req, res, next) {
    // const username = req.body.username;
    // const password = req.body.password;
    var _a = req.body, username = _a.username, password = _a.password;
    req.checkBody("username", "Name is required").notEmpty();
    req.checkBody("password", "Password is required").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        console.log("errores");
        console.log(errors);
        res.send({ errors: errors, isValid: false });
        return;
    }
    else {
        var query = { username: username };
        console.log(query);
        var errors_1 = {};
        User.findOne(query, function (err, user) {
            if (err)
                throw err;
            if (!user) {
                console.log("No User With that name");
                errors_1 = [{ param: "User Name", msg: "No user with that name" }];
                res.send({ errors: errors_1, isValid: false });
            }
            else {
                //match password
                console.log(user);
                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if (isMatch) {
                        console.log("Password Matchoo");
                        var token = jwt.sign({
                            id: user._id,
                            username: username
                        }, jwtconfig_1.default.jwtSecret);
                        //   res.json({token})
                        //res.send({ token: token, isValid: true })
                        res.cookie("auth", token, { httpOnly: true });
                        res.send({ isValid: true });
                    }
                    else {
                        console.log("No Password Match");
                        errors_1 = [{ param: "Password", msg: "Passwords do not match" }];
                        res.send({ errors: errors_1, isValid: false });
                    }
                });
            }
        });
    }
});
// passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/users/login",
//     failureFlash: true
// }
// )(req, res, next)
module.exports = router;
