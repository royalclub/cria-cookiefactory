/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        boxSchema;

    boxSchema = new mongoose.Schema({
        name: {type: String, required: true},
        description: {type: String, required: true },
        capacity: {type: Number, required: true},
        imageSrc: {type: String, required: true},
        creationDate: {type: Date, "default": Date.now},
        modificationDate: {type: Date, "default": Date.now}
    });

    module.exports = {
        schema: boxSchema,
        model: mongoose.model('Box', boxSchema)
    };
}());