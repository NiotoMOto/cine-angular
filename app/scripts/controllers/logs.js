'use strict';
/**
 * @ngdoc function
 * @name cineApp.controller:LogsCtrl
 * @description
 * # LogsCtrl
 * Controller of the cineApp
 */
angular.module('cineApp').controller('LogsCtrl', function($scope, historyService, restService, $routeParams) {
    var user = $routeParams.id;
    var movie = $routeParams.movie;
    var historyRess = restService.getRessource('historique');
    if (user) {
        historyRess.query({
        	filter : true,
            user: user
        }).$promise.then(function(data) {
            $scope.logs = data;
        })
    } else if (movie) {
        historyRess.query({
        	filter : true,
            movie: movie
        }).$promise.then(function(data) {
            $scope.logs = data;
        })
    } else {
        historyService.getAll().then(function(data) {
            $scope.logs = data;
        });
    }
});