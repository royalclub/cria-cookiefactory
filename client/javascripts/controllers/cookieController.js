/*jslint node: true */
/*globals cookieFactory, alert */

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
    $scope.cookieName = null;
    $scope.selectedLayers = [];

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
            for (l = 0; l < $scope.layers.length; l += 1) {
                if ($scope.layers[l]._id === _id) {
                    $scope.currentLayer = $scope.layers[l];
                }
            }
            $event.preventDefault();
        };

        $scope.onLayerOptionClicked = function (option, $event) {
            var layer = {
                    "name" : $scope.currentLayer.name,
                    "required" : $scope.currentLayer.required,
                    "sequence" : $scope.currentLayer.sequence,
                    "options" : option
                };

            function layerNotExists() {
                for (l = 0; l < $scope.selectedLayers.length; l += 1) {
                    if ($scope.selectedLayers[l].name === $scope.currentLayer.name) {
                        $scope.selectedLayers[l].options = option;
                        return false;
                    }
                }
                return true;
            }

            if ($scope.selectedLayers.length === 0) {
                $scope.selectedLayers.push(layer);
            } else {
                if (layerNotExists()) {
                    $scope.selectedLayers.push(layer);
                }
            }
            console.log("layer option clicked: " + option.name);
            $event.preventDefault();
        };

        $scope.onProceedClicked = function (cookieName, $event) {
            if (cookieName === undefined) {
                alert('De naam van het koekje is ingevuld!');
            } else if ($scope.selectedLayers < 4) {
                alert('1 of meerder layers zijn niet geslecteerd!');
            } else {
                document.cookie = 'key=' + JSON.stringify([{
                    "name" : cookieName,
                    "creator" : "henkdesteen",
                    "layers" : $scope.selectedLayers
                }]);
                $location.path("/cart");
            }
            $event.preventDefault();
        };
    }
}