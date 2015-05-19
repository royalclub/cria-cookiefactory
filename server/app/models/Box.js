/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        packageSchema,
        modelName;

    packageSchema = new mongoose.Schema({
        boxName: {type: String, required: true},
        boxDescription: {type: String, required: true },
        boxCapacity: {type: Number, required: true},
        boxImageSrc: {type: String, required: true},
        boxCreationDate: {type: Date, "default": Date.now},
        boxModificationDate: {type: Date, "default": Date.now}
    }, {collection: "boxes"});

    modelName = 'Box';
    module.exports = mongoose.model( 'Box', packageSchema );
    
}());
