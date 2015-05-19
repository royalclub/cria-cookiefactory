/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        schemaName,
        modelName;

    schemaName = new Schema({
        orderRuleCookie: {type: Schema.ObjectId, ref: "Cookie"},
		orderRuleNumberOf: {type: Number, required: true},
        orderRulePackage: {type: Schema.ObjectId, ref: "Package"}
    }, {collection: "orderRules"});

    modelName = 'OrderRule';
    module.exports = mongoose.model(modelName, schemaName);

}());