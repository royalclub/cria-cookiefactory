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
function userController($scope, $routeParams, $location, usersService) {
    "use strict";

    // GET 1 cookie
    if ($routeParams._id !== 'new') {
        $scope.users = usersService.users.get({_id: $routeParams._id}, function () {
            console.log('$scope.requests ', $scope.requests);
        });
    }

    // DELETE cookie
    $scope.delete = function () {
        usersService.users.delete({_id: $routeParams._id});
        $location.path("/users");
    };

    // CREATE, UPDATE cookie
    $scope.save = function () {

        if ($scope.users.doc && $scope.users.doc._id !== undefined) {
            console.log('Entering update');
            usersService.users.update({_id: $routeParams._id}, $scope.users.doc, function (res) {
                console.log(res);
            });
        } else {
            console.log('Entering save');
            usersService.users.save({}, $scope.users.doc, function (res) {
                console.log(res);
            });
        }
    };

}