/*jslint node:true */

(function () {
    "use strict";
    /**
    * Module dependencies.
    */
    
    
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        Cookie = mongoose.model('Cookie'),
        Box = mongoose.model('Box'),
        schemaName;
    
    schemaName = new Schema({
        orderRuleCookie: [{type: Cookie, required: true}],
        orderRuleNumberOf: { type: Number, required: true },
        orderRuleBox: [{ type: Box, required: true}]
    }, { collection: "orderRules" });

    module.exports = mongoose.model('OrderRule', schemaName);
}());