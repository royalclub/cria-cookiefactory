/*jslint node: true */
/*globals cookieFactory */

/**
 * Controller for layer
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param layersService
 * @constructor
 */
function layerController($scope, $routeParams, $location, layersService) {
    "use strict";
    // GET 1 cookie

    if ($routeParams._id !== 'new') {
        $scope.layers = layersService.layers.get({_id: $routeParams._id}, function () {
            console.log('$scope.requests ', $scope.requests);
        });
    }

    // DELETE cookie
    $scope.delete = function () {
        layersService.layers.delete({_id: $routeParams._id});
        $location.path("/layers");
    };

    // CREATE, UPDATE cookie
    $scope.save = function () {

        if ($scope.layers.doc && $scope.layers.doc._id !== undefined) {
            console.log('Entering update');
            layersService.layers.update({_id: $routeParams._id}, $scope.layers.doc, function (res) {
                console.log(res);
            });
        } else {
            console.log('Entering save');
            layersService.layers.save({}, $scope.layers.doc, function (res) {
                console.log(res);
            });
        }
    };

}
