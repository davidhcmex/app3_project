const express = require('express');
var expressValidator = require("express-validator");
let router = express.Router();
//express validator middleware
router.use(expressValidator(
    {
        errorFormatter: function (param, msg, value) {
            var namespace = param.split("."),
                root = namespace.shift(),
                formParam = root;

            while (namespace.length) {
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

    req.checkBody("username", "Name is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Email Format is required").isEmail();
    req.checkBody("password", "Password is required").notEmpty();
    req.checkBody("passwordConfirmation", "Password Conf is required").notEmpty();

    let errors = req.validationErrors();
    console.log(errors)
    // res.status(400).json({errors:errors})
    res.send({ errors: errors })


})
module.exports = router;