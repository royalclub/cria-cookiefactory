/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        Cookie = mongoose.model('Cookie'),
        Box = mongoose.model('Box'),
        schema;

    schema = new mongoose.Schema({
        orderRuleCookie: [{type: Cookie, required: true}],
        orderRuleNumberOf: { type: Number, required: true },
        orderRuleBox: [{ type: Box, required: true}]
    }, { collection: "orderRules" });

    module.exports = mongoose.model('OrderRule', schema);
}());