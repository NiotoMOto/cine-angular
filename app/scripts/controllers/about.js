'use strict';

/**
 * @ngdoc function
 * @name cineApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the cineApp
 */
angular.module('cineApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
