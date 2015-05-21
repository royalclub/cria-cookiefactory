/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        orderStatusSchema;

    orderStatusSchema = new mongoose.Schema({
        name: {type: String, required: true, minlength: 3, maxlength: 20},
        description: {type: String, maxlength: 512},
        creationDate: {type: Date, "default": Date.now, required: true},
        modificationDate: {type: Date, "default": Date.now, required: true}
    });

    module.exports = {
        schema: orderStatusSchema,
        model: mongoose.model('OrderStatus', orderStatusSchema)
    };
}());