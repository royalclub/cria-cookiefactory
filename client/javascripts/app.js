/*global angular, CookieListCtrl, CookieDetailCtrl */


/**
 *
 * Writing AngularJS Documentation
 *
 * @see https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
 * @see http://docs.angularjs.org/guide/concepts
 */
var myApp = angular.module('myApp', ['myApp.services', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        "use strict";


        // Get all cookies
        $routeProvider.when('/cookies', {
            templateUrl: 'partials/cookie-list.html',
            controller: CookieListCtrl
        });

        // Get 1 cookie
        $routeProvider.when('/cookies/:_id', {
            templateUrl: 'partials/cookie-detail.html',
            controller: CookieDetailCtrl
        });

        //When no valid route is provided
        $routeProvider.otherwise({
            redirectTo: "/cookies"
        });

    }]);
