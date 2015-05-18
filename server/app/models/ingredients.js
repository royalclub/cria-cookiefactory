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
        ingredientName: {type: String, required: true, unique: true},
        ingredientDescription: {type: String},
        ingredientModificationDate: {type: Date, "default": Date.now}
    },
        {collection: 'ingredients'});

    modelName = 'Ingredient';
    module.exports = mongoose.model(modelName, schemaName);

}());
