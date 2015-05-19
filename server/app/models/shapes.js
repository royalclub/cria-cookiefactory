/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        schemaName;

    schemaName = new Schema({
        shapeName: {type: String, required: true},
        shapeImageSrc: {type: String, required: true},
        shapeCreationDate: {type: Date, "default": Date.now},
        shapeModificationDate: {type: Date, "default": Date.now}
    }, {collection: "shapes"});

    module.exports = mongoose.model('Shape', schemaName);

}());