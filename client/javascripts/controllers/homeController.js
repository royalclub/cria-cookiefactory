/*jslint node: true */
/*globals cookieFactory */

/**
 * Controller for Home
 * @param $scope
 * @param $routeParams
 * @param $location
 * @constructor
 */

function cookieController($scope, $routeParams, $location) {
    "use strict";

    $location.path("/cookies/design");
}