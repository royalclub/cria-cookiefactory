/* jshint ignore:start */

/**
 * Controller for User
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param usersService
 * @constructor
 */
function testController($scope, $routeParams, $location, usersService) {
    "use strict";

    var optionsTotal = 0.0, i = 0, l = 0;

    // GET 1 cookie
    if ($routeParams._id === undefined) {
        $scope.layers = [{
            _id: 2,
            name: "Deeg",
            required: true,
            sequence: 1,
            options: [{
                name: "Zanddeeg",
                sequence: 1,
                description: "Zanddeeg heeft een kruimelige structuur en breekt makkelijk.",
                price: 2.3,
                imageSrc: "images/cookies.jpg"
            }, {
                name: "Cakebeslag",
                sequence: 2,
                description: "Cakebeslag is een semi-vloeibaar deeg voornamelijk gebruikt voor het bakken van cakes. Het geeft een zacht en luchtig gebak.",
                price: 2.5,
                imageSrc: "images/cookies.jpg"
            }]
        }, {
            _id: 1,
            name: "Vorm",
            required: true,
            sequence: 1,
            options: [{
                name: "Zanddeeg",
                sequence: 1,
                description: "Zanddeeg heeft een kruimelige structuur en breekt makkelijk.",
                price: 2.3,
                imageSrc: "images/cookies.jpg"
            }, {
                name: "Cakebeslag",
                sequence: 2,
                description: "Cakebeslag is een semi-vloeibaar deeg voornamelijk gebruikt voor het bakken van cakes. Het geeft een zacht en luchtig gebak.",
                price: 2.5,
                imageSrc: "images/cookies.jpg"
            }, {
                name: "Zanddeeg",
                sequence: 1,
                description: "Zanddeeg heeft een kruimelige structuur en breekt makkelijk.",
                price: 2.3,
                imageSrc: "images/cookies.jpg"
            }, {
                name: "Cakebeslag",
                sequence: 2,
                description: "Cakebeslag is een semi-vloeibaar deeg voornamelijk gebruikt voor het bakken van cakes. Het geeft een zacht en luchtig gebak.",
                price: 2.5,
                imageSrc: "images/cookies.jpg"
            }, {
                name: "Zanddeeg",
                sequence: 1,
                description: "Zanddeeg heeft een kruimelige structuur en breekt makkelijk.",
                price: 2.3,
                imageSrc: "images/cookies.jpg"
            }, {
                name: "Cakebeslag",
                sequence: 2,
                description: "Cakebeslag is een semi-vloeibaar deeg voornamelijk gebruikt voor het bakken van cakes. Het geeft een zacht en luchtig gebak.",
                price: 2.5,
                imageSrc: "images/cookies.jpg"
            }, {
                name: "Zanddeeg",
                sequence: 1,
                description: "Zanddeeg heeft een kruimelige structuur en breekt makkelijk.",
                price: 2.3,
                imageSrc: "images/cookies.jpg"
            }, {
                name: "Cakebeslag",
                sequence: 2,
                description: "Cakebeslag is een semi-vloeibaar deeg voornamelijk gebruikt voor het bakken van cakes. Het geeft een zacht en luchtig gebak.",
                price: 2.5,
                imageSrc: "images/cookies.jpg"
            }, {
                name: "Zanddeeg",
                sequence: 1,
                description: "Zanddeeg heeft een kruimelige structuur en breekt makkelijk.",
                price: 2.3,
                imageSrc: "images/cookies.jpg"
            }, {
                name: "Cakebeslag",
                sequence: 2,
                description: "Cakebeslag is een semi-vloeibaar deeg voornamelijk gebruikt voor het bakken van cakes. Het geeft een zacht en luchtig gebak.",
                price: 2.5,
                imageSrc: "images/cookies.jpg"
            }, {
                name: "Zanddeeg",
                sequence: 1,
                description: "Zanddeeg heeft een kruimelige structuur en breekt makkelijk.",
                price: 2.3,
                imageSrc: "images/cookies.jpg"
            }, {
                name: "Cakebeslag",
                sequence: 2,
                description: "Cakebeslag is een semi-vloeibaar deeg voornamelijk gebruikt voor het bakken van cakes. Het geeft een zacht en luchtig gebak.",
                price: 2.5,
                imageSrc: "images/cookies.jpg"
            }]
        }];

        //$scope.layers = layersService.layers.get();

        $scope.currentLayer = $scope.layers[0];

        for (i = 0; i < $scope.currentLayer.options.length; i += 1) {
            optionsTotal += $scope.currentLayer.options[i].price;
        }

        $scope.total = optionsTotal;

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
/* jshint ignore:end */