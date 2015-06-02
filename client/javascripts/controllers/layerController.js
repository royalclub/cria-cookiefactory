/*jslint node: true */
/*globals cookieFactory */

/**
 * TODO: create controller for layer list
 * @param $scope
 * @param layersService
 * @constructor
 */
function layerListController($scope, layersService) {
    "use strict";
    // GET all layers
    $scope.layers = layersService.layers.get();
}

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
        layersService.layers.get({_id: $routeParams._id}, function (layer) {
            $scope.layers = layer.doc;
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