/*jslint node: true */
/*globals cookieFactory */

/**
 * Controller for Cookies
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param cookiesService
 * @constructor
 */
var cookieFactory = angular.module('cookieFactory',[]);

cookieFactory.controller('menuController', function ($scope, $routeParams) {
    "use strict";
    console.log($routeParams);
    $scope.menuItems = [
        {name: "Home", url: "/#/", active: "active"},
        {name: "Over ons", url: "/#/about", active: ""},
        {name: "Ontwerp koekje", url: "/#/cookies/design", active: ""},
        {name: "Contact", url: "/#/contact", active: ""}
    ];
    $scope.breadcrumb = [
        {name: "Cookie Factory", url: "/#/", active: "active"},
        {name: "Over ons", url: "/#/about", active: "active"}
    ];
    $scope.activePage = "Home";
    $scope.SetActivePage = function(menuItemName){
        $scope.activePage = menuItemName;
        console.log($scope.activePage);
    }
});