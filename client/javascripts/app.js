/*global angular, cookieController, userController, layerController, testController, accountController, accountDetailController, accountEditController, accountRegisterController, accountLogoutController, homeController, addressController, orderController */
/*global angular, cookieController, userController, layerController, cookieDesignController, accountController, homeController, addressController, accountDetailController, accountEditController, accountLogoutController, orderController */

/**
 *
 * Writing AngularJS Documentation
 *
 * @see https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
 * @see http://docs.angularjs.org/guide/concepts
 */

var cookieFactory = angular.module('cookieFactory', ['cookieFactory.services', 'ngRoute', 'ngCookies'])
    .config(['$routeProvider', function ($routeProvider) {
        "use strict";

        // Home
        $routeProvider.when('/', {
            controller: homeController
        });

        // About
        $routeProvider.when('/about', {
            templateUrl: 'partials/about.html',
            label: 'Over ons'
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

        // Account register
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

        $routeProvider.when('/cookies/list', {
            templateUrl: 'partials/cookies/list.html'
        });

        // Get 1 cookie
        $routeProvider.when('/cookies/detail/:_id', {
            templateUrl: 'partials/cookies/detail.html',
            controller: cookieController
        });

        // Design cookie
        $routeProvider.when('/cookies/design', {
            templateUrl: 'partials/cookies/design.html'
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
        $routeProvider.when('/layer/:_id', {
            templateUrl: 'partials/layers/detail.html',
            controller: layerController
        });

        // Get orderConfirmation
        $routeProvider.when('/orders/confirmation/', {
            templateUrl: 'partials/orders/orderConfirmation.html',
            controller: orderController
        });
        // Get orderDetails
        $routeProvider.when('/orders/details/', {
            templateUrl: 'partials/orders/orderDetails.html',
            controller: orderController
        });
        // Get orderPayment
        $routeProvider.when('/orders/payment/', {
            templateUrl: 'partials/orders/orderPayment.html',
            controller: orderController
        });

        //When no valid route is provided
        $routeProvider.otherwise({
            redirectTo: "/"
        });
    }]);
