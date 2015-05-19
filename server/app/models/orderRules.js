/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        cookie = mongoose.model('Cookie'),
        pkg = mongoose.model('Package'),
        schemaName,
        modelName;

    schemaName = new Schema({
        orderRuleCookie: {type: cookie, required: true},
		orderRuleNumberOf: {type: Number, required: true},
        orderRulePackage: {type: pkg, required: true}
    }, {collection: "orderRules"});

    modelName = 'OrderRule';
    module.exports = mongoose.model(modelName, schemaName);

}());