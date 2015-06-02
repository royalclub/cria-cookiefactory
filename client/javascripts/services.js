/*global angular */

(function () {
    "use strict";
    angular.module('cookieFactory.services', ['ngResource'])
        .factory('dbService', ['$resource', '$http',
            function ($resource) {
                var actions = {
                        'get': {method: 'GET'},
                        'save': {method: 'POST'},
                        'query': {method: 'GET', isArray: true},
                        'update': {method: 'PUT'},
                        'delete': {method: 'DELETE'}
                    },
                    accountActions = {
                        'get': {method: 'GET'},
                        'signout': {method: 'POST'}
                    },
                    db = {};

                db.cookies = $resource('/api/cookies/:_id', {}, actions);
                db.users = $resource('/api/users/:_id', {}, actions);
                db.users = $resource('/api/layers/:_id', {}, actions);
                db.users = $resource('/api/orders/:_id', {}, actions);
                db.account = $resource('/api/account', {}, accountActions);
                return db;
            }])
        .factory('cookiesService', ['dbService',
            function (dbService) {
                return dbService;
            }])
        .factory('usersService', ['dbService',
            function (dbService) {
                return dbService;
            }])
        .factory('layersService', ['dbService',
            function (dbService) {
                return dbService;
            }])
        .factory('ordersService', ['dbService',
            function (dbService) {
                return dbService;
            }])
        .factory('accountService', ['$resource', '$http',
            function ($resource) {
                var actions = {
                        'get': {method: 'GET'},
                        'signout': {method: 'POST'}
                    },
                    data = {};
                // REST url to server
                data.users = $resource('/api/account', {}, actions);
                data.loggedIn = false;
                data.loggedInUser = null;
                return data;
            }])
        .factory('authenticationService', ['accountService',
            function (accountService) {
                var data = {
                        isLoggedIn: function (callback) {
                            accountService.users.get({}, function (user) {
                                accountService.loggedIn = user.loggedIn;
                                accountService.loggedInUser = user.doc;
                                return callback(user.loggedIn, user.doc);
                            });
                        },
                        loggedInUser: null
                    };                
                return data;
            }]);
}());