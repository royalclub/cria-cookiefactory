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
        ingredientPrice: {type: Number, required: true},
        ingredientDescription: {type: String},
        modificationDate: {type: Date, "default": Date.now}
    },
        {collection: 'ingredients'});
    
    modelName = 'Ingredient';
    mongoose.model(modelName, schemaName);
    
}());
