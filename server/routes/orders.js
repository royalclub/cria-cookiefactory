/*jslint node:true */


/** @module Routes for books */
/** @class */
var express = require('express');
var router = express.Router();

/**  book routes
 ---------------
 We create a variable "user" that holds the controller object.
 We map the URL to a method in the created variable "controller".
 In this example is a mapping for every CRUD action.
 */
var controller = require('../app/controllers/orders.js');

/** CREATE route for orders */
router
    .post('/orders', controller.create);

// RETRIEVE
router
    .get('/orders', controller.list)
    .get('/orders/:_id', controller.detail);

// UPDATE
router
    .put('/orders/:_id', controller.updateOne);

// DELETE
router
    .delete('/orders/:_id', controller.deleteOne);


module.exports = router;