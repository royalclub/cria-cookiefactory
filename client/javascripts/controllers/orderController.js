/*jslint node: true */
/*globals cookieFactory, alert,  accountService, authenticationService, dbService */

/**
 * TODO: create controller for orders list
 * @param $scope
 * @param orderService
 * @param dbService
 * @constructor
 */

/**
 * Controller for Orders
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param orderService
 * @param dbService
 * @constructor
 */

function orderController($scope, $routeParams, $location, orderService, $cookieStore, authenticationService, usersService, dbService) {
    "use strict";

    $scope.shipment = { shipmentDate: new Date(), shipmentType: null, invoiceAddress: 'poep', shipmentAddress: "poep", orderLines: ["poep"] };
    $scope.payment = { paymentOption: "IDeal", bank: "", paid: 0 };
    $scope.user = {};

    authenticationService.getUser(function (loggedIn, loggedInUser) {
        if (loggedIn) {
            $scope.user = loggedInUser;
            $scope.addresses = $scope.user.addresses;
            $scope.userName = $scope.user.username;
        } else {
            $location.path("/#/");
        }
    });

    // Lists
    $scope.order = {
        "number": Math.floor((Math.random()*6)+1),
        "status": { name: "New", description: "Dit is een nieuwe order!!!",  creationDate: null, modificationDate: null },
        user: $scope.userName,
        rules: JSON.parse(localStorage.getItem('myOrderRules')),
        invoiceAddress: null,
        shipmentAddress: null,
        vatPercentage: 21
    };

    $scope.shipmentTypes = [{ id: "Home", description: "Laten bezorgen thuis of op een ander adres" }, { id: "PostNL", description: "Afhalen bij een ophaalpunt bij u in de buurt" }];
    $scope.paymentOptions = [{ id: "Acceptgiro", description: "Betaal binnen 30 dagen na het plaatsen van de order."}, { id: "IDeal", description: "Betaal direct met behulp van IDeal." }];
    $scope.banks = [{ id: "ING Bank", name: "ING Bank" }, { id: "ASN Bank", name: "ASN Bank" }];
    console.log($scope.user);

    $scope.SetShipmentType = function (shipmentType) {
        $scope.shipment.shipmentType = shipmentType;
    };

    $scope.SetShipmentAddress = function (index) {
        $scope.order.shipmentAddress = $scope.addresses[index];
    };

    $scope.SetPaymentOption = function (paymentOption) {
        $scope.payment.paymentOption = paymentOption;
    };

    $scope.SetPaymentAddress = function (index) {
        $scope.order.invoiceAddress = $scope.addresses[index];
    };

    $scope.save = function (cookieName) {
        dbService.orders.save($scope.order, function (res) {
            console.log(res.err);
            alert('Er is iets fout gegaan, de order is niet opgeslagen!');
        });
    };

    // Proceed to payment
    $scope.ProceedToPayment = function () {
        console.debug($scope.order);
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
            $scope.save();
            $location.path("/orders/payment/");
        }
    };

    // Proceed to confirmation
    $scope.ProceedToConfirmation = function () {
        console.log(localStorage.getItem('myOrderRules'));
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
            $location.path("/orders/confirmation/");
        }
    };
}