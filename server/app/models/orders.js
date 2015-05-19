/*jslint node:true */

/**
 * Model for Orders.
 */
(function () {
    "use strict";
    var mongoose = require('mongoose'),
        addressModel = mongoose.model('Address'),
        orderStatusModel = mongoose.model('OrderStatus'),
        orderRuleModel = mongoose.model('OrderRule'),
        schema;

    schema = new mongoose.Schema({
        orderNumber: {type: String, required: true},
        orderStatus: {type: orderStatusModel},
        orderUsername: {type: String},
        orderRules: [{type: orderRuleModel}],
        orderInvoiceAddress: {type: addressModel, required: true},
        orderShipmentAddress: {type: addressModel, required: true},
        orderVat: {type: Number, required: true},
        orderTotal: {type: Number, required: true},
        orderCreationDate: {type: Date, "default": Date.now},
        orderModificationDate: {type: Date, "default": Date.now}
    }, {collection: "orders"});

    module.exports = mongoose.model('Order', schema);
}());