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

        // Design cookie
        $routeProvider.when('/cookies/design', {
            templateUrl: 'partials/cookies/design.html'
        });

        $stateProvider.state('home', {
            url: '/cookies/design',
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
                parent: 'home',
                label: 'about'
            }
        });

        // Contact
        $routeProvider.when('/contact', {
            templateUrl: 'partials/contact.html',
        });

        $stateProvider.state('contact', {
            url: '/contact',
            ncyBreadcrumb: {
                parent: 'home',
                label: 'contact'
            }
        });

        // Cart
        $routeProvider.when('/cart', {
            templateUrl: 'partials/cart/list.html',
        });

        $stateProvider.state('cart', {
            url: '/cart',
            ncyBreadcrumb: {
                parent: 'home',
                label: 'winkelwagen'
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
                parent: 'home',
                label: 'account'
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

        // Account add Address
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

        // Account edit Address
        $routeProvider.when('/account/address/edit/:_id', {
            templateUrl: 'partials/account/address/edit.html',
            controller: addressController
        });

        $stateProvider.state('account edit address', {
            url: '/account/address/edit',
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
                parent: 'home',
                label: 'register'
            }
        });

        // a list of cookies
        $routeProvider.when('/cookies/list', {
            templateUrl: 'partials/cookies/list.html'
        });

        $stateProvider.state('cookie list', {
            url: '/cookies/list',
            ncyBreadcrumb: {
                parent: 'home',
                label: 'koekjes lijst'
            }
        });

        // Get orderDetails
        $routeProvider.when('/orders/details', {
            templateUrl: 'partials/orders/orderDetails.html',
            controller: orderController
        });

        $stateProvider.state('order detail', {
            url: '/orders/details',
            ncyBreadcrumb: {
                parent: 'cart',
                label: 'order details'
            }
        });

        // Get orderConfirmation
        $routeProvider.when('/orders/confirmation', {
            templateUrl: 'partials/orders/orderConfirmation.html',
            controller: orderController
        });

        $stateProvider.state('order confirm', {
            url: '/orders/confirmation',
            ncyBreadcrumb: {
                parent: 'order detail',
                label: 'order'
            }
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
