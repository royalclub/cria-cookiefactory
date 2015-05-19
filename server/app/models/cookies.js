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
        cookieShape: {type: Schema.ObjectId, ref: 'Shape' },
        cookieLayers: {type: Schema.ObjectId, ref: 'Layer'},
        cookieCreator: {type: String, required: true},
        cookieCreationDate: {type: Date, "default": Date.now},
        cookieModificationDate: {type: Date, "default": Date.now}
    }, {collection: "cookies"});

    modelName = 'Cookie';
    module.exports = mongoose.model(modelName, schemaName);

}());
