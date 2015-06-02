/*jslint node:true */


/** @module Routes for users */
/** @class */
var express = require('express');
var router = express.Router();

var controller = require('../app/controllers/account.js');

/** CREATE route for users */
router
    .get('/account', controller.detail);

module.exports = router;