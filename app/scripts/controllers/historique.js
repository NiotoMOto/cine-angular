'use strict';
/**
 * @ngdoc function
 * @name cineApp.controller:HistoriqueCtrl
 * @description
 * # HistoriqueCtrl
 * Controller of the cineApp
 */
angular.module('cineApp').controller('HistoriqueCtrl', function($scope, $routeParams, userService,$rootScope, imdbService, restService, $location) {
	var id = $routeParams.id;
    var imdbMovieRessource = imdbService.getRessource('movie');
    var movieRess = restService.getRessource('movie');
    var noteMovieRess = restService.getRessource('movie','note');
    var viewMovieRess = restService.getRessource('viewMovie');
    var userRess = restService.getRessource('user');
    $scope.currentUser = userService.user
    $scope.dates = [];
    $scope.init = function() {
    	getUser();
    }



    $scope.goTo = function(dir) {
        var index = _.findIndex($scope.users, {
            'id': $scope.user.id
        });
        $rootScope.sensAnimated = dir;
        switch (dir) {
            case 'next':
                index++;
                if (index >= $scope.totalUser) {
                    index = 0;
                }
                $location.path('/historique/' + $scope.users[index].id);
                break;
            case 'prev':
                index--;
                if (index < 0) {
                    index = $scope.totalUser - 1;
                }
                $location.path('/historique/' + $scope.users[index].id);
                break;
            default:
                break;
        }
    };

    function getUser() {
        userRess.get({
            id: id
        }).$promise.then(function(data) {
            $scope.user = data;
            getViewsInfo();
        });
        userRess.query().$promise.then(function(data) {
            $scope.totalUser = data.length;
            $scope.users = data;
        });
    }

    function getMovie(id) {
        return imdbMovieRessource.get({
            id: id
        }).$promise;
    }

    function getViewsUser(movie) {
        var filter = true;
        return viewMovieRess.query({
            filter: true,
            movie: movie.id
        }).$promise;
    }
    
    function getViewsInfo() {
        viewMovieRess.query({
            filter: true,
            user: $scope.user.id
        }).$promise.then(function(data) {
            $scope.viewMovies = data;

            //récupère les avis de l'utilisateur de la page
            angular.forEach($scope.viewMovies, function(viewMovie, key) {
                getMovie(viewMovie.Movie.imdbId).then(function(data) {
                    $scope.viewMovies[key].imdbMovie = data;
                });
                if(viewMovie.date){
                    $scope.dates.push(viewMovie.date);
                }
                noteMovieRess.calcul({id : viewMovie.Movie.id}).$promise.then(function(note){
                    $scope.viewMovies[key].notes = note;
                });
            });
        }).then(function() {
            //récupère les avis des autres utisateurs pour chaque film de l'utilisateur de la page
            angular.forEach($scope.viewMovies, function(view, key) {
                getViewsUser(view.Movie).then(function(viewUsers) {
                    $scope.viewMovies[key].viewMovieAll = viewUsers;
                });
            });
        });
    };
});