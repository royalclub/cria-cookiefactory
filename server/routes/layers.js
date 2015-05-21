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
    .get('/layers/:_id', controller.detail);

// UPDATE
router
    .put('/layers/:_id', controller.updateOne);

// DELETE
router
    .delete('/layers/:_id', controller.deleteOne);


module.exports = router;