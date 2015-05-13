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
        layerIngredients: [ingredientSchema.schema]
    }, {collection: "layers"});


    modelName = 'Layer';
    mongoose.model(modelName, schemaName);

}());