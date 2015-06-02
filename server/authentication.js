/*jslint node: true */

(function () {
    "use strict";

    var
        passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        User = require('./app/models/users.js').model;

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    module.exports = new LocalStrategy(
        function (username, password, done) {
            var saltConditions = {
                'username': username
            };
            User.findOne(saltConditions, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Gebruikersnaam niet gevonden.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Wachtwoord ongeldig.' });
                }
                return done(null, user);
            });
        }
    );
}());