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
function addressController($scope, $routeParams, $location, dbService, authenticationService) {
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
        var index;
        if (address && address._id !== undefined) {
            for (index = 0; index < $scope.account.addresses.length; index++) {
                if ($scope.account.addresses[index]._id === address._id) {
                    $scope.account.addresses[index] = address;
                }
            }
            if ($scope.account && $scope.account._id !== undefined) {
                dbService.users.update({_id: $scope.account._id}, $scope.account, function (res) {
                    if (res.err) {
                        console.log(res.err);
                    }
                    $location.path('/account');
                });
            }
        }
    };
}