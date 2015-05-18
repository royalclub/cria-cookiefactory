/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        ingredientSchema = require('Ingredient'),
        schemaName,
        modelName;

    schemaName = new Schema({
        layerName: {type: String, required: true},
        layerType: {type: String, required: true},
        layerIngredients: [ingredientSchema.schema],
        layerOrder: {type: Number, required: true},
        layerDescription: {type: String},
        layerPrice: {type: Number, required: true}
    }, {collection: "layers"});

    modelName = 'Layer';
    mongoose.model(modelName, schemaName);

}());