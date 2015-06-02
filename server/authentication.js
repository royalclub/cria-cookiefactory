/*jslint node: true */

(function () {
    "use strict";

    var
        LocalStrategy = require('passport-local').Strategy,
        User = require('./app/models/users.js').model;

    /**
     * Custom strategy for passportjs. This method is responsible for handling user logins.
     * @param 
     */
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