/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        ingredientSchema = mongoose.model('Ingredient'),
        schemaName;

    schemaName = new Schema({
        layerName: {type: String, required: true},
        layerIngredients: [ingredientSchema.schema]
    }, {collection: "layers"});

    module.exports = mongoose.model('Layer', schemaName);

}());