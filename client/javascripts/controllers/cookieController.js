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


function cookieController($scope, $routeParams, $location, dbService) {
    "use strict";

    // GET 1 cookie
    if ($routeParams._id !== 'new') {
        $scope.cookies = dbService.cookies.get({_id: $routeParams._id}, function () {
            console.log('$scope.requests ', $scope.requests);
        });
    }

    // DELETE cookie
    $scope.delete = function () {
        dbService.cookies.delete({_id: $routeParams._id});
        $location.path("/cookies");
    };

    // CREATE, UPDATE cookie
    $scope.save = function () {
        if ($scope.cookies.doc && $scope.cookies.doc._id !== undefined) {
            console.log('Entering update');
            dbService.cookies.update({_id: $routeParams._id}, $scope.cookies.doc, function (res) {
                console.log(res);
            });
        } else {
            console.log('Entering save');
            dbService.cookies.save({}, $scope.cookies.doc, function (res) {
                console.log(res);
            });
        }
    };
}

/**
 * TODO: create controller for design a cookie
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param authenticationService
 * @param cookies
 * @param dbService
 * @constructor
 */
cookieFactory.controller('cookieDesignController', function ($scope, $routeParams, $location, authenticationService, cookies, dbService) {
    "use strict";

    var optionsTotal = 0.0,
        i = 0,
        l = 0;
    $scope.cookieName = null;
    $scope.selectedLayers = [];

    authenticationService.getUser(function (loggedIn, loggedInUser) {
        if (loggedIn) {
            $scope.userName = loggedInUser.username;
            $scope.showSaveButton = true;
        }
    });

    if ($routeParams._id === undefined) {
        dbService.layers.get(function (layers) {
            $scope.layers = layers.doc;
            $scope.currentLayer = layers.doc[0];
            $scope.total = 0;
        });

        $scope.onLayerClicked = function (_id, $event) {
            $event.preventDefault();
            for (l = 0; l < $scope.layers.length; l += 1) {
                if ($scope.layers[l]._id === _id) {
                    $scope.currentLayer = $scope.layers[l];
                }
            }
        };

        $scope.onLayerOptionClicked = function (option, $event) {
            $event.preventDefault();
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
            optionsTotal = 0;
            for (i = 0; i < $scope.selectedLayers.length; i += 1) {
                optionsTotal += $scope.selectedLayers[i].options.price;
            }
            $scope.total = optionsTotal;
        };

        $scope.onProceedClicked = function (cookieName, $event) {
            $event.preventDefault();
            if (!cookieName) {
                alert('De naam van het koekje is ingevuld!');
            } else if ($scope.selectedLayers < 4) {
                alert('1 of meerder layers zijn niet geslecteerd!');
            } else {
                var cookie = getCookie(cookieName);
                cookies.add(cookie);
                document.cookie = 'key=' + JSON.stringify([cookie]);
                $location.path("/cart");
            }
        };

        $scope.save = function (cookieName) {
            var cookie = getCookie(cookieName);
            console.log('Entering save');
            dbService.cookies.save(cookie, function (res) {
                console.log(res.err);
            });
        };
        
        function getCookie(cookieName){
            return {
                    "name" : cookieName,
                    "creator" : $scope.userName,
                    "layers" : $scope.selectedLayers
                };
        }
    }
});