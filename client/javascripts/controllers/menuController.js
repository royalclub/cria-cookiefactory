/*jslint node: true */
/*globals cookieFactory, angular*/

/**
 * Controller for the menu
 * @param $scope
 * @constructor
 */
//var cookieFactory = angular.module('cookieFactory', []);
var activePage = 0;

cookieFactory.controller('menuController', function ($scope, $routeParams) {
    "use strict";
    $scope.menuItems = [
        {name: "Ontwerp koekje", url: "/#/cookies/design", active: ""},
        {name: "Overzicht", url: "/#/cookies/list", active: ""},
        {name: "Over ons", url: "/#/about", active: ""},
        {name: "Contact", url: "/#/contact", active: ""}
    ];

    $scope.SetActivePage = function (index) {
        activePage = index;
    };

    $scope.IsActive = function (name) {
        if (name === $scope.menuItems[activePage].name) {
            return "active";
        }
        return "";
    };
});