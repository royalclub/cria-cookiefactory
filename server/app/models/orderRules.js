/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        cookieModel = require('./cookies.js'),
        boxModel = require('./box.js'),
        orderRuleSchema;

    orderRuleSchema = new mongoose.Schema({
        cookie: [{type: cookieModel, required: true}],
        box: [{ type: boxModel, required: true}],
        amountOfBoxes: { type: Number, required: true }
    });

    module.exports = mongoose.model('OrderRule', orderRuleSchema);
}());