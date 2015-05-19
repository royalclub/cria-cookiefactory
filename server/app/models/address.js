/*jslint node:true */

/**
 * Model for Addresses
 */
(function () {
    "use strict";

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        addressSchema;

    addressSchema = new Schema({
        street: { type: String, required: true },
        streetNumber: { type: String, required: true },
        zipcode: { type: String, required: true, match: /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i },
        city: { type: String, required: true }
    });

    module.exports = mongoose.model('Address', addressSchema);
}());