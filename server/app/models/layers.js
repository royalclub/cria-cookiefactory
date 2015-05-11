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
        layerName: {type: String, required: true}
    }, {collection: "layers"});


    modelName = 'Layer';
    module.exports = mongoose.model(modelName, schemaName);

}());