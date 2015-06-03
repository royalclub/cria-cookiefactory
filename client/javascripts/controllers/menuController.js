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
        {name: "Home", url: "/#/", active: "", breadcrumb: [{name: "Cookie Factory", url: "/#/", active: "active", index: 0}]},
        {name: "Over ons", url: "/#/about", active: "", breadcrumb: [{name: "Cookie Factory", url: "/#/", active: "", index: 0}, {name: "Over ons", url: "/#/about", active: "active", index: 1}]},
        {name: "Ontwerp koekje", url: "/#/cookies/design", active: "", breadcrumb: [{name: "Cookie Factory", url: "/#/", active: "", index: 0}, {name: "Ontwerp Koekje", url: "/#/cookies/design", active: "active", index: 2}]},
        {name: "Contact", url: "/#/contact", active: "", breadcrumb: [{name: "Cookie Factory", url: "/#/", active: "", index: 0}, {name: "Contact", url: "/#/contact", active: "active", index: 3}]}
    ];
    $scope.SetActivePage = function (index) {
        activePage = index;
    };
    $scope.GetBreadcrumb = function () {
        return $scope.menuItems[activePage].breadcrumb;
    };
    $scope.IsActive = function (name) {
        if (name === $scope.menuItems[activePage].name) {
            return "active";
        }
        return "";
    };
});