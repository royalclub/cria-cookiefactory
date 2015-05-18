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
var controller = require('../app/controllers/ingredients.js');

/** CREATE route for books */
router
    .post('/ingredients', controller.create);

// RETRIEVE
router
    .get('/ingredients', controller.list)
    .get('/ingredients/:_id', controller.detail);

// UPDATE
router
    .put('/ingredients/:_id', controller.updateOne);

// DELETE
router
    .delete('/ingredients/:_id', controller.deleteOne);


module.exports = router;