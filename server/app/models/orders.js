/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        Address = mongoose.model('Address'),
        //OrderStatus = mongoose.model('OrderStatus'),
        OrderRule = mongoose.model('OrderRule'),
        orderSchema;

    orderSchema = new Schema({
        orderNumber: {type: String, required: true},
        //orderStatus: [{type: OrderStatus}],
        orderUsername: {type: String},
        orderRules: [{type: OrderRule}],
        orderInvoiceAddress: [{type: Address, required: true}],
        orderShipmentAddress: [{type: Address, required: true}],
        orderVat: {type: Number, required: true},
        orderTotal: {type: Number, required: true},
        orderCreationDate: {type: Date, "default": Date.now},
        orderModificationDate: {type: Date, "default": Date.now}
    }, {collection: "orders"});

    module.exports = mongoose.model('Order', orderSchema);
}());