/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        schema;

    schema = new mongoose.Schema({
        packageName: {type: String, required: true},
        packageDescription: {type: String, required: true},
        packageCapacity: {type: Number, required: true},
        packageImageSrc: {type: String, required: true},
        packageCreationDate: {type: Date, "default": Date.now},
        packageModificationDate: {type: Date, "default": Date.now}
    }, {collection: "packages"});

    module.exports = mongoose.model('Package', schema);
}());