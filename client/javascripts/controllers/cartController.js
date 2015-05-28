/*jslint node: true */
/*globals cookieFactory, angular*/

//var cookieFactory = angular.module('cookieFactory', []);

cookieFactory.controller('cartController', function ($scope) {
    "use strict";
    $scope.cartItems = [
        {_id: 1, name: "Koekie Speciale", amount: 1, price: 8.99},
        {_id: 451, name: "Pauperkoekje Deluxe 3000", amount: 1, price: 34.99},
    ];
    $scope.itemCount = $scope.cartItems.length;
    
    var subtotal = 0.0;
    for(var i = 0; i < $scope.cartItems.length; i += 1) {
        subtotal += $scope.cartItems[i].price;
    }
    $scope.subtotal = subtotal;
    $scope.tax = (subtotal / 100) * 21;
    $scope.total = $scope.subtotal + $scope.tax;
});
