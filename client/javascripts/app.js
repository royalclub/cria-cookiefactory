/*global angular, cookieController, userController, testController, accountController, accountDetailController, accountEditController, accountRegisterController, accountLogoutController, homeController, addressController, orderController */
/*global angular, cookieController, userController, cookieDesignController, accountController, homeController, addressController, accountDetailController, accountEditController, accountLogoutController, orderController */

/**
 *
 * Writing AngularJS Documentation
 *
 * @see https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
 * @see http://docs.angularjs.org/guide/concepts
 */

var cookieFactory = angular.module('cookieFactory', ['cookieFactory.services', 'ngRoute', 'ui.router', 'ncy-angular-breadcrumb'])
    .config(function ($routeProvider, $stateProvider) {
        "use strict";

        // Home
        $routeProvider.when('/', {
            templateUrl: 'partials/about.html',
            controller: function ($location) {
                $location.path('/cookies/design');
                console.warn("Home: Redirect to cookie design.");
            }
        });

        $stateProvider.state('home', {
            url: '/',
            ncyBreadcrumb: {
                label: 'Cookie Factory'
            }
        });

        // About
        $routeProvider.when('/about', {
            templateUrl: 'partials/about.html',
        });

        $stateProvider.state('about', {
            url: '/about',
            ncyBreadcrumb: {
                label: 'about',
                parent: 'home'
            }
        });

        // Contact
        $routeProvider.when('/contact', {
            templateUrl: 'partials/contact.html',
        });

        $stateProvider.state('contact', {
            url: '/contact',
            ncyBreadcrumb: {
                label: 'contact',
                parent: 'home'
            }
        });

        // Cart
        $routeProvider.when('/cart', {
            templateUrl: 'partials/cart/list.html',
        });

        $stateProvider.state('cart', {
            url: '/cart',
            ncyBreadcrumb: {
                label: 'cart',
                parent: 'home'
            }
        });

        // Account Details
        $routeProvider.when('/account', {
            templateUrl: 'partials/account/details.html',
            controller: accountDetailController
        });

        $stateProvider.state('account', {
            url: '/account',
            ncyBreadcrumb: {
                label: 'account',
                parent: 'home'
            }
        });

        // Account Edit
        $routeProvider.when('/account/edit', {
            templateUrl: 'partials/account/edit.html',
            controller: accountEditController
        });

        $stateProvider.state('account edit', {
            url: '/account/edit',
            ncyBreadcrumb: {
                parent: 'account',
                label: 'account edit'
            }
        });

        // Account EditAddress
        $routeProvider.when('/account/address/add', {
            templateUrl: 'partials/account/address/add.html',
            controller: addressController
        });

        $stateProvider.state('account add account', {
            url: '/account/address/add',
            ncyBreadcrumb: {
                parent: 'account',
                label: 'add account'
            }
        });

        // Account EditAddress
        $routeProvider.when('/account/address/edit/:_id', {
            templateUrl: 'partials/account/address/edit.html',
            controller: addressController
        });

        $stateProvider.state('account edit address', {
            url: '/account/address/add',
            ncyBreadcrumb: {
                parent: 'account',
                label: 'edit address'
            }
        });

        // Account register
        $routeProvider.when('/account/register', {
            templateUrl: 'partials/account/register.html',
            controller: accountRegisterController
        });

        $stateProvider.state('register', {
            url: '/account/register',
            ncyBreadcrumb: {
                parent: 'register',
                label: 'register'
            }
        });

        // a list of cookies
        $routeProvider.when('/cookies/list', {
            templateUrl: 'partials/cookies/list.html'
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

        // Get orderConfirmation
        $routeProvider.when('/orders/confirmation/', {
            templateUrl: 'partials/orders/orderConfirmation.html',
            controller: orderController
        });
        // Get orderDetails
        $routeProvider.when('/orders/details', {
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
    });
