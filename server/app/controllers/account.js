/*jslint node: true */
/*global __filename */
"use strict";

var mongoose = require('mongoose'),
    User = mongoose.model('User').model;

/**
 * Fetch information of the currently logged in user. If the user is not logged in, send a different response.
 */
exports.detail = function (req, res) {
    if (!req.user) {
        return res.send({
            loggedIn: false,
            doc: null
        });
    }

    return res.send({
        loggedIn: true,
        doc: req.user
    });
};


/**
 * Method to register a user.
 */
exports.register = function (req, res) {
    var user = new User(req.body),
        salt = randomString(12),
        pwd = user.password;
    user.hashPassword(salt, pwd);

    user.save(function (err) {

        var retObj = {
            meta: {
                "action": "create",
                'timestamp': new Date(),
                filename: __filename
            },
            doc: doc,
            err: err
        };

        if(!err) {
            req.login(user);
        }

        return res.send(retObj);

    });
}

/**
 * Method to log out a user.
 */
exports.signout = function (req, res) { 
    if (!req.user) {
        return res.send({
            ok:0
        });
    }

    req.logout();

    return res.send({
        ok:1
    });
}

function randomString (length) {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = length;
	var randomstring = '';
	for (var i = 0; i < string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum, rnum + 1);
	}
	document.randform.randomfield.value = randomstring;
}