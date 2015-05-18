/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        shapeSchema = require('Shape'),
        schemaName,
        modelName;

    schemaName = new Schema({
        cookieName: {type: String, required: true},
<<<<<<< HEAD
        cookieShape: {type: shapeSchema.schema},
        cookieLayers: {type: String},
        cookieCrearor: {type: String, required: true},
        creationDate {type: Date, "default": Date.now},
        modificationDate: {type: Date, "default": Date.now}
    }, {collection: "cookies"});


    modelName = 'Cookie';
    mongoose.model(modelName, schemaName);

}());
=======
        cookieLayers: {type: String},
        modificationDate: {type: Date, "default": Date.now}
    },
            {collection: "cookies"});
    module.exports = mongoose.model('Cookie', schemaName);
}());
>>>>>>> d0ac018d9512e479b036676ce33f8151a038ceb4
