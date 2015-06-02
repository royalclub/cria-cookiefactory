/*jslint node: true */
/*globals cookieFactory */

/**
 * Controller for User
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param usersService
 * @constructor
 */

cookieFactory.controller('accountController', function ($scope, $routeParams, $location, accountService) {
    "use strict";
    accountService.users.get({}, function (user) {
        $scope.account = user;
        
        if (user === undefined || user === null) {
            $scope.showLoginForm = true;
            $scope.showWelcomeText = false;
        } else {
            $scope.showLoginForm = false;
            $scope.showWelcomeText = true;
        }
    });
});

function accountController($scope, $routeParams, $location, accountService) {
    "use strict";
    accountService.users.get({}, function (user) {
        $scope.account = user;
    });
}