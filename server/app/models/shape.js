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
        shapeImageSrc: {type: String, requiered: true},
    }, {collection: "shapes"});

    modelName = 'Shape';
    mongoose.model(modelName, schemaName);

}());