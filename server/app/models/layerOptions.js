/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        layerOptionSchema;

    layerOptionSchema = new mongoose.Schema({
        name: {type: String, required: true},
        sequence: {type: Number, required: true},
        description: {type: String},
        price: {type: Number, required: true},
        imageSrc: {type: String, required: true},
        creationDate: {type: Date, "default": Date.now, required: true},
        modificationDate: {type: Date, "default": Date.now, required: true}
    });

    module.exports = {
        schema: layerOptionSchema,
        model: mongoose.model('LayerOption', layerOptionSchema)
    };
}());