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
        packageName: {type: String, required: true},
        packageDescription: {type: String, required: true},
        packageCapicity: {type: Number, required: true},
        packageImageSrc: {type: String, required: true},
        packageCreationDate: {type: Date, "default": Date.now},
        packageModificationDate: {type: Date, "default": Date.now}
    }, {collection: "packages"});

    modelName = 'Package';
    module.exports = mongoose.model(modelName, schemaName);

}());