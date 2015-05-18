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
    }, {collection: "layerTypes"});

    modelName = 'LayerType';
    mongoose.model(modelName, schemaName);

}());