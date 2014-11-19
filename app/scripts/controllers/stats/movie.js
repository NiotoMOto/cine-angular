'use strict';
/**
 * @ngdoc function
 * @name cineApp.controller:StatsMovieCtrl
 * @description
 * # StatsMovieCtrl
 * Controller of the cineApp
 */
angular.module('cineApp').controller('StatsMovieCtrl', function($scope, restService) {
    var movieRess = restService.getRessource('movie');
    var noteMovieRess = restService.getRessource('movies', 'rank');
    noteMovieRess.calcul().$promise.then(function(data) {
        $scope.movies = data.elements;
        console.log(data);
    })
});