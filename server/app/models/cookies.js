/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        cookieSchema;

    cookieSchema = new mongoose.Schema({
        cookieName: {type: String, required: true},
        cookieShape: {type: Schema.ObjectId, ref: 'Shape' },
        cookieLayers: [{type: Schema.ObjectId, ref: 'Layer'}],
        cookieCreator: {type: String, required: true},
        cookieCreationDate: {type: Date, "default": Date.now},
        cookieModificationDate: {type: Date, "default": Date.now}
    }, {collection: "cookies"});

    module.exports = mongoose.model('Cookie', cookieSchema);
}());
