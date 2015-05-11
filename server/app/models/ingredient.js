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
        ingredientName: {type: String, required: true}
    }, {collection: "ingredienten"});


    modelName = 'Ingredient';
    module.exports = mongoose.model(modelName, schemaName);

}());
