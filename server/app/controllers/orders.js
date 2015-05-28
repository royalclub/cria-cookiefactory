/*jslint node: true */
/*global __filename */
"use strict";

var mongoose = require('mongoose'),
    Order = mongoose.model('Order'),
    OrderRule = mongoose.model('OrderRule'),
    OrderStatus = mongoose.model('OrderStatus'),
    OrderUser = mongoose.model('OrderUser'),
    Address = mongoose.model('Address');

/**
 * Create a new Order.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.create = function (req, res) {
    var doc = new Order(req.body);

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
 * Retrieve a list of _all_ Orders.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.list = function (req, res) {
    var conditions, fields, sort;

    conditions = {};
    fields = {};
    sort = {'creationDate': 1};

    Order
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
 * Retrieve details of a _single_ Order.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.detail = function (req, res) {
    var conditions, fields;

    conditions = {_id: req.params._id};
    fields = {};

    Order
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
 * Update a single Order.
 * @param req   The request information.
 * @param res   The result object.
 */
exports.updateOne = function (req, res) {

    var conditions =
        {_id: req.params._id},
        update = {
            "number": req.body.number,
            status: req.body.status,
            user: req.body.user,
            rules: req.body.rules,
            invoiceAddress: req.body.invoiceAddress,
            shipmentAddress: req.body.shipmentAddress,
            vatPercentage: req.body.vatPercentage,
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

    Order
        .findOneAndUpdate(conditions, update, options, callback);
};

/**
 * Delete a single Order.
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

    Order
        .remove(conditions, callback);
};