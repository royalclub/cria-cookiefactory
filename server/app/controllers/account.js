/*jslint node: true */
/*global __filename */
"use strict";

var mongoose = require('mongoose'),
    User = mongoose.model('User').model;

exports.detail = function (req, res) {
    return res.send(req.user);
};