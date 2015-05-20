/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        layerOptionModel = require('./layerOptions.js'),
        layerSchema;

    layerSchema = new mongoose.Schema({
        name: {type: String, required: true},
        required: {type: Boolean, required: true},
        options: [{type: layerOptionModel, required: true}],
        creationDate: {type: Date, "default": Date.now, required: true},
        modificationDate: {type: Date, "default": Date.now, required: true}
    }, {collection: 'layers'});

    module.exports = mongoose.model('Layer', layerSchema);
}());