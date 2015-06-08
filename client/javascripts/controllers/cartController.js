/*jslint node: true */
/*globals angular,cookieFactory*/

cookieFactory.controller('cartController', ['$scope', '$cookies', '$cookieStore', '$window', function ($scope, $cookies, $cookieStore, $window, $location, cookies) {
    "use strict";
    var b, layer, browserCookieName = 'key', storage;

    //$cookieStore.put('key', [{_id: 1, name: "Koekie Speciale", amount: 1, price: 8.99},{_id: 451, name: "Pauperkoekje Deluxe 3000", amount: 1, price: 34.99}]);

    function calculatePrices() {
        var subtotal = 0.0, i;
        for (i = 0; i < $scope.cartItems.length; i += 1) {
            subtotal += $scope.cartItems[i].price * $scope.cartItems[i].amount;
        }
        $scope.shipping = 3.99;
        $scope.subtotal = subtotal + $scope.shipping;
        $scope.tax = (subtotal / 100) * 21;
        $scope.total = $scope.subtotal + $scope.tax;
    }

    if ($scope.cartItems === undefined) {
        storage = JSON.parse(localStorage.getItem(browserCookieName));
        if (!storage) {
            console.log('henk');
            localStorage.setItem(browserCookieName, JSON.stringify([]));
            $scope.itemCount = 0;
        } else {
            $scope.cartItems = JSON.parse(localStorage.getItem(browserCookieName));
            console.log($scope.cartItems);
            for (b = 0; b < $scope.cartItems.length; b += 1) {
                $scope.cartItems[b].price = 0;
                for (layer = 0; layer < $scope.cartItems[b].layers.length; layer += 1) {
                    $scope.cartItems[b].price = $scope.cartItems[b].layers[layer].options.price + $scope.cartItems[b].price;
                }
                $scope.cartItems[b].amount = 1;
            }
            localStorage.setItem(browserCookieName, JSON.stringify($scope.cartItems));
            $scope.itemCount = $scope.cartItems.length;
            calculatePrices();
        }
    }

    $scope.deleteCartItem = function ($index) {
        var array = JSON.parse(localStorage.getItem(browserCookieName));
        array.splice($index, 1);
        localStorage.setItem(browserCookieName, JSON.stringify(array));
        $scope.cartItems = array;
        $scope.itemCount = $scope.cartItems.length;
        calculatePrices();
    };

    $scope.addCartItem = function () {
        var array = JSON.parse(localStorage.getItem(browserCookieName)), testObject, len = array.length, testBoolean = false, i;
        testObject = {_id: 1, name: "Koekie Speciale", amount: 1, price: 8.99};
        for (i = 0; i < len; i++) {
            if (array[i]._id === testObject._id) {
                console.log(array[i]._id);
                array[i].amount = array[i].amount + testObject.amount;
                testBoolean = true;
            }
        }
        if (testBoolean === false) {
            array.push(testObject);
        }
        localStorage.setItem(browserCookieName, JSON.stringify(array));
        $scope.cartItems = array;
        $scope.itemCount = $scope.cartItems.length;
        calculatePrices();
    };

    $scope.updateCartItem = function ($id, $cart) {
        var i, array = $cookieStore.get(browserCookieName), len = array.length;
        for (i = 0; i < len; i++) {
            if (array[i]._id === $id) {
                array[i].amount = $cart;
            }
        }
        localStorage.setItem(browserCookieName, JSON.stringify(array));
        $scope.cartItems = array;
        $scope.itemCount = $scope.cartItems.length;
        calculatePrices();
    };

    $scope.$watch(function (scope) { return scope.itemCount; },
        function (newValue) {
            document.getElementById("cartItemsNumber").innerHTML =
                newValue;
        });
}]);