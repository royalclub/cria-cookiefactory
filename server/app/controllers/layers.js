/*jslint node: true */
/*global __filename */
"use strict";

var mongoose = require('mongoose'),
    Layer = mongoose.model('Layer'),
    LayerOption = mongoose.model('LayerOption');

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
    sort = {'sequence': 1};

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

    conditions = {_id: req.params._id};
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
        {_id: req.params._id},
        update = {
            name: req.body.name,
            required: req.body.required || true,
            sequence: req.body.sequence || 0,
            options: req.body.options,
            modificationDate: new Date()
        },
        options = {
            multi: false,
            runValidators: true
        },
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

    Layer
        .remove(conditions, callback);
};

/**
 * Retrieve a list of LayerOptions belonging to a Layer.
 */
exports.listOptions = function (req, res) {
    var conditions, fields;

    conditions = {};
    fields = {};

    Layer
        .find(conditions, fields)
        .exec(function (err, doc) {

            var retObj = {
                meta: {
                    "action": "listOptions",
                    'timestamp': new Date(),
                    filename: __filename
                },
                doc: doc.options, // array
                err: err
            };

            return res.send(retObj);
        });
};

/**
 * Create an LayerOption inside an Layer.
 */
exports.createOption = function (req, res) {
    var layerOption, conditions, fields;

    layerOption = new LayerOption(req.body);
    conditions = {_id: req.params._id};
    fields = {};
    Layer
        .findOne(conditions, fields)
        .exec(function (err, doc) {
            doc.options.push(layerOption);
            doc.save(function (err) {

                var retObj = {
                    meta: {
                        "action": "createOption",
                        'timestamp': new Date(),
                        filename: __filename
                    },
                    doc: doc.options,
                    err: err
                };
                return res.send(retObj);
            });
        });

    Layer
        .findOneAndUpdate();
};

/**
 * Delete an LayerOption inside an Layer.
 */
exports.deleteOption = function (req, res) {
    var conditions, fields;
    conditions = {_id: req.params._id};
    fields = {};
    Layer
        .findOne(conditions, fields)
        .exec(function (err, doc) {
            var optionConditions = {name: req.params.name};
            doc.options.remove(optionConditions, function (err, doc) {
                var retObj = {
                    meta: {
                        "action": "deleteOption",
                        'timestamp': new Date(),
                        filename: __filename
                    },
                    doc: doc.options,
                    err: err
                };
                return res.send(retObj);
            });
        });

    Layer
        .findOneAndUpdate();
};