/*jslint node: true */
/*globals myApp */


/**
 *
 * @param $scope
 * @param cookiesService
 * @constructor
 */

function CookieListCtrl($scope, cookiesService) {
    "use strict";
    // GET all cookies
    $scope.cookies = cookiesService.cookies.get();
}

/**
 *
 * @param $scope
 * @param $routeParams
 * @param cookiesService
 * @constructor
 */

function CookieDetailCtrl($scope, $routeParams, $location, cookiesService) {
    "use strict";
    // GET 1 cookie

    if ($routeParams._id !== 'new') {
        $scope.cookies = cookiesService.cookies.get({_id: $routeParams._id}, function () {
            console.log('$scope.requests ', $scope.requests);
        });
    }

    // DELETE cookie
    $scope.delete = function () {
        cookiesService.cookies.delete({_id: $routeParams._id});
        $location.path("/cookies");
    };

    // CREATE, UPDATE cookie
    $scope.save = function () {

        if ($scope.cookies.doc && $scope.cookies.doc._id !== undefined) {
            console.log('Entering update');
            cookiesService.cookies.update({_id: $routeParams._id}, $scope.cookies.doc, function (res) {
                console.log(res);
            });
        } else {
            console.log('Entering save');
            cookiesService.cookies.save({}, $scope.cookies.doc, function (res) {
                console.log(res);
            });
        }
    };

}


myApp.controller('myCtrl', function ($scope) {
    "use strict";
    // TODO: bind settings with whoami
    $scope.whomai = "CookieFactory";
});

