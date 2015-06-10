/*jslint node: true */
/*globals cookieFactory, alert */

/**
 * Controller for cookie design
 * @constructor
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param authenticationService
 * @param dbService
 */
cookieFactory.controller('cookieDesignController', function ($scope, $routeParams, $location, authenticationService, dbService, messageService) {
    "use strict";

    var optionsTotal = 0.0,
        i = 0,
        l = 0;

    $scope.cookieName = null;           // The name of the cookie.
    $scope.selectedLayers = [];         // Object that will be saved in the database.
    $scope.currentLayer = {};           // Currently selected layer for the editor.

    /**
     * Creates the final cookie object
     * @constructor
     * @param cookieName
     */
    function getCookie(cookieName) {
        return {
            "name" : cookieName,
            "creator" : $scope.userName,
            "layers" : $scope.selectedLayers
        };
    }

    /**
     * Gets the logedin user information
     * @constructor
     * @param loggedIn
     * @param loggedInUser
     */
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

        /**
         * Layertoption change based on the selected layer
         * @constructor
         * @param _id
         * @param $event
         */
        $scope.onLayerClicked = function (_id, $event) {
            $event.preventDefault();
            for (l = 0; l < $scope.layers.length; l += 1) {
                if ($scope.layers[l]._id === _id) {
                    $scope.currentLayer = $scope.layers[l];
                    $scope.currentLayerIndex = l;
                }
            }
        };

        /**
         * Vuls the cookie with the selected layer and layeroption
         * @constructor
         * @param option
         * @param $event
         */
        $scope.onLayerOptionClicked = function (option, $event) {
            $event.preventDefault();
            var layer = {
                    "name" : $scope.currentLayer.name,
                    "required" : $scope.currentLayer.required,
                    "sequence" : $scope.currentLayer.sequence,
                    "imageSrc" : $scope.currentLayer.imageSrc,
                    "options" : [option]
                };

            function layerNotExists() {
                for (l = 0; l < $scope.selectedLayers.length; l += 1) {
                    if ($scope.selectedLayers[l].name === $scope.currentLayer.name) {
                        $scope.selectedLayers[l].options[0] = option;
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
                optionsTotal += $scope.selectedLayers[i].options[0].price;
            }
            $scope.total = optionsTotal;
        };

        /**
         * Execute when user want to go to the cart
         * @constructor
         * @param cookieName
         * @param $event
         */
        $scope.onProceedClicked = function (cookieName, $event) {
            var browserCookieName = 'key', cookie, storage, text;
            $event.preventDefault();
            if (!cookieName) {
                text = 'De naam van het koekje is niet ingevuld!';
                messageService.setMessage(text, 'danger');
            } else if ($scope.selectedLayers.length < 4) {
                text = '1 of meerder layers zijn niet geslecteerd!';
                messageService.setMessage(text, 'danger');
            } else {
                cookie = getCookie(cookieName);
                storage = JSON.parse(localStorage.getItem(browserCookieName));
                if (!storage) {
                    localStorage.setItem(browserCookieName, JSON.stringify([cookie]));
                } else {
                    storage.push(cookie);
                    localStorage.setItem(browserCookieName, JSON.stringify(storage));
                }
                $location.path("/cart");
            }
        };

        /**
         * Saves the data to the database
         * @constructor
         * @param cookieName
         */
        $scope.save = function (cookieName) {
            var cookie = getCookie(cookieName);
            dbService.cookies.save(cookie, function (res) {
                if (res.err) {
                    console.log(res.err);
                    alert('Er is iets fout gegaan, koekje is niet opgeslagen!');
                }
            });
        };
    }
});

/**
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param authenticationService
 * @param dbService
 * @constructor
 */
cookieFactory.controller('cookieListController', function ($scope, $routeParams, $location, authenticationService, dbService) {
    "use strict";

    authenticationService.getUser(function (loggedIn, loggedInUser) {
        if (loggedIn) {
            dbService.cookies.get({ 'creator': loggedInUser.username }, function (cookies) {
                $scope.cookies = cookies.doc;
            });
        } else {
            $location.path("/cookies/design");
        }
    });
});