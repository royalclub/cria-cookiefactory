/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        layer = require('./layers.js'),
        cookieSchema;

    cookieSchema = new mongoose.Schema({
        name: {type: String, required: true},
        creator: {type: String, required: true},
        layers: [layer.schema],
        creationDate: {type: Date, "default": Date.now, required: true},
        modificationDate: {type: Date, "default": Date.now, required: true}
    }, {collection: "cookies"});

    module.exports = {
        schema: cookieSchema,
        model: mongoose.model('Cookie', cookieSchema)
    };
}());
