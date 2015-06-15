/*jslint node: true */
/*global cookieFactory, accountService, usersService, authenticationService, dbService */

/**
 * Controller for Account
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param usersService
 * @constructor
 */
cookieFactory.controller('accountController', function ($scope, $routeParams, $location, authenticationService, dbService) {
    "use strict";

    authenticationService.getUser(function (loggedIn, loggedInUser) {
        if (!loggedIn) {
            $scope.showLoginForm = true;
            $scope.showWelcomeText = false;
        } else {
            $scope.account = loggedInUser;
            $scope.showLoginForm = false;
            $scope.showWelcomeText = true;

            //responsible for handling logout requests.
            $scope.logout = function () {
                dbService.signout.signout({}, function () {
                    location.reload();
                    $location.path($location.$$path);
                });
            };
        }
    });
});

/**
 * Controller responsible for handling the account edit.
 */
function accountRegisterController($scope, $routeParams, $location, authenticationService, dbService) {
    "use strict";

    authenticationService.getUser(function (loggedIn, loggedInUser) {
        if (loggedIn) {
            $location.path('/cookies/design');
        } else {
            $scope.save = function (user) {
                dbService.account.register(user, function () {
                    $location.path("/cookies/design");
                });
            };
        }
    });
}

/**
 * Controller responsible for handling the account edit.
 */
function accountDetailController($scope, $routeParams, $location, authenticationService, dbService, locationService) {
    "use strict";

    authenticationService.getUser(function (loggedIn, loggedInUser) {
        if (!loggedIn) {
            $location.path('/cookies/design');
        } else {
            $scope.account = loggedInUser;
            $scope.onUpdateAddressClicked = function (adressId) {
                $location.path("/account/address/edit/" + adressId);
            };
            $scope.onRemoveAddressClicked = function (index) {
                $scope.account.addresses.splice(index, 1);
                if ($scope.account && $scope.account._id !== undefined) {
                    dbService.users.update({_id: $scope.account._id}, $scope.account, function (res) {
                        if (res.err) {
                            console.log(res.err);
                        }
                        $location.path('/account');
                    });
                }
            };

            $scope.addAddress = function () {
                locationService.latestLocation = $location.$$path;
                $location.path("/account/address/add");
            };
        }
    });
}


/**
 * Controller responsible for handling the account edit.
 */
function accountEditController($scope, $routeParams, $location, authenticationService, dbService, accountService) {
    "use strict";

    authenticationService.getUser(function (loggedIn, loggedInUser) {
        if (!loggedIn) {
            $location.path('/cookies/design');
        } else {
            $scope.account = loggedInUser;
            $scope.update = function (account) {
                if (account && account._id !== undefined) {
                    dbService.users.update({_id: account._id}, account, function (res) {
                        console.log(res);
                        $location.path('/account');
                    });
                }
            };
        }
    });
}