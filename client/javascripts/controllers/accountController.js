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
        console.log($scope.account);
    });
        // CREATE, UPDATE cookie
        /*$scope.save = function (account) {
            if (account && account._id !== undefined) {
                console.log('Entering update');
                accountService.users.update({ _id: account._id }, account, function (res) {
                    $location.path("/account");
                });
            }
        };*/
});

function accountController($scope, $routeParams, $location, accountService) {
    "use strict";
    accountService.users.get({}, function (user) {
        $scope.account = user;
    });
}