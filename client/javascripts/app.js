/*global console, angular, cookieController, userController, testController, accountController, accountDetailController, accountEditController, accountRegisterController, accountLogoutController, homeController, addressController, orderController */

/**
 *
 * Writing AngularJS Documentation
 *
 * @see https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
 * @see http://docs.angularjs.org/guide/concepts
 */

var cookieFactory = angular.module('cookieFactory', ['cookieFactory.services', 'ngRoute', 'ng-breadcrumbs'])
    .config(function ($routeProvider) {
        "use strict";

        // Home
        $routeProvider.when('/', {
            templateUrl: 'partials/cookies/design.html',
            label: 'Cookie Factory'
        });

        // Design cookie
        $routeProvider.when('/cookies/design', {
            templateUrl: 'partials/about.html',
            controller: function ($location) {
                $location.path('/n');
                console.warn("Home: Redirect to cookie design.");
            }
        });

        // About
        $routeProvider.when('/about', {
            templateUrl: 'partials/about.html',
            label: 'about'
        });

        // Contact
        $routeProvider.when('/contact', {
            templateUrl: 'partials/contact.html',
            label: 'contact'
        });

        // Cart
        $routeProvider.when('/cart', {
            templateUrl: 'partials/cart/list.html',
            label: 'winkelwagen'
        });

        // Account Details
        $routeProvider.when('/account', {
            templateUrl: 'partials/account/details.html',
            controller: accountDetailController,
            label: 'account'
        });

        // Account Edit
        $routeProvider.when('/account/edit', {
            templateUrl: 'partials/account/edit.html',
            controller: accountEditController,
            label: 'account edit'
        });

        // Account add Address
        $routeProvider.when('/account/address/add', {
            templateUrl: 'partials/account/address/add.html',
            controller: addressController,
            label: 'add account'
        });

        // Account edit Address
        $routeProvider.when('/account/address/edit/:_id', {
            templateUrl: 'partials/account/address/edit.html',
            controller: addressController,
            label: 'edit address'
        });

        // Account register
        $routeProvider.when('/account/register', {
            templateUrl: 'partials/account/register.html',
            controller: accountRegisterController,
            label: 'register'
        });

        // a list of cookies
        $routeProvider.when('/cookies/list', {
            templateUrl: 'partials/cookies/list.html',
            label: 'koekjes lijst'
        });

        // Get orderDetails
        $routeProvider.when('/cart/orders/details', {
            templateUrl: 'partials/orders/orderDetails.html',
            controller: orderController,
            label: 'order details'
        });

        // Get orderPayment
        $routeProvider.when('/cart/orders/details/payment', {
            templateUrl: 'partials/orders/orderPayment.html',
            controller: orderController,
            label: 'betalen'
        });

        // Get orderConfirmation
        $routeProvider.when('/cart/orders/details/payment/confirmation', {
            templateUrl: 'partials/orders/orderConfirmation.html',
            controller: orderController,
            label: 'voltooid'
        });

        //When no valid route is provided
        $routeProvider.otherwise({
            redirectTo: "/"
        });
    });
