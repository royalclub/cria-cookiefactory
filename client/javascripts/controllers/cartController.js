/*jslint node: true */
/*globals angular,cookieFactory*/

cookieFactory.controller('cartController', function ($scope, $cookies, $window, $location) {
    "use strict";
    var b, layer, storageCookieName = 'key', storage;
    $scope.orderRules = [];
    $scope.shipping = 3.99;

    function calculatePrices() {
        var subtotal = 0.0, i;
        for (i = 0; i < $scope.cartItems.length; i += 1) {
            subtotal += $scope.orderRules[i].cookie.price * $scope.orderRules[i].amountOfBoxes;
        }
        $scope.subtotal = subtotal + $scope.shipping;
        $scope.tax = (subtotal / 100) * 21;
        $scope.total = $scope.subtotal + $scope.tax;
    }

    if ($scope.cartItems === undefined) {
        storage = JSON.parse(localStorage.getItem(storageCookieName));
        if (!storage) {
            localStorage.setItem(storageCookieName, JSON.stringify([]));
            $scope.itemCount = 0;
        } else {
            $scope.cartItems = JSON.parse(localStorage.getItem(storageCookieName));
            for (b = 0; b < $scope.cartItems.length; b += 1) {
                $scope.orderRules.push({
                    cookie : $scope.cartItems[b],
                    box : null,
                    amountOfBoxes : 1
                });
            }
            for (b = 0; b < $scope.cartItems.length; b += 1) {
                $scope.cartItems[b].price = 0;
                for (layer = 0; layer < $scope.cartItems[b].layers.length; layer += 1) {
                    $scope.cartItems[b].price = $scope.cartItems[b].layers[layer].options.price + $scope.cartItems[b].price;
                }
                $scope.cartItems[b].amount = 1;
            }
            localStorage.setItem(storageCookieName, JSON.stringify($scope.cartItems));
            $scope.itemCount = $scope.cartItems.length;
            calculatePrices();
        }
    }

    $scope.deleteCartItem = function ($index) {
        $scope.cartItems.splice($index, 1);
        $scope.orderRules.splice($index, 1);
        localStorage.setItem(storageCookieName, JSON.stringify($scope.cartItems));
        $scope.itemCount = $scope.cartItems.length;
        calculatePrices();
    };

    $scope.updateCartItem = function () {
        localStorage.setItem(storageCookieName, JSON.stringify($scope.cartItems));
        $scope.itemCount = $scope.cartItems.length;
        calculatePrices();
    };

    $scope.$watch(function (scope) { return scope.itemCount; },
        function (newValue) {
            document.getElementById("cartItemsNumber").innerHTML = newValue;
        });

    $scope.onProceedClicked = function ($event) {
        $event.preventDefault();
        console.log($scope.orderRules);
        localStorage.setItem('myOrder', JSON.stringify($scope.orderRules));
        $location.path("/orders/details");
    };
});