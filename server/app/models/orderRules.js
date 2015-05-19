/*jslint node:true */

(function () {
    "use strict";
    /**
    * Module dependencies.
    */
    var Cookie = require('cookie');
    
    var mongoose = require('mongoose'),
        pkg = mongoose.model('Package'),
        schema;

    schema = new mongoose.Schema({
        orderRuleCookie: { type: Cookie.schema, required: true },
        orderRuleNumberOf: { type: Number, required: true },
        orderRulePackage: { type: pkg, required: true }
    });

    module.exports = mongoose.model('OrderRule', schema);
}());