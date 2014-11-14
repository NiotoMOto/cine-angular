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
    $scope.identity = angular.identity;
    $scope.movies = [];
    $scope.toggled = true;
    $scope.genres = [];
    $scope.genres.selecteds = [];
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
        }, 10);
    }

    $scope.resetGenres = function(){
        $scope.genres.selected = [];
    }
    $scope.selectAllGenres = function(){
        $scope.genres.selected = angular.copy($scope.genres);
    }

    function hasGenre(movie) {
        var result = false ;
        angular.forEach(movie.imdbMovie.genres, function(genre) {
            if (_.contains($scope.genres.selected, genre.name)) {
                result =  true;
            }
        });
        return result;
    }
    $scope.filterGenre = function(movie) {
        return hasGenre(movie);
    }
    _.mixin({
        'findByValues': function(collection, property, values) {
            return _.filter(collection, function(item) {
                return _.contains(values, item[property]);
            });
        }
    });

    function getViewsInfo() {
        movieRess.query().$promise.then(function(data) {
            $scope.movies = data;
            // $scope.movies.push(data[0]);
            incraseTotal($scope.movies.length);
            //récupère les avis de l'utilisateur de la page
            angular.forEach($scope.movies, function(m, key) {
                getMovie(m.imdbId).then(function(data) {
                    $scope.genres = _.union($scope.genres, _.map(data.genres, 'name'));
                    $scope.genres.selected = angular.copy($scope.genres);
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