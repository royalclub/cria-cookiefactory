/*jslint node:true */

(function () {
    "use strict";

    var mongoose = require('mongoose'),
        orderUserSchema;

    orderUserSchema = new mongoose.Schema({
        username: {type: String, required: true, minlength: 4, maxlength: 3},
        emailAddress: {type: String, required: true, match: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i},
        firstName: {type: String, required: true, minlength: 2, maxlength: 50},
        inserts: {type: String},
        lastName: {type: String, required: true, minlength: 2, maxlength: 50}
    });

    module.exports = {
        schema: orderUserSchema,
        model: mongoose.model('OrderUser', orderUserSchema)
    };
}());