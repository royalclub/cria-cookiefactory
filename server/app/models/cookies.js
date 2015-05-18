/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        shapeSchema = require('Shape'),
        schemaName,
        modelName;

    schemaName = new Schema({
        cookieName: {type: String, required: true},
        cookieShape: {type: shapeSchema.schema},
        cookieLayers: {type: String},
        cookieCrearor: {type: String, required: true},
        creationDate {type: Date, "default": Date.now},
        modificationDate: {type: Date, "default": Date.now}
    }, {collection: "cookies"});


    modelName = 'Cookie';
    mongoose.model(modelName, schemaName);

}());