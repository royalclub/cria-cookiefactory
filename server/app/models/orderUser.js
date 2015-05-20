/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        orderUserSchema;

    orderUserSchema = new mongoose.Schema({
        username: {type: String, required: true},
		firstname: {type: String, required: true},
		tussenvoegsels: {type: String},
		lastname: {type: String, required: true}
    });

    module.exports = mongoose.model('OrderUser', orderUserSchema);
}());