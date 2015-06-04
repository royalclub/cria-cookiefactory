/*jslint node: true */
/*globals angular,cookieFactory*/

cookieFactory.controller('cartController', ['$scope', '$cookies', '$cookieStore', '$window', function ($scope, $cookies, $cookieStore, $window, $location) {
    "use strict";
    var b, layer;

    //$cookieStore.put('key', [{_id: 1, name: "Koekie Speciale", amount: 1, price: 8.99},{_id: 451, name: "Pauperkoekje Deluxe 3000", amount: 1, price: 34.99}]);

    function calculatePrices($scope) {
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
        if ($cookieStore.get('key') === undefined) {
            $scope.itemCount = 0;
            $cookieStore.put('key', []);
        } else {
            console.log($cookieStore.get('key'));
            $scope.cartItems = $cookieStore.get('key');
            for (b = 0; b < $scope.cartItems.length; b += 1) {
                $scope.cartItems[b].price = 0;
                for (layer = 0; layer < $scope.cartItems[b].layers.length; layer += 1) {
                    $scope.cartItems[b].price = $scope.cartItems[b].layers[layer].options.price + $scope.cartItems[b].price;
                }
                $scope.cartItems[b].amount = 1;
            }
            $cookieStore.put('key', $scope.cartItems);
            $scope.itemCount = $scope.cartItems.length;
            calculatePrices($scope);
        }
    }



    $scope.deleteCartItem = function ($index) {
        var array = $cookieStore.get('key');
        array.splice($index, 1);
        $cookieStore.put('key', array);

        $scope.cartItems = $cookieStore.get('key');

        $scope.itemCount = $scope.cartItems.length;

        calculatePrices($scope);
    };

    $scope.addCartItem = function () {
        var array = $cookieStore.get('key'), testObject, len = array.length, testBoolean = false, i;
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

        $cookieStore.put('key', array);

        $scope.cartItems = $cookieStore.get('key');

        $scope.itemCount = $scope.cartItems.length;

        calculatePrices($scope);
    };

    $scope.updateCartItem = function ($id, $cart) {
        var i, array = $cookieStore.get('key'), len = array.length;
        for (i = 0; i < len; i++) {
            if (array[i]._id === $id) {
                array[i].amount = $cart;
            }
        }

        $cookieStore.put('key', array);

        $scope.cartItems = $cookieStore.get('key');

        $scope.itemCount = $scope.cartItems.length;

        calculatePrices($scope);
    };




    $scope.$watch(function (scope) { return scope.itemCount; },
        function (newValue) {
            document.getElementById("cartItemsNumber").innerHTML =
                newValue;
        });
}]);