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
        ingredientName: {type: String, required: true},
        ingredientPrice: {type: Number},
        protean: {type: Boolean}
    }, {collection: "ingredients"});

    module.exports = mongoose.model('Ingredient', schemaName);

}());
