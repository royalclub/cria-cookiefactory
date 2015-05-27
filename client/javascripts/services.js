/*global angular */

(function () {
    "use strict";



     angular.module('cookieFactory.services', ['ngResource']).factory('usersService', ['$resource', '$http',
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
        }]);


    angular.module('cookieFactory.services', ['ngResource']).factory('cookiesService', ['$resource', '$http',
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
        }]);

}());

