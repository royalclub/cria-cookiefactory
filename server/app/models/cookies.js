/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        layerModel = require('./layers.js'),
        cookieSchema;

    cookieSchema = new mongoose.Schema({
        name: {type: String, required: true},
        creator: {type: String, required: true},
        layers: [{type: layerModel, required: true}],
        creationDate: {type: Date, "default": Date.now},
        modificationDate: {type: Date, "default": Date.now}
    }, {collection: "cookies"});

    module.exports = mongoose.model('Cookie', cookieSchema);
}());
