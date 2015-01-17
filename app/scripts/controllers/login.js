'use strict';
/**
 * @ngdoc function
 * @name cineApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the cineApp
 */
angular.module('cineApp').controller('LoginCtrl', function(userService, $cookieStore, $scope, $location, restService, $rootScope) {
    var userRess = restService.getRessource('user');
    $rootScope.pageTitle = 'Login';
    $scope.enter = function() {
        userService.user = $scope.user;
        $cookieStore.put('user', $scope.user);
        $location.path('/home');
    };
    userRess.query().$promise.then(function(data) {
        $scope.users = data;
    });
});