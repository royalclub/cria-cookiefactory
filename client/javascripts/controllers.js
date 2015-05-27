/*jslint node: true */
/*globals cookieFactory */

/**
 * Controller for Cookies
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param cookiesService
 * @constructor
 */
function cookieController($scope, $routeParams, $location, cookiesService) {
    "use strict";
    
    // GET 1 cookie
    if ($routeParams._id !== 'new') {
        $scope.cookies = cookiesService.cookies.get({_id: $routeParams._id}, function () {
            console.log('$scope.requests ', $scope.requests);
        });
    }

    // DELETE cookie
    $scope.delete = function () {
        cookiesService.cookies.delete({_id: $routeParams._id});
        $location.path("/cookies");
    };

    // CREATE, UPDATE cookie
    $scope.save = function () {

        if ($scope.cookies.doc && $scope.cookies.doc._id !== undefined) {
            console.log('Entering update');
            cookiesService.cookies.update({_id: $routeParams._id}, $scope.cookies.doc, function (res) {
                console.log(res);
            });
        } else {
            console.log('Entering save');
            cookiesService.cookies.save({}, $scope.cookies.doc, function (res) {
                console.log(res);
            });
        }
    };

}


/**
 * Controller for User
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param usersService
 * @constructor
 */
function userController($scope, $routeParams, $location, usersService) {
    "use strict";
    
    // GET 1 cookie
    if ($routeParams._id !== 'new') {
        $scope.users = userService.users.get({_id: $routeParams._id}, function () {
            console.log('$scope.requests ', $scope.requests);
        });
    }

    // DELETE cookie
    $scope.delete = function () {
        usersService.users.delete({_id: $routeParams._id});
        $location.path("/users");
    };

    // CREATE, UPDATE cookie
    $scope.save = function () {

        if ($scope.users.doc && $scope.users.doc._id !== undefined) {
            console.log('Entering update');
            usersService.users.update({_id: $routeParams._id}, $scope.users.doc, function (res) {
                console.log(res);
            });
        } else {
            console.log('Entering save');
            usersService.users.save({}, $scope.users.doc, function (res) {
                console.log(res);
            });
        }
    };
}


cookieFactory.controller('menuController', function ($scope, $routeParams) {
    "use strict";
    console.log($routeParams);
    $scope.items = [
        {name: "Home", url: "/#/", active: "active"},
        {name: "Over ons", url: "/#/about", active: ""},
        {name: "Ontwerp koekje", url: "/#/cookies/design", active: ""},
        {name: "Contact", url: "/#/contact", active: ""}
    ];
    $scope.breadcrumb = [
        {name: "Cookie Factory", url: "/#/", active: "active"},
        {name: "Over ons", url: "/#/about", active: "active"}
    ];
});

cookieFactory.controller('cartController', function ($scope) {
    "use strict";
    $scope.items = [
        {name: "Koekie Speciale", amount: 1, price: 8.99},
        {name: "Pauperkoekje Deluxe 3000", amount: 1, price: 34.99},
    ];
    $scope.itemCount = $scope.items.length;
});
