'use strict';
/**
 * @ngdoc function
 * @name cineApp.controller:MovieCtrl
 * @description
 * # MovieCtrl
 * Controller of the cineApp
 */
angular.module('cineApp').controller('MovieCtrl', function($scope, $routeParams, $rootScope, userService, imdbService, restService, $location) {
    var movieRess = restService.getRessource('movie');
    var viewMoviesRess = restService.getRessource('viewMovie');
    var viewMovieRess = restService.getRessource('viewMovie');
    var imdbMovieRessource = imdbService.getRessource('movie');
    var noteMovieRess = restService.getRessource('movie', 'note');
    var userRess = restService.getRessource('user');
    $scope.user = userService.user;
    var user = userService.user;
    var id = $routeParams.id;
    $scope.isCollapsed = true;
    $scope.userNot = [];
    $scope.viewMovies = [];
    $scope.users = [];
    $scope.init = function() {
        getMovie();
        updateMoyenne();
        movieRess.query().$promise.then(function(data) {
            $scope.movies = data;
            $scope.totalUser = data.length;
        });
    };
    $scope.onDrag = function() {
        $scope.draged = true;
    };
    $scope.onDrop = function(data) {
        addView(data);
    };
    $scope.onDragStop = function() {
        $scope.draged = false;
    };
    $scope.deleteView = function(view) {
        viewMovieRess.remove({
            id: view.id
        }).$promise.then(function() {
            toastr.error('Suppression réussie');
            getMovie();
        });
    }
    $scope.goTo = function(dir) {
        var index = _.findIndex($scope.movies, {
            'id': $scope.movie.id
        });
        switch (dir) {
            case 'next':
                index++;
                if (index >= $scope.totalUser) {
                    index = 0;
                }
                $location.path('/movie/' + $scope.movies[index].id);
                break;
            case 'prev':
                index--;
                if (index < 0) {
                    index = $scope.totalUser - 1;
                }
                $location.path('/movie/' + $scope.movies[index].id);
                break;
            default:
                break;
        }
    };

    function getUsers() {
        $scope.userNot = [];
        userRess.query().$promise.then(function(data) {
            $scope.users = data;
            $scope.users.forEach(function(u) {
                if (!_.contains(_.map(_.map($scope.viewMovies, 'User'), 'id'), u.id)) {
                    $scope.userNot.push(u);
                }
            });
        });
    }

    function addView(user) {
        var viewMovie = {};
        viewMoviesRess.save({
            viewMovie: viewMovie,
            movie: $scope.movie,
            user: user
        }).$promise.then(function() {
            toastr.success('Avis enregistré');
            //$scope.userNot = _.remove($scope.userNot, function(_user) { return _user.id == user.id; });
            getViewsInfo();
        });
    }

    function updateMoyenne() {
        noteMovieRess.calcul({
            id: id
        }).$promise.then(function(data) {
            $scope.movie.notes = data;
            console.log(data);
        });
    }

    function getMovie() {
        movieRess.get({
            id: id
        }).$promise.then(function(data) {
            $scope.movie = data;
            getViewsInfo();
            imdbMovieRessource.get({
                id: data.imdbId
            }).$promise.then(function(data) {
                $scope.idmbMovie = data;
            });
        });
    }
    $scope.updateView = function(view) {
        viewMovieRess.update({
            viewMovie: view
        }).$promise.then(function() {
            toastr.success('Note mise a jour');
            updateMoyenne();
        });
    };

    function getViewsInfo() {
        var filter = true;
        var movie = $scope.movie.id;
        viewMovieRess.query({
            filter: true,
            movie: movie
        }).$promise.then(function(data) {
            $scope.viewMovies = data;
            getUsers();
        });
    }
    $scope.init();
});