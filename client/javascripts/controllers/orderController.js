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
        invoiceAddress: {},
        shipmentAddress: {}
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
    $scope.shipment = { shipmentDate: new Date(), shipmentType: null, invoiceAddress: 'poep', shipmentAddress: "poep", orderLines: ["poep"] };
    $scope.payment = { paymentOption: "IDeal", bank: "", paid: 0 };

    // Lists
    $scope.shipmentTypes = [{ id: "Home", description: "Laten bezorgen thuis of op een ander adres" }, { id: "PostNL", description: "Afhalen bij een ophaalpunt bij u in de buurt" }];
    $scope.paymentOptions = [{ id: "Acceptgiro", description: "Betaal binnen 30 dagen na het plaatsen van de order."}, { id: "IDeal", description: "Betaal direct met behulp van IDeal." }];
    $scope.banks = [{ id: "ING Bank", name: "ING Bank" }, { id: "ASN Bank", name: "ASN Bank" }];

    $scope.SetShipmentType = function (shipmentType) {
        $scope.shipment.shipmentType = shipmentType;
    };

    $scope.SetPaymentOption = function (paymentOption) {
        $scope.payment.paymentOption = paymentOption;
    };

    $scope.SaveOrder = function () {
        console.log("BAM!!");
        orderService.orders.save({}, newOrder, function (res) {
            console.log(res);
        });
    };

    // Proceed to payment
    $scope.ProceedToPayment = function () {
        if (!$scope.shipment.shipmentType) {
            alert("U heeft nog geen verzend wijze gekozen.");
        } else if (!$scope.shipment.shipmentAddress) {
            alert('Er is nog geen verzendadres bekend.');
        } else if ($scope.shipment.orderLines.length === 0) {
            alert('De order bevat geen items.');
        } else if (!$scope.shipment.shipmentDate.date) {
            alert('U heeft nog geen verzenddatum ingevoerd.');
        } else {
            console.log("redirect to payment");
            $location.path("/orders/payment/");
        }
    };

    // Proceed to confirmation
    $scope.ProceedToConfirmation = function () {
        if (!$scope.payment.paymentOption) {
            alert("Selecteer een betaal optie.");
        } else if ($scope.payment.bank === "" && $scope.payment.paymentOption === "IDeal") {
            alert("Selecteer een bank");
        } else {
            $location.path("/orders/confirmation/");
        }
    };
}
