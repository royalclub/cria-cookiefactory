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
        cookieName: {type: String, required: true},
        cookieLayers: {type: String},
        modificationDate: {type: Date, "default": Date.now}
    }, {collection: "cookies"});


    modelName = 'Cookie';
    mongoose.model(modelName, schemaName);

}());