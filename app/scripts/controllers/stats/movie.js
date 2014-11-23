'use strict';
/**
 * @ngdoc function
 * @name cineApp.controller:StatsMovieCtrl
 * @description
 * # StatsMovieCtrl
 * Controller of the cineApp
 */
angular.module('cineApp').controller('StatsMovieCtrl', function($scope, restService, $rootScope, imdbService, $q) {
    var movieRess = restService.getRessource('movie');
    var noteMovieRess = restService.getRessource('movies', 'rank');
    var countriesMovieRess = restService.getRessource('movies', 'countries');
    var imdbMovieRessource = imdbService.getRessource('movie');
    $scope.map ={};
    $scope.map.selectedRegions = [];
    $scope.statsLoaded = false;
    $scope.paysStats = {};
    $rootScope.container = 'container-fluid';

    function getMovie(id) {
        return imdbMovieRessource.get({
            id: id
        }).$promise;
    }
    noteMovieRess.calcul({
        order: 'desc',
        limit: '10'
    }).$promise.then(function(data) {
        $scope.movies = data.elements;
    });
    noteMovieRess.calcul({
        order: 'asc',
        limit: '10'
    }).$promise.then(function(data) {
        $scope.moviesworst = data.elements;
    });
    countriesMovieRess.calcul().$promise.then(function(data) {
    	console.log(data);
        $scope.map.stats = data.elements.stats;
        $scope.moviePays = data.elements.movies;
    });

    $scope.$watch('map.selectedRegions',function(newValue){
        if(newValue){
            $scope.selectedRegion = $scope.moviePays[newValue];
        }
    })
    // movieRess.query().$promise.then(function(data) {
    //     var promises = [];
    //     $scope.allMovies = data;
    //     angular.forEach($scope.allMovies, function(movie, key) {
    //         var promise = getMovie(movie.imdbId);
    //         promises.push(promise);
    //         promise.then(function(data) {
    //             angular.forEach(data.production_countries, function(pays, key) {
    //                 if (!$scope.paysStats[pays.iso_3166_1]) {
    //                     $scope.paysStats[pays.iso_3166_1] = 1;
    //                 } else {
    //                     $scope.paysStats[pays.iso_3166_1] = $scope.paysStats[pays.iso_3166_1] + 1;
    //                 }
    //             });
    //         });
    //     });
    //     $q.all(promises).then(function() {
    //         $scope.paysStatsFinal = $scope.paysStats;
    //     })
    // });
});