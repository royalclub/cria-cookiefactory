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
function accountController($scope, $routeParams, $location, usersService) {
    "use strict";

    // GET 1 cookie
    usersService.users.get({_id: '556c2223802620c40b9c97a6'}, function (user) {
        $scope.account = user.doc;
    });

    // CREATE, UPDATE cookie
    $scope.save = function (account) {
        if (account && account._id !== undefined) {
            console.log('Entering update');
            usersService.users.update({_id: '556c2223802620c40b9c97a6'}, account, function (res) {
                $location.path("/account");
            });
        }
    };
}