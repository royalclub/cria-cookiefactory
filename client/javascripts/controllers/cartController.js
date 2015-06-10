/*jslint node: true */
/*globals angular,cookieFactory*/

/**
 * Controller for cart
 * @constructor
 * @param $scope
 * @param $location
 */
cookieFactory.controller('cartController', function ($scope, $location) {
    "use strict";
    var b, layer, storageCookieName = 'key', storage;
    $scope.orderRules = [];

    /**
     * Calculates the all the prices
     */
    function calculatePrices() {
        var subtotal = 0.0, i;
        for (i = 0; i < $scope.cartItems.length; i += 1) {
            subtotal += $scope.orderRules[i].cookie[0].price * $scope.orderRules[i].amountOfBoxes;
        }
        $scope.subtotal = subtotal;
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
                    cookie : [$scope.cartItems[b]],
                    box : null,
                    amountOfBoxes : 1
                });
            }
            for (b = 0; b < $scope.cartItems.length; b += 1) {
                $scope.cartItems[b].price = 0;
                for (layer = 0; layer < $scope.cartItems[b].layers.length; layer += 1) {
                    $scope.cartItems[b].price = $scope.cartItems[b].layers[layer].options[0].price + $scope.cartItems[b].price;
                }
                $scope.cartItems[b].amount = 1;
            }
            localStorage.setItem(storageCookieName, JSON.stringify($scope.cartItems));
            $scope.itemCount = $scope.cartItems.length;
            calculatePrices();
        }
    }

    /**
     * Deletes a cartitem
     * @constructor
     * @param $index
     */
    $scope.deleteCartItem = function ($index) {
        $scope.cartItems.splice($index, 1);
        $scope.orderRules.splice($index, 1);
        localStorage.setItem(storageCookieName, JSON.stringify($scope.cartItems));
        $scope.itemCount = $scope.cartItems.length;
        calculatePrices();
    };

    /**
     * Updates a cartitem
     */
    $scope.updateCartItem = function () {
        localStorage.setItem(storageCookieName, JSON.stringify($scope.cartItems));
        $scope.itemCount = $scope.cartItems.length;
        calculatePrices();
    };

    /**
     * Sets the amount of items in the menubar
     * @constructor
     * @param scope
     */
    $scope.$watch(function (scope) { return scope.itemCount; },
        function (newValue) {
            document.getElementById("cartItemsNumber").innerHTML = newValue;
        });

    /**
     * Sets the orderrules in the localstorage and navigates to order detail
     * @constructor
     * @param $event
     */
    $scope.onProceedClicked = function ($event) {
        $event.preventDefault();
        localStorage.setItem('myOrderRules', JSON.stringify($scope.orderRules));
        $location.path("/orders/details");
    };
});