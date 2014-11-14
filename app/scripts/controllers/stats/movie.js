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
    var noteMovieRess = restService.getRessource('movie', 'note');
    movieRess.query().$promise.then(function(data) {
        $scope.movies = data;
        //récupère les avis de l'utilisateur de la page
        angular.forEach($scope.movies, function(m, key) {
            noteMovieRess.calcul({
                id: m.id
            }).$promise.then(function(note) {
                $scope.movies[key].notes = note;
            });
        });
    })
});