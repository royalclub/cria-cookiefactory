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
function accountEditController($scope, $routeParams, $location, authenticationService, dbService, accountService, messageService) {
    "use strict";

    authenticationService.getUser(function (loggedIn, loggedInUser) {
        if (!loggedIn) {
            $location.path('/cookies/design');
        } else {
            $scope.account = loggedInUser;

            $scope.validateAccount = function () {
                if (!$scope.account.username) {
                    throw 'De gebruikersnaam is niet ingevuld';
                }
                if (!$scope.account.firstName) {
                    throw 'De voornaam is niet ingevuld.';
                }
                if (!$scope.account.lastName) {
                    throw 'De achternaam is niet ingevuld.';
                }
                if (!$scope.account.emailAddress) {
                    throw 'De email adres is niet ingevuld.';
                }
            };

            $scope.update = function () {
                try {
                    $scope.validateAccount();
                    if ($scope.account && $scope.account._id !== undefined) {
                        dbService.users.update({_id: $scope.account._id}, $scope.account, function (res) {
                            if (res.err) {
                                console(res.err.errors);
                            } else {
                                $location.path('/account');
                            }
                        });
                    }
                } catch (ex) {
                    messageService.setMessage(ex, 'danger');
                    return;
                }
            };
        }
    });
}