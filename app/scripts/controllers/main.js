'use strict';
/**
 * @ngdoc function
 * @name cineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cineApp
 */
angular.module('cineApp').controller('MainCtrl', function($scope, restService, userService, $location, $cookieStore, $rootScope, imdbService) {
    var userRess = restService.getRessource('user');
    var moviesRess = restService.getRessource('movie');
    var viewMovieRess = restService.getRessource('viewMovie');
    var imdbMovieRessource = imdbService.getRessource('movie');
    $scope.viewOptions = {};
    $scope.viewOptions.createdAt = true;
    $rootScope.container = 'container-fluid';
    userRess.query().$promise.then(function(data) {
        $scope.users = data;
    });
    moviesRess.query().$promise.then(function(data) {
        $scope.movies = data;
    });
    $scope.enter = function() {
        userService.user = $scope.user;
        $cookieStore.put('user', $scope.user);
        $location.path('/home');
    };

    function getMovie(id) {
        return imdbMovieRessource.get({
            id: id
        }).$promise;
    }
    $scope.updateList = function() {
        getViewsInfo();
    };

    function getViewsInfo() {
        viewMovieRess.query({
            limit: 10,
            group : 'MovieId',
            order : 'Movie.createdAt DESC'
        }).$promise.then(function(data) {
            $scope.viewMovies = data;
            angular.forEach($scope.viewMovies, function(viewMovie, key) {
                getMovie(viewMovie.Movie.imdbId).then(function(data) {
                    $scope.viewMovies[key].imdbMovie = data;
                });
            });
        });
    }
    getViewsInfo();
});