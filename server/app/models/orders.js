/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        //address = mongoose.model('Address'),
        //orderStatus = mongoose.model('orderStatus'),
        //orderRule = mongoose.model('orderRule'),
        schemaName,
        modelName;

    schemaName = new Schema({
        orderNumber: {type: String, required: true},
       // orderStatus: {type: orderStatus},
        orderUsername: {type: String},
        //orderRules: [{type: orderRule}],
        //orderInvoiceAddress: {type: address, required: true},
        //orderShipmentAddress: {type: address, required: true},
        orderVat: {type: Number, required: true},
        orderTotal: {type: Number, required: true},
        orderCreationDate: {type: Date, "default": Date.now},
        orderModificationDate: {type: Date, "default": Date.now}
    }, {collection: "orders"});

    modelName = 'Order';
    module.exports = mongoose.model(modelName, schemaName);

}());