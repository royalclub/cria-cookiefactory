/*jslint node:true */

(function () {
    "use strict";
    /**
    * Module dependencies.
    */
   // var Cookie = require('cookie');

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        //cookie = mongoose.model('Cookie'),
        //pkg = mongoose.model('Package'),
        schemaName;

    schemaName = new Schema({
       // orderRuleCookie: { type: Cookie, required: true },
        orderRuleNumberOf: { type: Number, required: true }
        //orderRulePackage: { type: pkg, required: true }
    }, { collection: "orderRules" });

    module.exports = mongoose.model('OrderRule', schemaName);
}());