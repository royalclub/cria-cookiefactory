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
        shapeName: {type: String, required: true},
        shapeImageSrc: {type: String, required: true}
    }, {collection: "shapes"});

    modelName = 'Shape';
    module.exports = mongoose.model(modelName, schemaName);


}());