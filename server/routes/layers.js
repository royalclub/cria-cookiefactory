/*jslint node:true */


/** @module Routes for books */
/** @class */
var express = require('express'),
    controller = require('../app/controllers/layers.js'),
    router = express.Router();

// CREATE
router
    .post('/layers', controller.create);

// RETRIEVE
router
    .get('/layers', controller.list)
    .get('/layers/:_name', controller.detail);

// UPDATE
router
    .put('/layers/:_name', controller.updateOne);

// DELETE
router
    .delete('/layers/:_name', controller.deleteOne);


module.exports = router;