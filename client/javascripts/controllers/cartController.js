/*jslint node: true */
/*globals angular,cookieFactory*/

cookieFactory.controller('cartController', function ($scope) {
    "use strict";

    var subtotal = 0.0, i = 0;

    $scope.cartItems = [
        {_id: 1, name: "Koekie Speciale", amount: 1, price: 8.99},
        {_id: 451, name: "Pauperkoekje Deluxe 3000", amount: 1, price: 34.99},
    ];
    $scope.itemCount = $scope.cartItems.length;

    for (i = 0; i < $scope.cartItems.length; i += 1) {
        subtotal += $scope.cartItems[i].price;
    }
    $scope.shipping = 3.99;
    $scope.subtotal = subtotal + $scope.shipping;
    $scope.tax = (subtotal / 100) * 21;
    $scope.total = $scope.subtotal + $scope.tax;
});
