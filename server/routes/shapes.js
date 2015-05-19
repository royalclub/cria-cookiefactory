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
var controller = require('../app/controllers/shapes.js');

/** CREATE route for books */
router
    .post('/shapes', controller.create);

// RETRIEVE
router
    .get('/shapes', controller.list)
    .get('/shapes/:_id', controller.detail);

// UPDATE
router
    .put('/shapes/:_id', controller.updateOne);

// DELETE
router
    .delete('/shapes/:_id', controller.deleteOne);


module.exports = router;