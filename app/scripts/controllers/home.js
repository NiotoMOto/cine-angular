'use strict';
/**
 * @ngdoc function
 * @name cineApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the cineApp
 */
angular.module('cineApp').controller('HomeCtrl', function($scope, restService, imdbService, $location, userService, $interval, $rootScope, historyService) {
    var viewMoviesRess = restService.getRessource('viewMovie');
    var moviesRess = restService.getRessource('movie');
    var userRess = restService.getRessource('user');
    var imdbMovieRessource = imdbService.getRessource('search/movie');
    $scope.movie = {};
    $scope.nbMovies = 0;
    $scope.totalMovies = 0;
    $scope.rate = 0;
    var currentUser = userService.user;
    $scope.currentUser = userService.user;
    $scope.highchartsNG = {
        xAxis: {
            categories: ['Vues']
        },
        options: {
            chart: {
                type: 'bar'
            }
        },
        title: {
            text: 'Films vu'
        },
        loading: false
    };
    $scope.init = function() {
        $rootScope.animation = '';
        userRess.query().$promise.then(function(data) {
            $scope.users = data;
            getMovies();
        });
    };

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
    $scope.refreshMovies = function(search) {
        if (search) {
            imdbMovieRessource.query({
                query: search,
                search_type : 'ngram'
            }).$promise.then(function(data) {
                $scope.listMovie = data;
            });
        }
    };
    $scope.isReadonly = false;
    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
    };
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    function resetForm(){
        $scope.rate = 0 ;
        $scope.date = null;
        $scope.movie.movie = null;
    }
    
    $scope.$watch('movie.movie', function(movie){
        if(!$scope.date && $scope.movie.movie){
            $scope.date = movie.release_date;
        }
    })

    function addViewMovie(movie) {
        var viewMovie = {};
        viewMovie.note = $scope.rate;
        viewMovie.prix = $scope.prix;
        viewMovie.date = $scope.date ;
        viewMovie.commentaire = $scope.commentaire;
        var filter = {};
        filter.movie = movie.id;
        return viewMoviesRess.query({
            filter: true,
            movie: movie.id,
            user: currentUser.id
        }).$promise.then(function(data) {
            if (data.length !== 0) {
                viewMovie = data[0];
                viewMovie.note = $scope.rate;
                viewMovie.prix = $scope.prix;
                viewMovie.date = $scope.date;
                if (window.confirm('Vous avez déja noté ce film, mettre a jour ?')) {
                    viewMoviesRess.update({
                        viewMovie: viewMovie
                    }).$promise.then(function(){
                        toastr.success('Avis mis a jour');
                        historyService.add("a mis à jour son avis sur", "update", currentUser, movie);
                        resetForm();
                    });
                }
            } else {
                viewMoviesRess.save({
                    viewMovie: viewMovie,
                    movie: movie,
                    user: currentUser
                }).$promise.then(function() {
                    toastr.success('Avis enregistré');
                    historyService.add("a marqué comme vu", "create", currentUser, movie);
                    getMovies();
                    resetForm();
                });
            }
        });
    }
    $scope.addMovie = function() {
        moviesRess.query({
            query: $scope.movie.movie.id
        }).$promise.then(function(data) {
            //film déja ajouté
            var movie = {};
            if (data.length !== 0) {
                movie = data[0];
                addViewMovie(movie);
            } else {
                movie = {};
                movie.imdbId = $scope.movie.movie.id;
                movie.title = $scope.movie.movie.title;
                moviesRess.save({
                    movie: movie
                }).$promise.then(function(data) {
                    addViewMovie(data);
                    historyService.add("a ajouté le film", "create", currentUser, data);
                    getMovies();
                });
            }
        });
    };
    $scope.refreshChart = function(total) {
        $scope.highchartsNG.series = [];
        var seriesArray = $scope.highchartsNG.series;
        var serie = [];
        seriesArray.push({
            name: 'total',
            data: serie
        });
        angular.forEach($scope.users, function(user) {
            viewMoviesRess.query({
                filter: true,
                user: user.id
            }).$promise.then(function(data) {
                serie = [];
                if (data) {
                    serie.push(data.length);
                    seriesArray.push({
                        name: user.username,
                        data: serie
                    });
                }
            });
        });
        serie.push(total);
    };

    function getMovies() {
        moviesRess.query().$promise.then(function(data) {
            $scope.movies = data;
            incraseTotal($scope.movies.length);
            $scope.refreshChart($scope.movies.length);
        });
    }
    $scope.init();
});