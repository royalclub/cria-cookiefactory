/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        layerOption = require('./layerOptions.js'),
        layerSchema;

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