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
        layerName: {type: String, required: true},
        layerIngredients: {type: String, required: true}
    }, {collection: "layers"});


    modelName = 'Layer';
    mongoose.model(modelName, schemaName);

}());