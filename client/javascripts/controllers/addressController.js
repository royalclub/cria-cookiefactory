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

    // GET 1 address
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

    $scope.validateAddress = function () {
        if (!$scope.address.street) {
            throw 'De straatnaam is niet ingevuld';
        }
        if (!$scope.address.streetNumber) {
            throw 'De huisnummer is niet ingevuld.';
        }
        if (!$scope.address.zipCode) {
            throw 'De postcode is niet ingevuld.';
        }
        if (!$scope.address.city) {
            throw 'De plaatsnaam is niet ingevuld.';
        }
    };

    // UPDATE address
    $scope.save = function () {
        var index;
        try {
            $scope.validateAddress();
            if ($scope.address && $scope.address._id !== undefined) {
                for (index = 0; index < $scope.account.addresses.length; index++) {
                    if ($scope.account.addresses[index]._id === $scope.address._id) {
                        $scope.account.addresses[index] = $scope.address;
                    }
                }
                if ($scope.account && $scope.account._id !== undefined) {
                    dbService.users.update({_id: $scope.account._id}, $scope.account, function (res) {
                        if (res.err) {
                            console.log(res.err);
                        } else {
                            $location.path('/account');
                        }
                    });
                }
            } else if ($scope.address && $scope.address._id === undefined) {
                $scope.account.addresses.push($scope.address);
                if ($scope.account && $scope.account._id !== undefined) {
                    dbService.users.update({_id: $scope.account._id}, $scope.account, function (res) {
                        if (res.err) {
                            $scope.account.addresses.splice($scope.account.addresses.length - 1, 1);
                            console.log(res.err);
                        } else {
                            $location.path(locationService.latestLocation);
                        }
                    });
                }
            }
        } catch (ex) {
            messageService.setMessage(ex, 'danger');
            return;
        }
    };
}