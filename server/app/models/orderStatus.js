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
        orderStatusName: {type: String, required: true},
		orderStatusDescription: {type: String, required: true},
        orderStatusCreationDate: {type: Date, "default": Date.now},
        orderStatusModificationDate: {type: Date, "default": Date.now}
    }, {collection: "orderStatus"});

    modelName = 'OrderStatus';
    module.exports = mongoose.model(modelName, schemaName);

}());