/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        addressModel = require('./address.js'),
        orderStatusModel = require('./orderStatus.js'),
        orderRuleModel = require('./orderRules.js'),
        orderUserModel = require('./orderUser.js'),
        orderSchema;

    orderSchema = new mongoose.Schema({
        "number": {type: String, required: true},
        status: [{type: orderStatusModel}],
        user: [{type: orderUserModel}],
        rules: [{type: orderRuleModel}],
        invoiceAddress: [{type: addressModel, required: true}],
        shipmentAddress: [{type: addressModel, required: true}],
        vatPercentage: {type: Number, required: true, min: 0, max: 100},
        creationDate: {type: Date, "default": Date.now, required: true},
        modificationDate: {type: Date, "default": Date.now, required: true}
    }, {collection: "orders"});

    module.exports = mongoose.model('Order', orderSchema);
}());