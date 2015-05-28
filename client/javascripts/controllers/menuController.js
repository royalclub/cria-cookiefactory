/*jslint node: true */

/**
 * Controller for the menu
 * @param $scope
 * @constructor
 */
cookieFactory.controller('menuController', function ($scope) {
    "use strict";
    $scope.items = [
        {name: "Home", url: "/#/", active: "active"},
        {name: "Over ons", url: "/#/about", active: ""},
        {name: "Ontwerp koekje", url: "/#/cookies/design", active: ""},
        {name: "Contact", url: "/#/contact", active: ""}
    ];
    $scope.breadcrumb = [
        {name: "Cookie Factory", url: "/#/", active: "active"},
        {name: "Over ons", url: "/#/about", active: "active"}
    ];
});