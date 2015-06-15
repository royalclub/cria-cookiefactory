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
    var storageCookieName = 'cookies', storageEditCookieName = 'editCookie';
    $scope.cartItems = null;

    /**
     * Calculate the price of a single cookie.
     */
    $scope.calculateOrderRulePrice = function (orderRule) {
        var layerIdx = 0, subtotal = 0.0;

        if (orderRule.cookie[0].layers === undefined) {
            return 0.0;
        }

        for (layerIdx = 0; layerIdx < orderRule.cookie[0].layers.length; layerIdx += 1) {
            subtotal += orderRule.cookie[0].layers[layerIdx].options[0].price;
        }

        return subtotal * (orderRule.box[0].capacity * orderRule.amountOfBoxes);
    };

    /**
     * Calculates the all the prices
     */
    $scope.calculatePrices = function () {
        var subtotal = 0.0, cookieIdx = 0;

        if ($scope.cartItems !== null) {
            for (cookieIdx = 0; cookieIdx < $scope.cartItems.length; cookieIdx += 1) {
                subtotal += $scope.calculateOrderRulePrice($scope.cartItems[cookieIdx]);
            }
            $scope.subtotal = subtotal;
            $scope.tax = (subtotal / 100) * 21;
            $scope.total = $scope.subtotal + $scope.tax;
        }
    };


    $scope.initialize = function () {
        $scope.loadCart();
        $scope.calculatePrices();
    };

    $scope.loadCart = function () {
        $scope.cartItems = JSON.parse(localStorage.getItem(storageCookieName));
    };

    $scope.initialize();

    /**
     * Deletes a cartitem
     * @constructor
     * @param $index
     */
    $scope.deleteCartItem = function (event, index) {
        event.preventDefault();
        $scope.cartItems.splice(index, 1);
        localStorage.setItem(storageCookieName, JSON.stringify($scope.cartItems));
        $scope.calculatePrices();
    };

    $scope.editCartItem = function (event, index) {
        event.preventDefault();
        localStorage.setItem(storageEditCookieName, index);
        $location.path('/cookies/design');
    };

    /**
     * Updates a cartitem
     */
    $scope.updateCartItem = function () {
        localStorage.setItem(storageCookieName, JSON.stringify($scope.cartItems));
        $scope.calculatePrices();
    };

    /**
     * Sets the amount of items in the menubar
     * @constructor
     * @param scope
     */
    $scope.$watch(
        function (scope) {
            return ($scope.cartItems === null) ? 0 : $scope.cartItems.length;
        },
        function (newValue) {
            document.getElementById("cartItemsNumber").innerHTML = newValue;
        }
    );

    /**
     * Sets the orderrules in the localstorage and navigates to order detail
     * @constructor
     * @param $event
     */
    $scope.onProceedClicked = function ($event) {
        var text;
        $event.preventDefault();

        authenticationService.getUser(function (loggedIn, loggedInUser) {
            if (loggedIn) {
                $location.path("/orders/details");
            } else {
                text = 'U moet eerst inloggen voordat u verder kan gaan.';
                messageService.setMessage(text, 'danger');
            }
        });
    };
});