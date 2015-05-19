/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        Address = mongoose.model('Address'),
        //OrderStatus = mongoose.model('OrderStatus'),
        OrderRule = mongoose.model('OrderRule'),
        orderSchema,
        modelName;

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

    modelName = 'Order';
    module.exports = mongoose.model("Order", orderSchema);

}());