/*jslint node: true */
/*globals cookieFactory, alert,  accountService, usersService, authenticationService, dbService */

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
 * @param usersService
 * @constructor
 */

function orderController($scope, $routeParams, $location, orderService, $cookieStore, authenticationService, usersService) {
    "use strict";

    $scope.shipment = { shipmentDate: new Date(), shipmentType: null, invoiceAddress: 'poep', shipmentAddress: "poep", orderLines: ["poep"] };
    $scope.payment = { paymentOption: "IDeal", bank: "", paid: 0 };

    // Lists
    $scope.order = {
        "number": null,
        status: "new",
        user: null,
        rules: null,
        invoiceAdress: null,
        shipmentAddress: null,
        vatPercentage: null
    };

    $scope.shipmentTypes = [{ id: "Home", description: "Laten bezorgen thuis of op een ander adres" }, { id: "PostNL", description: "Afhalen bij een ophaalpunt bij u in de buurt" }];
    $scope.paymentOptions = [{ id: "Acceptgiro", description: "Betaal binnen 30 dagen na het plaatsen van de order."}, { id: "IDeal", description: "Betaal direct met behulp van IDeal." }];
    $scope.banks = [{ id: "ING Bank", name: "ING Bank" }, { id: "ASN Bank", name: "ASN Bank" }];
    $scope.addresses = [{ street: "Rietdekkersveld", streetNumber: 40, zipCode: "7031 DL", city: "Wehl" }, { street: "Weversveld", streetNumber: 23, zipCode: "5862 GL", city: "Doetinchem" }];

    $scope.SetShipmentType = function (shipmentType) {
        $scope.shipment.shipmentType = shipmentType;
    };

    $scope.SetShipmentAddress = function (index) {
        console.log(index);
        $scope.order.shipmentAddress = $scope.addresses[index];
    };

    $scope.SetPaymentOption = function (paymentOption) {
        $scope.payment.paymentOption = paymentOption;
    };

    $scope.SetPaymentAddress = function (index) {
        console.log(index);
        $scope.order.paymentAddress = $scope.addresses[index];
    };

    $scope.SaveOrder = function () {
        console.log("BAM!!");
        orderService.orders.save({}, $scope.shipment, function (res) {
            console.log(res);
        });
    };

    // Proceed to payment
    $scope.ProceedToPayment = function () {
        console.debug($cookieStore.get('key'));
        if (!$scope.userName) {
            alert("U bent niet ingelogd.");
        } else if (!$scope.shipment.shipmentType) {
            alert("U heeft nog geen verzend wijze gekozen.");
        } else if (!$scope.shipment.shipmentAddress) {
            alert('Er is nog geen verzendadres bekend.');
        } else if ($scope.shipment.orderLines.length === 0) {
            alert('De order bevat geen items.');
        } else if (!$scope.shipment.shipmentDate.date) {
            alert('U heeft nog geen verzenddatum ingevoerd.');
        } else {
            $cookieStore.put("myOrder", $scope.order);
            console.log("redirect to payment");
            $location.path("/orders/payment/");
        }
    };

    // Proceed to confirmation
    $scope.ProceedToConfirmation = function () {
        console.log($scope.userName);
        if (!$scope.userName) {
            alert("U bent niet ingelogd.");
        } else if (!$scope.payment.paymentOption) {
            alert("Selecteer een betaal optie.");
        } else if ($scope.payment.bank === "" && $scope.payment.paymentOption === "IDeal") {
            alert("Selecteer een bank");
        } else {
            $scope.initRestId = function () {
                $scope.$broadcast("emptyCartEvent");
            };
            console.debug($cookieStore.get("myOrder"));
            $scope.order = $cookieStore.get("myOrder");
            $cookieStore.put("myOrder", $scope.order);
            $location.path("/orders/confirmation/");
        }
    };

    authenticationService.getUser(function (loggedIn, loggedInUser) {
        if (loggedIn) {
            $scope.userName = loggedInUser.username;
            console.log(loggedInUser.address);
        }
    });
}