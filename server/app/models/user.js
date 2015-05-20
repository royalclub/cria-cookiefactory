/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        addressModel = require('./address.js'),
        userSchema;

    userSchema = new mongoose.Schema({
        username: {type: String, required: true, minlength: 4, maxlength: 30},
        salt: {type: String, required: true, minlength: 12, maxlength: 12},
        password: {type: String, required: true},
        firstname: {type: String, required: true, minlength: 2, maxlength: 50},
        tussenvoegsels: {type: String, maxlength: 10},
        lastname: {type: String, required: true, minlength: 2, maxlength: 50},
        dateOfBirth: {type: Date},
        emailAddress: {type: String, required: true},
        addresses: [{type: addressModel, required: true}],
        creationDate: {type: Date, "default": Date.now, required: true},
        modificationDate: {type: Date, "default": Date.now, required: true}
    }, {collection: "users"});

    module.exports = mongoose.model('User', userSchema);
}());