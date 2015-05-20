/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        boxSchema;

    boxSchema = new mongoose.Schema({
        boxName: {type: String, required: true},
        boxDescription: {type: String, required: true },
        boxCapacity: {type: Number, required: true},
        boxImageSrc: {type: String, required: true},
        boxCreationDate: {type: Date, "default": Date.now},
        boxModificationDate: {type: Date, "default": Date.now}
    }, {collection: "boxes"});

    module.exports = mongoose.model('Box', boxSchema);
}());