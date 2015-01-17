'use strict';
/**
 * @ngdoc function
 * @name cineApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the cineApp
 */
angular.module('cineApp').controller('IndexCtrl', function($scope, $cookieStore, userService, $location, $rootScope, restService) {
    $scope.userService = userService;
    userService.user = $cookieStore.get('user');
    $rootScope.animated = 'animated';
    $scope.movie ={};
    var movieResource = restService.getRessource('movie');
    $scope.refreshMovies = function(search) {
        var requete = {};
        requete.filter = ['title like \'%' + search + '%\''];
        movieResource.search(requete).$promise.then(function(movies) {
            console.log(movies);
            $scope.listMovie = movies.elements;
        });
    };
    $scope.isActive = function(name) {
        var regex;
        if (name === '/') {
            regex = new RegExp('[\/]$', 'g');
        } else {
            regex = new RegExp('^[\/]' + name + 's?', 'g');
        }
        return ($location.path().match(regex));
    };
    $scope.$watch('movie.movie', function(newValue) {
        if (newValue && newValue.id) {
            $location.path('/movie/'+newValue.id);
        }
    });
    $scope.isActiveMenu = function(name) {
        var regex;
        if (name === '/') {
            regex = new RegExp('[\/]$', 'g');
        } else {
            regex = new RegExp('[\/]' + name + '$', 'g');
        }
        return ($location.path().match(regex));
    };
    //$scope.user = $cookieStore.get('user');
});