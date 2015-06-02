/*global angular, cookieController, userController, layerController, testController, accountController, accountDetailController, accountEditController, accountRegisterController, accountLogoutController, homeController, layerListController, addressController */

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
            templateUrl: 'partials/home.html',
            controller: homeController,
        });

        // About
        $routeProvider.when('/about', {
            templateUrl: 'partials/about.html'
        });

        // Contact
        $routeProvider.when('/contact', {
            templateUrl: 'partials/contact.html'
        });

        // Cart
        $routeProvider.when('/cart', {
            templateUrl: 'partials/cart/list.html'
        });

        // Account Details
        $routeProvider.when('/account', {
            templateUrl: 'partials/account/details.html',
            controller: accountDetailController
        });

        // Account Edit
        $routeProvider.when('/account/edit', {
            templateUrl: 'partials/account/edit.html',
            controller: accountEditController
        });

        // Account signout
        $routeProvider.when('/account/register', {
            templateUrl: 'partials/account/register.html',
            controller: accountRegisterController
        });

        // Account signout
        $routeProvider.when('/account/logout', {
            templateUrl: 'partials/account/logout.html',
            controller: accountLogoutController
        });

        // Account EditAddress
        $routeProvider.when('/account/address/edit/:_id', {
            templateUrl: 'partials/account/address/edit.html',
            controller: addressController
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
            controller: testController
        });

        // Get a list of users
        $routeProvider.when('/users/list', {
            templateUrl: 'partials/users/list.html',
            controller: userController
        });

        // Get 1 user
        $routeProvider.when('/users/list/:_id', {
            templateUrl: 'partials/user-detail.html',
            controller: userController
        });

        // Get a list of layers
        $routeProvider.when('/layers', {
            templateUrl: 'partials/layers/list.html',
            controller: layerListController
        });

        // Get a list of layers
        $routeProvider.when('/layer/:_id', {
            templateUrl: 'partials/layers/detail.html',
            controller: layerController
        });

        // Get a list of orders
        $routeProvider.when('/orders/list', {
            templateUrl: 'partials/orders/list.html',
//            controller: OrderListCtrl
        });

        //When no valid route is provided
        $routeProvider.otherwise({
            redirectTo: "/"
        });
    }]);