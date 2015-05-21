/*jslint node:true */

(function () {
    "use strict";
<<<<<<< HEAD:server/app/models/layer.js
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
=======

    var mongoose = require('mongoose'),
        layerOption = require('./layerOptions.js'),
        layerSchema;
>>>>>>> production:server/app/models/layers.js

    layerSchema = new mongoose.Schema({
        name: {type: String, required: true, unique: true},
        required: {type: Boolean, required: true},
        sequence: {type: Number, required: true},
        options: [layerOption.schema],
        creationDate: {type: Date, "default": Date.now, required: true},
        modificationDate: {type: Date, "default": Date.now, required: true}
    }, {collection: 'layers'});

    module.exports = {
        schema: layerSchema,
        model: mongoose.model('Layer', layerSchema)
    };
}());