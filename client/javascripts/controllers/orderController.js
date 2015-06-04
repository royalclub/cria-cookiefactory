/*jslint node: true */
/*globals cookieFactory, alert */

/**
 * TODO: create controller for orders list
 * @param $scope
 * @param orderService
 * @constructor
 */

var newOrder = {
        orderLines: [],
        invoiceAddress: null,
        shipmentAddress: null
    };

/**
 * Controller for Orders
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param orderService
 * @constructor
 */

function orderController($scope, $routeParams, $location, orderService) {
    "use strict";

    $scope.GetNewOrder = function () {
        return newOrder;
    };

    $scope.SetOrderLines = function (cart) {
        newOrder.orderLines = cart;
    };

    $scope.SetInvoiceAddress = function (address) {
        newOrder.invoiceAddress = address;
        $location.path('/#/order/payment/');
    };

    $scope.SetShipmentAddress = function (address) {
        newOrder.shipmetAddress = address;
        $location.path('/#/order/payment/');
    };

    $scope.SaveOrder = function () {
        console.log("BAM!!");
        orderService.orders.save({}, newOrder, function (res) {
            console.log(res);
        });
        newOrder = { orderLines: [{ cookie: {}, numberOf: 0 }], invoiceAddress: {}, shipmentAddress: {} };
    };

    // Navigation
    $scope.OnProceedToPayment = function ($event) {
        console.log("CHECK!");
        if (newOrder.shipmentAddress === undefined) {
            alert('Er is nog geen verzendadress bekend.');
        } else if (newOrder.orderLines.lenght === undefined) {
            alert('De order bevat geen items.');
        } else {
            console.log("redirect to payment");
            $location.path("/orders/payment/");
        }
        $event.preventDefault();
    };
}