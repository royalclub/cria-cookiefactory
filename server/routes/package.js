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
var controller = require('../app/controllers/package.js');

/** CREATE route for books */
router
    .post('/package', controller.create);

// RETRIEVE
router
    .get('/package', controller.list)
    .get('/package/:_id', controller.detail);

// UPDATE
router
    .put('/package/:_id', controller.updateOne);

// DELETE
router
    .delete('/package/:_id', controller.deleteOne);


module.exports = router;