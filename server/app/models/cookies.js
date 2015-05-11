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
        cookieLayers: [Schema.layerName]
    }, {collection: "cookies"});


    modelName = 'Cookie';
    module.exports = mongoose.model(modelName, schemaName);

}());