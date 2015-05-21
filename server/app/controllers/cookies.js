/*jslint node: true */
/*global __filename */
"use strict";

var mongoose = require('mongoose'),
    Cookie = mongoose.model('Cookie'),
    Layer = mongoose.model('Layer'),
    LayerOption = mongoose.model('LayerOption');

/**
 * Create a new Cookie.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.create = function (req, res) {
    var doc = new Cookie(req.body);

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
 * Retrieve a list of _all_ Cookies.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.list = function (req, res) {
    var conditions, fields, sort;

    conditions = {};
    fields = {};
    sort = {'name': 1};

    Cookie
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
 * Retrieve details of a _single_ Cookie.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.detail = function (req, res) {
    var conditions, fields;

    conditions = {_id: req.params._id};
    fields = {};

    Cookie
        .findOne(conditions, fields)
        .exec(function (err, doc) {
            var retObj = {
                meta: {"action": "detail", 'timestamp': new Date(), filename: __filename},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        });
};

/**
 * Update a single Cookie.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.updateOne = function (req, res) {

    var conditions =
        {_id: req.params._id},
        update = {
            name: req.body.name,
            creator: req.body.creator,
            layers: req.body.layers,
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

    Cookie
        .findOneAndUpdate(conditions, update, options, callback);
};

/**
 * Delete a single Cookie.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.deleteOne = function (req, res) {
    var conditions, callback, retObj;

    conditions = {_id: req.params._id};
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

    Cookie
        .remove(conditions, callback);
};