/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        ingredientSchema = require('Ingredient'),
        layerTypeSchema = require('LayerType'),
        schemaName,
        modelName;

    schemaName = new Schema({
        layerName: {type: String, required: true},
        layerType: layerTypeSchema.schema,
        layerIngredients: [ingredientSchema.schema],
        layerOrder: {type: Number, required: true},
        layerDescription: {type: String},
        layerPrice: {type: Number, required: true},
        layerImageSrc: {type: String, required: true}
    }, {collection: "layers"});

    modelName = 'Layer';
    module.exports = mongoose.model(modelName, schemaName);

}());