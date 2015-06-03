/*jslint node: true */
/*globals cookieFactory */

/**
 * TODO: create controller for orders list
 * @param $scope
 * @param orderService
 * @constructor
 */

/**
 * Controller for Orders
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param orderService
 * @constructor
 */
var newOrder = {
        orderLines: [{
            cookie: {},
            numberOf: 0
        }],
        invoiceAddress: {},
        shipmentAddress: {}
    };

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
    };

    $scope.SetShipmentAddress = function (address) {
        newOrder.shipmetAddress = address;
    };

    $scope.SaveOrder = function () {
        console.log("BAM!!");
        orderService.orders.save({}, newOrder, function (res) {
            console.log(res);
        });
        newOrder = { orderLines: [{ cookie: {}, numberOf: 0 }], invoiceAddress: {}, shipmentAddress: {} };
    };
}