'use strict';

/**
 * @ngdoc function
 * @name cineApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the cineApp
 */
angular.module('cineApp')
  .controller('IndexCtrl', function ($scope, $cookieStore, userService) {
  	$scope.userService = userService;
    	userService.user = $cookieStore.get('user') ;
    	//$scope.user = $cookieStore.get('user');
  });
