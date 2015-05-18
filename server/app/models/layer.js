/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        //ingredientSchema = mongoose.model('Ingredient'),
        schemaName;

    schemaName = new Schema({
        layerName: {type: String, required: true},
        layerIngredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
        layerOrder: {type: Number, requiered: true},
        layerDescription: {type: String},
        layerPrice: {type: Number, requiered: true}
    }, {collection: "layers"});

    module.exports = mongoose.model('Layer', schemaName);

}());