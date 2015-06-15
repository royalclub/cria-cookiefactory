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

function orderController($scope, $routeParams, $location, orderService, $cookieStore, authenticationService, usersService, dbService, messageService) {
    "use strict";
    var text;

    $scope.shipment = { shipmentDate: new Date(), shipmentType: null };
    $scope.payment = { paymentOption: "IDeal", bank: "", paid: 0 };
    $scope.user = {};

    authenticationService.getUser(function (loggedIn, loggedInUser) {
        if (loggedIn) {
            $scope.user = loggedInUser;
            $scope.addresses = $scope.user.addresses;
            $scope.userName = $scope.user.username;
            $scope.order.user = [{username: $scope.user.username, emailAddress: $scope.user.emailAddress, firstName: $scope.user.firstName, inserts: 1, lastName: $scope.user.lastName}];
        } else {
            text = 'U moet eerst inloggen voordat u verder kan gaan.';
            messageService.setMessage(text, 'danger');
            $location.path("/cart");
        }
    });
    // Lists
    $scope.order = {
        "number": Math.floor((Math.random() * 99999999) + 1),
        "status": [{ name: "New", description: "Dit is een nieuwe order!!!"}],
        rules: JSON.parse(localStorage.getItem('myOrderRules')),
        invoiceAddress: [],
        shipmentAddress: [],
        vatPercentage: 21
    };

    $scope.shipmentTypes = [{ id: "Home", description: "Thuis bezorgen of op een ander adres" }, { id: "PostNL", description: "Afhalen bij een ophaalpunt bij u in de buurt" }];
    $scope.paymentOptions = [{ id: "Acceptgiro", description: "Betaal binnen 30 dagen na het plaatsen van de order."}, { id: "IDeal", description: "Betaal direct met behulp van IDeal." }];
    $scope.banks = [{ id: "ING", name: "ING" },
                    { id: "Rabobank", name: "Rabobank" },
                    { id: "ABN Amro Bank", name: "ABN Amro Bank" },
                    { id: "SNS Bank", name: "SNS Bank" },
                    { id: "ASN Bank", name: "ASN Bank" },
                    { id: "Triodos Bank", name: "Triodos Ban" },
                    { id: "RegioBank", name: "RegioBank" },
                    { id: "Van Lanschot Bankiers", name: "Van Lanschot Bankiers" },
                    { id: "Knab", name: "Knab" }];

    $scope.SetShipmentType = function (shipmentType) {
        $scope.shipment.shipmentType = shipmentType;
    };

    $scope.SetShipmentAddress = function (index) {
        $scope.order.shipmentAddress = [$scope.addresses[index]];
    };

    $scope.SetPaymentOption = function (paymentOption) {
        $scope.payment.paymentOption = paymentOption;
    };

    $scope.SetPaymentAddress = function (index) {
        $scope.order.invoiceAddress = [$scope.addresses[index]];
    };

    $scope.save = function (cookieName) {
        dbService.orders.save($scope.order, function (res) {
            if (res.err) {
                console.log(res.err);
                alert("De order is niet opgeslagen!");
            }
        });
    };

    // Proceed to payment
    $scope.ProceedToPayment = function () {
        console.debug($scope.order);
        if (!$scope.userName) {
            alert("U bent niet ingelogd.");
        } else if (!$scope.shipment.shipmentType) {
            alert("U heeft nog geen verzend wijze gekozen.");
        } else if (!$scope.order.shipmentAddress) {
            alert('Er is nog geen verzendadres bekend.');
        } else if ($scope.order.rules.length === 0) {
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