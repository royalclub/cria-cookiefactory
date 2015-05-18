/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        ingredientSchema = mongoose.model('Ingredient'),
        shapeSchema = mongoose.model('Shape'),
        schemaName;

    schemaName = new Schema({
        layerName: {type: String, required: true},
        layerIngredients: [ingredientSchema.schema],
        layerOrder: {type: Number, requiered: true},
        layerDescription: {type: String},
        layerPrice: {type: Number, requiered: true}
    }, {collection: "layers"});

    module.exports = mongoose.model('Layer', schemaName);

}());