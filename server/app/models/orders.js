/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        address = require('./address.js'),
        orderStatus = require('./orderStatus.js'),
        orderRule = require('./orderRules.js'),
        orderUser = require('./orderUsers.js'),
        orderSchema;

    orderSchema = new mongoose.Schema({
        "number": {type: String, required: true, unique: true},
        status: {type: Number, required: true},
        user: [orderUser.schema],
        rules: [orderRule.schema],
        invoiceAddress: [address.schema],
        shipmentAddress: [address.schema],
        vatPercentage: {type: Number, required: true, min: 0, max: 100},
        creationDate: {type: Date, "default": Date.now, required: true},
        modificationDate: {type: Date, "default": Date.now, required: true}
    }, {collection: "orders"});

    module.exports = {
        schema: orderSchema,
        model: mongoose.model('Order', orderSchema)
    };
}());