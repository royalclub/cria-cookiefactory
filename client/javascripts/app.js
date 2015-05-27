/*global angular, CookieListCtrl, CookieDetailCtrl, CookieDetailCtrl, UserListCtrl */


/**
 *
 * Writing AngularJS Documentation
 *
 * @see https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
 * @see http://docs.angularjs.org/guide/concepts
 */
var cookieFactory = angular.module('cookieFactory', ['cookieFactory.services', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        "use strict";

        // Home
        $routeProvider.when('/', {
            templateUrl: 'partials/home.html'
        });
        
        // About
        $routeProvider.when('/about', {
            templateUrl: 'partials/about.html'
        });
        
        // Contact
        $routeProvider.when('/contact', {
            templateUrl: 'partials/contact.html'
        });

        // Get all cookies
        $routeProvider.when('/cookies/list', {
            templateUrl: 'partials/cookies/list.html',
            controller: cookieController
        });

        // Get 1 cookie
        $routeProvider.when('/cookies/detail/:_id', {
            templateUrl: 'partials/cookies/detail.html',
            controller: cookieController
        });
        
        // Design cookie
        $routeProvider.when('/cookies/design', {
            templateUrl: 'partials/cookies/design.html',
            controller: cookieController
        });
        
        // Get 1 cookie
        $routeProvider.when('/users/list', {
            templateUrl: 'partials/users/list.html',
            controller: userController
        });

        //When no valid route is provided
        $routeProvider.otherwise({
            redirectTo: "/"
        });

    }]);
