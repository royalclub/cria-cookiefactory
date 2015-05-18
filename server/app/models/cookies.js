/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
       // shapeSchema = require('Shape'),
        schemaName,
        modelName;

    schemaName = new Schema({
        cookieName: {type: String, required: true},
        cookieShape: [{ type: Schema.Types.ObjectId, ref: 'Shape' }],
        cookieLayers: {type: String},
        cookieCreator: {type: String, required: true},
        creationDate: {type: Date, "default": Date.now},
        modificationDate: {type: Date, "default": Date.now}
    }, {collection: "cookies"});


    modelName = 'Cookie';
    module.exports = mongoose.model(modelName, schemaName);

}());
