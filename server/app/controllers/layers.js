/*jslint node: true */
/*global __filename */
"use strict";

var mongoose = require('mongoose'),
    Layer = mongoose.model('Layer').model,
    LayerOption = mongoose.model('LayerOption').model;

/**
 * Create a new Layer.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.create = function (req, res) {
    var doc = new Layer(req.body);

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
 * Retrieve a list of _all_ Layers.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.list = function (req, res) {
    var conditions, fields, sort;

    conditions = {};
    fields = {};
    sort = {'name': 1};

    Layer
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
 * Retrieve details of a _single_ Layer.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.detail = function (req, res) {
    var conditions, fields;

    conditions = {name: req.params.name};
    fields = {};

    Layer
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
 * Update a single Layer.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.updateOne = function (req, res) {

    var conditions =
        {name: req.params.name},
        update = {
            name: req.body.name,
            required: req.body.required || true,
            options: req.body.options,
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

    Layer
        .findOneAndUpdate(conditions, update, options, callback);
};

/**
 * Delete a single Layer.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.deleteOne = function (req, res) {
    var conditions, callback, retObj;

    conditions = {name: req.params.name};
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

    Layer
        .remove(conditions, callback);
};