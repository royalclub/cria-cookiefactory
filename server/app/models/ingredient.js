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
        ingredientName: {type: String, required: true},
        ingredientPrice: {type: Number},
        protean: {type: Boolean}
    }, {collection: "ingredients"});


    modelName = 'Ingredient';
    mongoose.model(modelName, schemaName);

}());
