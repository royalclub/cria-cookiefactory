/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        orderStatusSchema;

    orderStatusSchema = new mongoose.Schema({
        name: {type: String, required: true},
        description: {type: String, required: true},
        creationDate: {type: Date, "default": Date.now},
        modificationDate: {type: Date, "default": Date.now}
    });

    module.exports = mongoose.model('OrderStatus', orderStatusSchema);


}());