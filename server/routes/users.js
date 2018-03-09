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
router.post("/login", function (req, res, next) {
    // const username = req.body.username;
    // const password = req.body.password;
    req.checkBody("username", "Name is required").notEmpty();
    req.checkBody("password", "Password is required").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        // res.status(400).json({errors:errors})
        res.send({ errors: errors, isValid: false });
    }
    else {
        res.send({ isValid: true });
        // passport.authenticate("local", {
        //     successRedirect: "/",
        //     failureRedirect: "/users/login",
        //     failureFlash: true
        // }
        // )(req, res, next)
    }
});
module.exports = router;
