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
var controller = require('../app/controllers/user.js');

/** CREATE route for books */
router
    .post('/user', controller.create);

// RETRIEVE
router
    .get('/user', controller.list)
    .get('/user/:username', controller.detail);

// UPDATE
router
    .put('/user/:username', controller.updateOne);

// DELETE
router
    .delete('/user/:username', controller.deleteOne);


module.exports = router;