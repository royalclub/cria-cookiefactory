/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        schemaName;

    schemaName = new Schema({
        shapeName: {type: String, required: true},
        shapePrice: {type: Number, requiered: true}
    }, {collection: "shapes"});

    module.exports = mongoose.model('Shape', schemaName);

}());