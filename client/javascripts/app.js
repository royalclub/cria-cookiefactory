/*global angular, CookieListCtrl, CookieDetailCtrl */


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

        // Get all cookies
        $routeProvider.when('/', {
            templateUrl: 'partials/home.html'
        });

        // Get all cookies
        $routeProvider.when('/cookies/list', {
            templateUrl: 'partials/cookie-list.html',
            controller: CookieListCtrl
        });

        // Get 1 cookie
        $routeProvider.when('/cookies/list/:_id', {
            templateUrl: 'partials/cookie-detail.html',
            controller: CookieDetailCtrl
        });
        
        // Get 1 cookie
        $routeProvider.when('/users/list', {
            templateUrl: 'partials/user-list.html',
            controller: UserListCtrl
        });

        //When no valid route is provided
        $routeProvider.otherwise({
            redirectTo: "/"
        });

    }]);
