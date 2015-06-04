/*jslint node:true */


/** @module Routes for users */
/** @class */
var express = require('express');
var router = express.Router();

var controller = require('../app/controllers/account.js');

/** GET route for currently logged in user. */
router
    .get('/account', controller.detail);

/** POST route for registering a user. */
router
    .post('/account', controller.register);

/** POST route for signing out a user. */
router
    .post('/account/signout', controller.signout);

module.exports = router;