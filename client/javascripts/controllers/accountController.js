/*jslint node: true */
/*globals cookieFactory */

/**
 * Controller for User
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param usersService
 * @constructor
 */
function accountController($scope, $routeParams, $location, usersService) {
    "use strict";

    $scope.account = {
        username: "henkdesteen",
        firstName: "henk",
        inserts: "de",
        lastName: "Steen",
        dateOfBirth: Date.now(),
        emailAddress: "henk@desteen.nl",
        addresses: [{
            _id: 10,
            street: "Rietdekkersveld",
            streetNumber: 40,
            zipCode: "7031DL",
            city: "Wehl"
        }, {
            _id: 20,
            street: "Weversveld",
            streetNumber: 23,
            zipCode: "5862GL",
            city: "Doetinchem"
        }]
    };
}

