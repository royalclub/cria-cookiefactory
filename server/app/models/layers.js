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
        layerType: {type: Schema.ObjectId, ref: 'LayerType'},
        layerIngredients: [{type: Schema.ObjectId, ref: 'Ingredient' }],
        layerOrder: {type: Number, required: true},
        layerDescription: {type: String},
        layerPrice: {type: Number, required: true},
        layerImageSrc: {type: String, required: true},
        layerCreationDate: {type: Date, "default": Date.now},
        layerModificationDate: {type: Date, "default": Date.now}
    }, {collection: "layers"});

    modelName = 'Layer';
    module.exports = mongoose.model(modelName, schemaName);

}());