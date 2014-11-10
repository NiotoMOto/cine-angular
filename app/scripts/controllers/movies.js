'use strict';
/**
 * @ngdoc function
 * @name cineApp.controller:MoviesCtrl
 * @description
 * # MoviesCtrl
 * Controller of the cineApp
 */
angular.module('cineApp').controller('MoviesCtrl', function($scope, restService, imdbService, $interval) {
    var moviesRess = restService.getRessource('movie');
    var imdbMovieRessource = imdbService.getRessource('movie');
    var movieRess = restService.getRessource('movie');
    var noteMovieRess = restService.getRessource('movie', 'note');
    var viewMovieRess = restService.getRessource('viewMovie');
    var userRess = restService.getRessource('user');
    $scope.init = function() {
    	$scope.totalMovies = 0;
        getViewsInfo();
    }

    function getMovie(id) {
        return imdbMovieRessource.get({
            id: id
        }).$promise;
    }

    function incraseTotal(total) {
        var stop = $interval(function() {
            if ($scope.totalMovies < total) {
                $scope.totalMovies++;
            } else {
                if (angular.isDefined(stop)) {
                    $interval.cancel(stop);
                    stop = undefined;
                }
            }
        }, 70);
    }

    function getViewsInfo() {
        movieRess.query().$promise.then(function(data) {
            $scope.movies = data;
            incraseTotal($scope.movies.length);
            
            //récupère les avis de l'utilisateur de la page
            angular.forEach($scope.movies, function(m, key) {
                getMovie(m.imdbId).then(function(data) {
                    $scope.movies[key].imdbMovie = data;
                });
                noteMovieRess.calcul({
                    id: m.id
                }).$promise.then(function(note) {
                    $scope.movies[key].notes = note;
                });
            });
        })
    };
});