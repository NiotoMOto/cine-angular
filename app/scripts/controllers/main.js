'use strict';

/**
 * @ngdoc function
 * @name cineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cineApp
 */
angular.module('cineApp')
  .controller('MainCtrl', function ($scope, restService, userService, $location, $cookieStore) {
  	var userRess = restService.getRessource('user');
  	userRess.query().$promise.then(function(data){
  		$scope.users = data;
  	});

	$scope.enter = function(){
		userService.user = $scope.user;
    $cookieStore.put('user',$scope.user);
		$location.path('/home');
	};
  	
  });

