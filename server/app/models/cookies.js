/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
<<<<<<< HEAD
        Schema = mongoose.Schema,
        //shapeSchema = mongoose.Model("Shape"),
        schemaName;

    schemaName = new Schema({
        cookieName: {type: String, required: true},
        cookieShape: [{ type: Schema.Types.ObjectId, ref: 'Shape' }],
        cookieLayers: {type: String},
        cookieCreator: {type: String, required: true},
=======
        layer = require('./layers.js'),
        cookieSchema;

    cookieSchema = new mongoose.Schema({
        name: {type: String, required: true},
        creator: {type: String, required: true},
        layers: [layer.schema],
<<<<<<< HEAD
>>>>>>> production
        creationDate: {type: Date, "default": Date.now},
        modificationDate: {type: Date, "default": Date.now}
=======
        creationDate: {type: Date, "default": Date.now, required: true},
        modificationDate: {type: Date, "default": Date.now, required: true}
>>>>>>> production
    }, {collection: "cookies"});

    module.exports = {
        schema: cookieSchema,
        model: mongoose.model('Cookie', cookieSchema)
    };
}());
