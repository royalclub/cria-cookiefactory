/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        cookie = require('./cookies.js'),
        box = require('./box.js'),
        orderRuleSchema;

    orderRuleSchema = new mongoose.Schema({
        cookie: [cookie.schema],
        box: [box.schema],
        amountOfBoxes: { type: Number, required: true }
    });

    module.exports = {
        schema: orderRuleSchema,
        model: mongoose.model('OrderRule', orderRuleSchema)
    };
}());