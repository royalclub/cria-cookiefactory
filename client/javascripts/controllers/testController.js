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

    // GET 1 cookie
    if ($routeParams._id === undefined) {
        $scope.layers = [
            {
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
            },
            {
                name: "Vorm",
                required: true,
                sequence: 1,
                options: [{
                    name: "Rond",
                    sequence: 1,
                    description: null,
                    price: 2.3,
                    imageSrc: "images/cookies.jpg"
                }, {
                    name: "Vierkant",
                    sequence: 2,
                    description: null,
                    price: 2.5,
                    imageSrc: "images/cookies.jpg"
                }]
            }
        ];

        $scope.currentLayer = {
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
            },{
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
            },
            {
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
            },
            {
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
            },
            {
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
            },
            {
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
            },]
        };

        var optionsTotal = 0.0;

        for(var i = 0; i <  $scope.currentLayer.options.length; i+=1) {
            optionsTotal +=  $scope.currentLayer.options[i].price;
        }

        $scope.total = optionsTotal;
    }

    // DELETE cookie
    $scope.delete = function () {
        usersService.users.delete({_id: $routeParams._id});
        $location.path("/users");
    };

    // CREATE, UPDATE cookie
    $scope.save = function () {

        if ($scope.users.doc && $scope.users.doc._id !== undefined) {
            console.log('Entering update');
            usersService.users.update({_id: $routeParams._id}, $scope.users.doc, function (res) {
                console.log(res);
            });
        } else {
            console.log('Entering save');
            usersService.users.save({}, $scope.users.doc, function (res) {
                console.log(res);
            });
        }
    };

}