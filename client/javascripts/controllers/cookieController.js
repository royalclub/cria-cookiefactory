/*jslint node: true */
/*globals cookieFactory */

/**
 * TODO: create controller for cookies list
 * @param $scope
 * @param cookiesService
 * @constructor
 */
function layerListController($scope, cookiesService) {
    "use strict";
    // GET all cookies
    $scope.cookies = cookiesService.cookies.get();
}

/**
 * Controller for Cookies
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param cookiesService
 * @constructor
 */

function cookieController($scope, $routeParams, $location, cookiesService) {
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

function cookieDesignController($scope, $routeParams, $location, layersService) {
    "use strict";

    var optionsTotal = 0.0,
        i = 0,
        l = 0;

    if ($routeParams._id === undefined) {
        layersService.layers.get(function (layers) {
            $scope.layers = layers.doc;
            $scope.currentLayer = layers.doc[0];
            for (i = 0; i < $scope.currentLayer.options.length; i += 1) {
                optionsTotal += $scope.currentLayer.options[i].price;
            }
            $scope.total = optionsTotal;
        });

        $scope.onLayerClicked = function (_id, $event) {
            console.log("layer clicked: " + _id);
            for (l = 0; l < $scope.layers.length; l += 1) {
                if ($scope.layers[l]._id === _id) {
                    $scope.currentLayer = $scope.layers[l];
                }
            }
            $event.preventDefault();
        };

        $scope.onLayerOptionClicked = function (name, $event) {
            console.log("layer option clicked: " + name);
            // TODO: Update the layer choice in the cookie.
            $event.preventDefault();
        };

        $scope.onProceedClicked = function ($event) {
            console.log("proceed clicked");
            // TODO: Add cookie to chart or save layer.
            $event.preventDefault();
            $location.path("/cart");
        };
    }
}