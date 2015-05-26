/*jslint node: true */
/*global __filename */
"use strict";

var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Create a new User.
 * @param req   The request information.
 * @param res   The result object.
 */

exports.create = function (req, res) {

    var doc = new User(req.body);

    doc.save(function (err) {

        var retObj = {
            meta: {
                "action": "create",
                'timestamp': new Date(),
                filename: __filename
            },
            doc: doc,
            err: err
        };

        return res.send(retObj);

    });
};

/**
 * Retrieve a list of _all_ Users.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.list = function (req, res) {
    var conditions, fields, sort;

    conditions = {};
    fields = {};
    sort = {'username': 1};

    User
        .find(conditions, fields)
        .sort(sort)
        .exec(function (err, doc) {

            var retObj = {
                meta: {
                    "action": "list",
                    'timestamp': new Date(),
                    filename: __filename
                },
                doc: doc, // array
                err: err
            };

            return res.send(retObj);

        });
};

/**
 * Fetch _one_ User record based on an username.
 * @param req
 * @param res
 */
exports.detail = function (req, res) {
    var conditions, fields;

    conditions = {username: req.params.username};
    fields = {};

    User
        .findOne(conditions, fields)
        .exec(function (err, doc) {
            var retObj = {
                meta: {"action": "detail", 'timestamp': new Date(), filename: __filename},
                doc: doc, // only the first document, not an array when using "findOne"
                err: err
            };
            return res.send(retObj);
        });
};

/**
 * Update a single User.
 * @param req   The request information.
 * @param res   The result object.
 */

exports.updateOne = function (req, res) {

    var conditions =
        {username: req.params.username},
        update = {
            username: req.body.username || '',
            salt: req.body.salt || '',
            password: req.body.password || '',
            firstName: req.body.firstName || '',
            inserts: req.body.inserts || '',
            lastName: req.body.lastName || '',
            dateOfBirth: req.body.dateOfBirth || '',
            emailAddress: req.body.emailAddress || '',
            addresses: req.body.addresses,
            modificationDate: new Date()

        },
        options = {multi: false},
        callback = function (err, doc) {
            var retObj = {
                meta: {
                    "action": "update",
                    'timestamp': new Date(),
                    filename: __filename,
                    'doc': doc,
                    'update': update
                },
                doc: update,
                err: err
            };

            return res.send(retObj);
        };

    User
        .findOneAndUpdate(conditions, update, options, callback);
};


/**
 * Delete a single User.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.deleteOne = function (req, res) {
    var conditions, callback, retObj;

    conditions = {username: req.params.username};
    callback = function (err, doc) {
        retObj = {
            meta: {
                "action": "delete",
                'timestamp': new Date(),
                filename: __filename
            },
            doc: doc,
            err: err
        };
        return res.send(retObj);
    };

    User
        .remove(conditions, callback);
};

