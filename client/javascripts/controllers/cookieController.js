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
        l = 0,
        storageCookieName = 'cookies',
        storageEditCookieName = 'editCookie';

    $scope.cookieName = null;           // The name of the cookie.
    $scope.selectedLayers = [];         // Object that will be saved in the database.
    $scope.currentLayer = {};           // Currently selected layer for the editor.
    $scope.currentLayerOption = {};     // Currently selected layer option.
    $scope.editCookieIndex = -1;

    /**
     * Get the index of a collection, assuming the 'name' property of the item exists.
     * @param {array} collection    The collection to loop through.
     * @param {any} item    The item to look for inside the collection.
     */
    $scope.getIndexByName = function (collection, item) {
        var idx = -1;

        for (idx = 0; idx < collection.length; idx += 1) {
            if (collection[idx].name === item.name) {
                return idx;
            }
        }
        return -1;
    };

    /**
     * Get the index of the $scope.layers
     * @param {Layer}   The Layer object to find.
     */
    $scope.getLayerIndex = function (layer) {
        return $scope.getIndexByName($scope.layers, layer);
    };

    /**
     * Gets the index of the currently selected layer in the selectedLayers property.
     * @param {Layer} currentLayer  The layer that is currently selected.
     */
    $scope.getCurrentLayerIndex = function (currentLayer) {
        return $scope.getIndexByName($scope.selectedLayers, currentLayer);
    };

    /**
     * Set the currentLayerOption based on the current layer.
     */
    $scope.updateCurrentLayerOption = function () {
        var currentLayerIdx = -1;

        currentLayerIdx = $scope.getCurrentLayerIndex($scope.currentLayer);

        if (currentLayerIdx >= 0 && currentLayerIdx < $scope.selectedLayers.length) {
            $scope.currentLayerOption = $scope.selectedLayers[currentLayerIdx].options[0];
        } else {
            $scope.currentLayerOption = null;
        }
    };

    $scope.initialize = function () {
        var orderRule;

        $scope.editCookieIndex = localStorage.getItem(storageEditCookieName);
        if ($scope.editCookieIndex !== null) {
            orderRule = JSON.parse(localStorage.getItem(storageCookieName))[$scope.editCookieIndex];
            $scope.cookieName = orderRule.cookie[0].name;
            $scope.selectedLayers = orderRule.cookie[0].layers;
            $scope.currentLayer = $scope.layers[0];
            localStorage.removeItem(storageEditCookieName);
        } else {
            $scope.selectedLayers = [];
            $scope.currentLayer = $scope.layers[0];
        }
        $scope.updateCurrentLayerOption();
        $scope.calculateCookiePrice();
    };

    /**
     * Creates the final cookie object
     * @constructor
     * @param cookieName
     */
    function getCookie(cookieName) {
        return {
            box: [{
                name: 'Standaard',
                description: 'Standaard verpakking',
                capacity: 1,
                imageSrc: 'img/box.png'
            }],
            amountOfBoxes: 1,
            cookie: [{
                "name": cookieName,
                "creator": $scope.userName,
                "layers": $scope.selectedLayers,
                "creationDate": new Date(),
                "modificationDate": new Date()
            }]
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

    dbService.layers.get(function (layers) {
        $scope.layers = layers.doc;
        $scope.total = 0.0;
        $scope.initialize();
    });

    /**
     * LayerOption change based on the selected layer
     * @constructor
     * @param _id
     * @param $event
     */
    $scope.onLayerClicked = function (_id, $event) {
        $event.preventDefault();
        for (l = 0; l < $scope.layers.length; l += 1) {
            if ($scope.layers[l]._id === _id) {
                $scope.currentLayer = $scope.layers[l];
                break;
            }
        }
        $scope.updateCurrentLayerOption();
    };

    /**
     * Fills the cookie with the selected layer and layeroption
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
            },
            layerIdx = -1;

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
        $scope.calculateCookiePrice();

        // Automatically select the next layer.
        layerIdx = $scope.getLayerIndex($scope.currentLayer);
        if (layerIdx < $scope.layers.length - 1) {
            $scope.currentLayer = $scope.layers[layerIdx + 1];
        }
        $scope.updateCurrentLayerOption();
    };

    $scope.calculateCookiePrice = function () {
        optionsTotal = 0;
        for (i = 0; i < $scope.selectedLayers.length; i += 1) {
            optionsTotal += $scope.selectedLayers[i].options[0].price;
        }
        $scope.total = optionsTotal;
    };

    $scope.validateCookie = function (cookieName) {
        if (!cookieName) {
            throw 'De naam van het koekje is niet ingevuld.';
        }
        if ($scope.selectedLayers.length !== $scope.layers.length) {
            throw 'Niet alle lagen zijn gekozen.';
        }
    };

    /**
     * Execute when user want to go to the cart
     * @constructor
     * @param cookieName
     * @param $event
     */
    $scope.onProceedClicked = function (cookieName, $event) {
        var cookie, storage;
        $event.preventDefault();

        try {
            $scope.validateCookie(cookieName);
        } catch (ex) {
            messageService.setMessage(ex, 'danger');
            return;
        }

        cookie = getCookie(cookieName);
        storage = JSON.parse(localStorage.getItem(storageCookieName));
        if ($scope.editCookieIndex !== null) { // apparently we're editing an existing cookie, so let's update it now.
            storage[$scope.editCookieIndex] = cookie;
            localStorage.setItem(storageCookieName, JSON.stringify(storage));
        } else {
            if (!storage) { // first cookie in localStorage.
                localStorage.setItem(storageCookieName, JSON.stringify([cookie]));
            } else {
                storage.push(cookie);
                localStorage.setItem(storageCookieName, JSON.stringify(storage));
            }
        }

        $location.path("/cart");
    };

    /**
     * Saves the data to the database
     * @constructor
     * @param cookieName
     */
    $scope.save = function (cookieName) {
        var cookie = getCookie(cookieName);
        dbService.cookies.save(cookie.cookie[0], function (res) {
            if (res.err) {
                console.log(res.err);
                messageService.setMessage('Er is iets fout gegaan, koekje is niet opgeslagen!', 'danger');
            } else {
                messageService.setMessage('Het koekje is opgeslagen.', 'success');
                $location.path("/cookies/list");
            }
        });
    };
});

/**
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param authenticationService
 * @param dbService
 * @constructor
 */
cookieFactory.controller('cookieListController', function ($scope, $routeParams, $location, authenticationService, dbService, messageService) {
    "use strict";

    authenticationService.getUser(function (loggedIn, loggedInUser) {
        if (loggedIn) {
            $scope.account = loggedInUser;
        } else {
            $location.path("/cookies/design");
        }

        dbService.cookies.get({}, function (cookies) {
            $scope.cookies = cookies.doc;
        });

        $scope.edit = function (event, id) {
            event.preventDefault();
            messageService.setMessage("Deze functionaliteit is nog in aanbouw.", "warning");
            console.warn("TODO!");
        };

        $scope.delete = function (event, id) {
            var deletableCookie = null;
            event.preventDefault();

            deletableCookie = $scope.getCookieById(id);

            if (deletableCookie === null) {
                messageService.setMessage("U probeert een ongeldig koekje te verwijderen.", "danger");
                return;
            }

            if ($scope.account === null || deletableCookie.creator !== $scope.account.username) {
                messageService.setMessage("Dit koekje kan alleen verwijderd worden door de eigenaar!", "danger");
                return;
            }

            dbService.cookies.remove({_id: deletableCookie._id}, function (res) {
                if (!res.err && res.doc.n === 1 && res.doc.ok === 1) {
                    messageService.setMessage("Het koekje is verwijderd.", "success");
                } else {
                    messageService.setMessage("Het koekje kon niet verwijderd worden.", "danger");
                    console.error(res.err);
                }
                $scope.cookies.splice($scope.getCookieIndexById(id), 1);
            });
        };

        $scope.getCookieById = function (id) {
            var cookieIdx = 0;
            for (cookieIdx = 0; cookieIdx < $scope.cookies.length; cookieIdx += 1) {
                if ($scope.cookies[cookieIdx]._id === id) {
                    return $scope.cookies[cookieIdx];
                }
            }

            return null;
        };

        $scope.getCookieIndexById = function (id) {
            var cookieIdx = 0;
            for (cookieIdx = 0; cookieIdx < $scope.cookies.length; cookieIdx += 1) {
                if ($scope.cookies[cookieIdx]._id === id) {
                    return cookieIdx;
                }
            }

            return -1;
        };
    });
});