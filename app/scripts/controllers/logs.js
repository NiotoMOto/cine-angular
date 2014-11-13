'use strict';

/**
 * @ngdoc function
 * @name cineApp.controller:LogsCtrl
 * @description
 * # LogsCtrl
 * Controller of the cineApp
 */
angular.module('cineApp')
  .controller('LogsCtrl', function ($scope, historyService) {
    historyService.getAll().then(function(data){
    	$scope.logs = data;
    });
  });
