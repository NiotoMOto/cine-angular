'use strict';
/**
 * @ngdoc function
 * @name cineApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the cineApp
 */
angular.module('cineApp').controller('IndexCtrl', function($scope, $cookieStore, userService, $location) {
    $scope.userService = userService;
    userService.user = $cookieStore.get('user');
    $scope.isActive = function(name) {
            var regex;
            if (name === '/') {
                regex = new RegExp('[\/]$', 'g');
            } else {
                regex = new RegExp('^[\/]' + name+'s?', 'g');
            }
            return ($location.path().match(regex));
        }
        //$scope.user = $cookieStore.get('user');
});