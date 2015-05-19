/*jslint node:true */

(function () {
    "use strict";
    /**
    * Module dependencies.
    */
    var mongoose = require('mongoose'),
        cookie = mongoose.model('Cookie'),
        pkg = mongoose.model('Package'),
        schema;

    schema = new mongoose.Schema({
        orderRuleCookie: { type: cookie.schema, required: true },
        orderRuleNumberOf: { type: Number, required: true },
        orderRulePackage: { type: pkg, required: true }
    });

    module.exports = mongoose.model('OrderRule', schema);
}());