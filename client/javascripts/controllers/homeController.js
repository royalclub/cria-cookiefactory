/*jslint node: true */
/*globals cookieFactory */

/**
 * Controller for Home
 * @param $scope
 * @param $routeParams
 * @param $location
 * @constructor
 */

function homeController($scope, $routeParams, $location) {
    "use strict";

    $location.path("/cookies/design");
}