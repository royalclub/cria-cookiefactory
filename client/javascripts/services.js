/*global angular */

(function () {
    "use strict";
    angular.module('cookieFactory.services', ['ngResource'])
        .factory('cookiesService', ['$resource', '$http',
            function ($resource) {
                var actions = {
                        'get': {method: 'GET'},
                        'save': {method: 'POST'},
                        'query': {method: 'GET', isArray: true},
                        'update': {method: 'PUT'},
                        'delete': {method: 'DELETE'}
                    },
                    db = {};
                // REST url to server
                db.cookies = $resource('/api/cookies/:_id', {}, actions);
                return db;
            }])
        .factory('usersService', ['$resource', '$http',
            function ($resource) {
                var actions = {
                        'get': {method: 'GET'},
                        'save': {method: 'POST'},
                        'query': {method: 'GET', isArray: true},
                        'update': {method: 'PUT'},
                        'delete': {method: 'DELETE'}
                    },
                    db = {};
                // REST url to server
                db.users = $resource('/api/users/:_id', {}, actions);
                return db;
            }])
        .factory('layersService', ['$resource', '$http',
            function ($resource) {
                var actions = {
                        'get': {method: 'GET'},
                        'save': {method: 'POST'},
                        'query': {method: 'GET', isArray: true},
                        'update': {method: 'PUT'},
                        'delete': {method: 'DELETE'}
                    },
                    db = {};
                // REST url to server
                db.layers = $resource('/api/layers/:_id', {}, actions);
                return db;
            }])
        .factory('ordersService', ['$resource', '$http',
            function ($resource) {
                var actions = {
                        'get': {method: 'GET'},
                        'save': {method: 'POST'},
                        'query': {method: 'GET', isArray: true},
                        'update': {method: 'PUT'},
                        'delete': {method: 'DELETE'}
                    },
                    db = {};
                // REST url to server
                db.orders = $resource('/api/orders/:_id', {}, actions);
                return db;
            }]);


}());

