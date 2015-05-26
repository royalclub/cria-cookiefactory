/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        address = require('./address.js'),
        userSchema;

    userSchema = new mongoose.Schema({
        username: {type: String, required: true, minlength: 4, maxlength: 30, unique: true},
        salt: {type: String, required: true, minlength: 12, maxlength: 12},
        password: {type: String, required: true},
        firstName: {type: String, required: true, minlength: 2, maxlength: 50},
        inserts: {type: String, maxlength: 10},
        lastName: {type: String, required: true, minlength: 2, maxlength: 50},
        dateOfBirth: {type: Date},
        emailAddress: {type: String, required: true, match: /^[\-a-z0-9~!$%\^&*_=+}{\'?]+(\.[\-a-z0-9~!$%\^&*_=+}{\'?]+)*@([a-z0-9_][\-a-z0-9_]*(\.[\-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i, unique: true},
        addresses: [address.schema],
        creationDate: {type: Date, "default": Date.now, required: true},
        modificationDate: {type: Date, "default": Date.now, required: true}
    }, {collection: "users"});

    module.exports = {
        schema: userSchema,
        model: mongoose.model('User', userSchema)
    };
}());