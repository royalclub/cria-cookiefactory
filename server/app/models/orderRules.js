/*jslint node:true */

(function () {
    "use strict";
    /**
    * Module dependencies.
    */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        cookie = require('cookie.js'),
        pkg = mongoose.model('Package'),
        schemaName;

    schemaName = new Schema({
        orderRuleCookie: { type: cookie, required: true },
        orderRuleNumberOf: { type: Number, required: true },
        orderRulePackage: { type: pkg, required: true }
    }, { collection: "orderRules" });

    module.exports = mongoose.model('OrderRule', schemaName);
    
}());