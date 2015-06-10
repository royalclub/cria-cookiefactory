/*jslint node: true */
/*globals angular,cookieFactory*/

/**
 * Controller for cart
 * @constructor
 * @param $scope
 * @param $location
 */
cookieFactory.controller('cartController', function ($scope, $location, authenticationService, messageService) {
    "use strict";
    var b, layer, storageCookieName = 'key', storageOrderRules = 'myOrderRules', storage;
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
    
    var myOrderRules = JSON.parse(localStorage.getItem(storageOrderRules));
    if(myOrderRules && myOrderRules.length !== 0){
        $scope.orderRules = myOrderRules;
        for(b = 0; b < $scope.orderRules.length; b += 1) {
            $scope.cartItems = myOrderRules[b].cookie;
            $scope.itemCount = $scope.cartItems.length;
        }
    }else{
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
                localStorage.setItem(storageOrderRules, JSON.stringify($scope.orderRules));
                $scope.itemCount = $scope.cartItems.length;
                calculatePrices();
            }
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
        localStorage.setItem(storageOrderRules, JSON.stringify($scope.orderRules));
        $scope.itemCount = $scope.cartItems.length;
        calculatePrices();
    };

    /**
     * Updates a cartitem
     */
    $scope.updateCartItem = function () {
        localStorage.setItem(storageCookieName, JSON.stringify($scope.cartItems));
        localStorage.setItem(storageOrderRules, JSON.stringify($scope.orderRules));
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
        var text;
        $event.preventDefault();
        localStorage.setItem(storageOrderRules, JSON.stringify($scope.orderRules));

        authenticationService.getUser(function (loggedIn, loggedInUser) {
            if (loggedIn) {
                $event.preventDefault();
                $location.path("/orders/details");
            } else {
                text = 'U moet eerst inloggen voordat u verder kan gaan.';
                messageService.setMessage(text, 'danger');
            }
        });
    };
});