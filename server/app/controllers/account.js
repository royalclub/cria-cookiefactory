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
 * Method to log out a user.
 */
exports.signout = function (req, res) {
    if (!req.user) {
        return res.send({
            ok: 0
        });
    }

    req.logout();

    return res.send({
        ok: 1
    });
};