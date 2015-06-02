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

function orderController($scope, $routeParams, $location, orderService) {
    "use strict";

    $scope.order = {
        orderLines: [{
            cookie: {},
            numberOf: 0
        }],
        invoiceAddress: {},
        shipmentAddress: {}
    };
}
//