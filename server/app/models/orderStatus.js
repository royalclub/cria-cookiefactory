/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        orderStatusSchema;

    orderStatusSchema = new Schema({
        statusName: {type: String, required: true},
        statusDescription: {type: String, required: true},
        statusCreationDate: {type: Date, "default": Date.now},
        statusModificationDate: {type: Date, "default": Date.now}
    }, {collection: "orderStates"});

    module.exports = mongoose.model('OrderStatus', orderStatusSchema);


}());