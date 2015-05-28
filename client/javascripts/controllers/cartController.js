/*jslint node: true */
/*globals cookieFactory, angular*/

//var cookieFactory = angular.module('cookieFactory', []);

cookieFactory.controller('cartController', function ($scope) {
    "use strict";
    $scope.cartItems = [
        {name: "Koekie Speciale", amount: 1, price: 8.99},
        {name: "Pauperkoekje Deluxe 3000", amount: 1, price: 34.99},
    ];
    $scope.itemCount = $scope.cartItems.length;
});
