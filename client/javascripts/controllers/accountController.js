/*jslint node: true */
/*global cookieFactory, accountService, usersService, authenticationService */

/**
 * Controller for Account
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param usersService
 * @constructor
 */
cookieFactory.controller('accountController', function ($scope, $routeParams, $location, accountService) {
    "use strict";
    accountService.users.get({}, function (user) {
        $scope.account = user.doc;

        console.log(user);

        if (!user.loggedIn) {
            $scope.showLoginForm = true;
            $scope.showWelcomeText = false;
        } else {
            $scope.showLoginForm = false;
            $scope.showWelcomeText = true;
        }
    });
});

/**
 * Controller responsible for handling the account edit.
 */
function accountDetailController($scope, $routeParams, $location, authenticationService) {
    "use strict";

    authenticationService.isLoggedIn(function (loggedIn) {
        if (!loggedIn) {
            $location.path('/#/');
        } else {
            $scope.account = authenticationService.loggedInUser;
        }
    });
}


/**
 * Controller responsible for handling the account edit.
 */
function accountEditController($scope, $routeParams, $location, authenticationService, usersService, accountService) {
    "use strict";

    authenticationService.isLoggedIn(function (loggedIn) {
        if (!loggedIn) {
            $location.path('/#/');
        } else {
            $scope.account = accountService.loggedInUser;
            $scope.update = function (user) {
                usersService.update(user, function () {
                    $location.path('/#/account');
                });
            };
        }
    });
}

/**
 * Controller responsible for handling logout requests.
 */
function accountLogoutController($scope, $routeParams, $location, accountService) {
    "use strict";

    console.log("accountLogoutController");

    accountService.users.signout({}, function () {
        console.log(".signout() callback");
        $location.path("/");
    });
}