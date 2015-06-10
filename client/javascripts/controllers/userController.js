/*jslint node: true */
/*globals cookieFactory */

/**
 * TODO: create controller for user list
 * @param $scope
 * @param dbService
 * @constructor
 */
function userListController($scope, dbService) {
    "use strict";
    // GET all layers
    $scope.users = dbService.users.get();
}

/**
 * Controller for User
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param dbService
 * @constructor
 */
function userController($scope, $routeParams, $location, dbService) {
    "use strict";

    // GET 1 cookie
    if ($routeParams._id !== 'new') {
        $scope.users = dbService.users.get({_id: $routeParams._id}, function () {
            console.log('$scope.requests ', $scope.requests);
        });
    }

    // DELETE cookie
    $scope.delete = function () {
        dbService.users.delete({_id: $routeParams._id});
        $location.path("/users");
    };

    // CREATE, UPDATE cookie
    $scope.save = function () {

        if ($scope.users.doc && $scope.users.doc._id !== undefined) {
            console.log('Entering update');
            dbService.users.update({_id: $routeParams._id}, $scope.users.doc, function (res) {
                console.log(res);
            });
        } else {
            console.log('Entering save');
            dbService.users.save({}, $scope.users.doc, function (res) {
                console.log(res);
            });
        }
    };

}