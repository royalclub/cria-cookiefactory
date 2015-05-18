/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        schemaName,
        modelName;

    schemaName = new Schema({
        orderNumber: {type: String, required: true},
        orderStatus: {type: Schema.ObjectId, ref: "OrderStatus"},
        orderUsername: {type: String},
        orderRules: [{type: Schema.ObjectId, ref: "OrderRule"}],
        orderInvoiceAddress: {type: Schema.ObjectId, ref: "Address"},
        orderShipmentAddress: {type: Schema.ObjectId, ref: "Address"},
        orderVat: {type: Number, required: true},
        orderTotal: {type: Number, required: true},
        orderCreationDate: {type: Date, "default": Date.now},
        orderModificationDate: {type: Date, "default": Date.now}
    }, {collection: "orders"});

    modelName = 'Order';
    module.exports = mongoose.model(modelName, schemaName);

}());