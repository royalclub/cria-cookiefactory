/*jslint node: true */
/*globals angular,cookieFactory*/

cookieFactory.controller('cartController', ['$scope', '$cookies', '$cookieStore', '$window', function($scope, $cookies, $cookieStore, $window ,$location) {
    "use strict";

    var subtotal = 0.0, i;

    //$cookieStore.put('key', [{_id: 1, name: "Koekie Speciale", amount: 1, price: 8.99},{_id: 451, name: "Pauperkoekje Deluxe 3000", amount: 1, price: 34.99}]);

    $scope.cartItems = $cookieStore.get('key');


    if ($scope.cartItems === undefined){
        $scope.itemCount = 0;
        $cookieStore.put('key', []);
    }
    else {
        $scope.itemCount = $scope.cartItems.length;

        for (i = 0; i < $scope.cartItems.length; i += 1) {
            subtotal += $scope.cartItems[i].price * $scope.cartItems[i].amount;
        }
    }

    $scope.shipping = 3.99;
    $scope.subtotal = subtotal + $scope.shipping;
    $scope.tax = (subtotal / 100) * 21;
    $scope.total = $scope.subtotal + $scope.tax;

    $scope.deleteCartItem = function () {
        var array = $cookieStore.get('key'), subtotal = 0;
        array.shift();
        $cookieStore.put('key', array);

        $scope.cartItems = $cookieStore.get('key');

        $scope.itemCount = $scope.cartItems.length;

        for (i = 0; i < $scope.cartItems.length; i += 1) {
            subtotal += $scope.cartItems[i].price * $scope.cartItems[i].amount;
        }

    $scope.shipping = 3.99;
    $scope.subtotal = subtotal + $scope.shipping;
    $scope.tax = (subtotal / 100) * 21;
    $scope.total = $scope.subtotal + $scope.tax;
    };

    $scope.addCartItem = function () {
        var array = $cookieStore.get('key'), subtotal = 0, testObject, len=array.length, testBoolean = false;
        testObject = {_id: 1, name: "Koekie Speciale", amount: 1, price: 8.99};
        for (i = 0; i<len; i++) {
            if (array[i]._id === testObject._id) {
                array[i].amount = array[i].amount + testObject.amount;
                testBoolean = true;
            }
        }

        if (testBoolean === false){
            array.push(testObject);
        }

        $cookieStore.put('key', array);

        $scope.cartItems = $cookieStore.get('key');

        $scope.itemCount = $scope.cartItems.length;

        for (i = 0; i < $scope.cartItems.length; i += 1) {
            subtotal += $scope.cartItems[i].price * $scope.cartItems[i].amount;
        }

        $scope.shipping = 3.99;
        $scope.subtotal = subtotal + $scope.shipping;
        $scope.tax = (subtotal / 100) * 21;
        $scope.total = $scope.subtotal + $scope.tax;
    };

    $scope.updateCartItem = function ($id, $cart) {

        console.log($cart);
        var i, array = $cookieStore.get('key'), subtotal = 0, len=array.length, key;
        for (i = 0; i<len; i++) {
            if (array[i]._id == $id) {
                array[i].amount = array[i].amount + 1;
                console.log(array[i].amount)
            }
        }

        $cookieStore.put('key', array);

        $scope.cartItems = $cookieStore.get('key');

        $scope.itemCount = $scope.cartItems.length;

        for (i = 0; i < $scope.cartItems.length; i += 1) {
            subtotal += $scope.cartItems[i].price * $scope.cartItems[i].amount;
        }

        $scope.shipping = 3.99;
        $scope.subtotal = subtotal + $scope.shipping;
        $scope.tax = (subtotal / 100) * 21;
        $scope.total = $scope.subtotal + $scope.tax;
    };




    $scope.$watch(function(scope) { return scope.itemCount },
        function(newValue) {
            document.getElementById("Tommovic").innerHTML =
                "" + newValue + "";
        }
    );

}
]);