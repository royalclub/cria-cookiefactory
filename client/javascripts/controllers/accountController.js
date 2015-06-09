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
cookieFactory.controller('accountController', function ($scope, $routeParams, $location, authenticationService) {
    "use strict";

    authenticationService.getUser(function (loggedIn, loggedInUser) {
        if (!loggedIn) {
            $scope.showLoginForm = true;
            $scope.showWelcomeText = false;
        } else {
            $scope.account = loggedInUser;
            $scope.showLoginForm = false;
            $scope.showWelcomeText = true;
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
function accountDetailController($scope, $routeParams, $location, authenticationService) {
    "use strict";

    authenticationService.getUser(function (loggedIn, loggedInUser) {
        if (!loggedIn) {
            $location.path('/cookies/design');
        } else {
            $scope.account = loggedInUser;
            $scope.updateAddress = function (adressId) {
                $location.path("/account/address/edit/" + adressId);
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

/**
 * Controller responsible for handling logout requests.
 */
function accountLogoutController($scope, $routeParams, $location, dbService) {
    "use strict";

    dbService.signout.signout({}, function () {
        window.location.href = '/#/cookies/design';
    });
}