/*jslint node:true */


/** @module Routes for books */
/** @class */
var 
    express = require('express'),
    router = express.Router(),
    controller = require('../app/controllers/layers.js');

/** CREATE */
router
    .post('/layer', controller.create);

// RETRIEVE
router
    .get('/layer', controller.list)
    .get('/layer/:name', controller.detail);

// UPDATE
router
    .put('/layer/:name', controller.updateOne);

// DELETE
router
    .delete('/layer/:name', controller.deleteOne);


module.exports = router;