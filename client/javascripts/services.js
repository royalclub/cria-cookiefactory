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
                        'register': {method: 'POST'}
                    },
                    signOutAction = {
                        'signout': {method: 'POST'}
                    },
                    db = {};

                db.cookies = $resource('/api/cookies/:_id', {}, actions);
                db.users = $resource('/api/users/:_id', {}, actions);
                db.layers = $resource('/api/layers/:_id', {}, actions);
                db.orders = $resource('/api/orders/:_id', {}, actions);
                db.account = $resource('/api/account', {}, accountActions);
                db.signout = $resource('/api/account/signout', {}, signOutAction);
                return db;
            }])
        .factory('cookiesService', ['dbService',
            function (dbService) {
                return dbService;
            }])
        .factory('orderService', ['dbService',
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
                return data;
            }])
        .factory('authenticationService', ['dbService',
            function (dbService) {
                return {
                    getUser: function (callback) {
                        dbService.account.get(function (result) {
                            callback(result.loggedIn, result.doc);
                        });
                    }
                };
            }])
        .factory('locationService',
            function () {
                var location = {};
                location.latestLocation = '';
                return location;
            })
        .factory('messageService',
            function () {
                var message = {}, i;
                message.list = [];
                message.callbacks = [];

                message.setMessage = function (textMessage, typeMessage) {
                    message.list.push({
                        text : textMessage,
                        'type' : typeMessage
                    });

                    for (i = 0; i < message.callbacks.length; i += 1) {
                        message.callbacks[i](textMessage, typeMessage);
                    }
                };

                message.registerCallback = function (callback) {
                    var e;
                    message.callbacks.push(callback);

                    for (e = 0; e < message.list.length; e += 1) {
                        for (i = 0; i < message.callbacks.length; i += 1) {
                            message.callbacks[i](message.list[e].text, message.list[e].type);
                        }
                    }
                };
                return message;
            });
}());