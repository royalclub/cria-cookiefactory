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
function addressController($scope, $routeParams, $location, usersService) {
    "use strict";

    // GET 1 cookie
    usersService.users.get({_id: '556c2223802620c40b9c97a6'}, function (user) {
        var index;
        $scope.user = user.doc;
        for (index = 0; index < user.doc.addresses.length; index++) {
            if (user.doc.addresses[index]._id === $routeParams._id) {
                $scope.address = user.doc.addresses[index];
            }
        }
    });

    // CREATE, UPDATE cookie
    $scope.save = function (account, address) {
        var index;
        if (address && address._id !== undefined) {
            console.log('Entering update');
            for (index = 0; index < account.addresses.length - 1; index++) {
                if (account.addresses[index]._id === $routeParams._id) {
                    account.addresses[index] = address;
                }
            }
            usersService.users.update({_id: '556c2223802620c40b9c97a6'}, account, function (res) {
                $location.path("/account");
            });
        }
    };
}