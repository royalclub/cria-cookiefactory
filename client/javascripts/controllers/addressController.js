/*jslint node: true */
/*globals cookieFactory */

/**
 * Controller for User
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param dbService
 * @constructor
 */
function addressController($scope, $routeParams, $location, dbService, authenticationService, messageService, locationService) {
    "use strict";

    // GET 1 user
    authenticationService.getUser(function (loggedIn, loggedInUser) {
        if (!loggedIn) {
            $scope.showLoginForm = true;
            $scope.showWelcomeText = false;
        } else {
            var index;
            $scope.account = loggedInUser;
            for (index = 0; index < $scope.account.addresses.length; index++) {
                if ($scope.account.addresses[index]._id === $routeParams._id) {
                    $scope.address = $scope.account.addresses[index];
                }
            }
        }
    });

    // UPDATE user
    $scope.save = function (address) {
        var index, text;
        if (address && address._id !== undefined) {
            for (index = 0; index < $scope.account.addresses.length; index++) {
                if ($scope.account.addresses[index]._id === address._id) {
                    $scope.account.addresses[index] = address;
                }
            }
            if ($scope.account && $scope.account._id !== undefined) {
                dbService.users.update({_id: $scope.account._id}, $scope.account, function (res) {
                    if (res.err) {
                        text = 'Niet alles is ingevuld of goed ingevuld!.';
                        messageService.setMessage(text, 'danger');
                        console.log(res.err);
                    } else {
                        $location.path(locationService.latestLocation);
                    }
                });
            }
        } else if (address && address._id === undefined) {
            console.log($scope.account.addresses);
            $scope.account.addresses.push(address);
            console.log($scope.account.addresses);
            if ($scope.account && $scope.account._id !== undefined) {
                dbService.users.update({_id: $scope.account._id}, $scope.account, function (res) {
                    if (res.err) {
                        text = 'Niet alles is ingevuld of goed ingevuld!.';
                        messageService.setMessage(text, 'danger');
                        $scope.account.addresses.splice($scope.account.addresses.length - 1, 1);
                        console.log(res.err);
                    } else {
                        $location.path(locationService.latestLocation);
                    }
                });
            }
        }
    };
}