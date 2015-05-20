/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        orderUserSchema;

    orderUserSchema = new mongoose.Schema({
        username: {type: String, required: true},
		firstName: {type: String, required: true},
        inserts: {type: String},
		lastName: {type: String, required: true}
    });

    module.exports = mongoose.model('OrderUser', orderUserSchema);
}());