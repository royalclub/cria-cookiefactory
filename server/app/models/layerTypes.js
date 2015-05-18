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
        layerTypeName: {type: String, required: true},
        layerTypeCreationDate: {type: Date, "default": Date.now},
        layerTypeModificationDate: {type: Date, "default": Date.now}
    }, {collection: "layerTypes"});

    modelName = 'LayerType';
    mongoose.model(modelName, schemaName);

}());