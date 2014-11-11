'use strict';
/**
 * @ngdoc function
 * @name cineApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the cineApp
 */
angular.module('cineApp').controller('UserCtrl', function($scope, $routeParams, $rootScope, userService, imdbService, restService, $interval, $location) {
    var id = $routeParams.id;
    var viewMovieRess = restService.getRessource('viewMovie');
    var imdbMovieRessource = imdbService.getRessource('movie');
    var userRess = restService.getRessource('user');
    $scope.init = function() {
    	$rootScope.animation = 'slide';
        $scope.totalMovies = 0;
        getViewsInfo();
        getUser();
    };
    $scope.goTo = function(dir) {
		var index = _.findIndex($scope.users, {'id' : $scope.user.id}) ;
		$rootScope.sensAnimated = dir;
        switch (dir) {
            case 'next':
            	index ++;
	            if(index >= $scope.totalUser){
	            	index = 0;	
	            }
	            $location.path('/user/'+ $scope.users[index].id);
                break;
            case 'prev':
            	index --;
            	if(index < 0){
	            	index = $scope.totalUser-1;		
	            }
	            $location.path('/user/'+ $scope.users[index].id);
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
        });
        userRess.query().$promise.then(function(data) {
            $scope.totalUser = data.length;
            $scope.users = data;
        });
    }

    function incraseTotal(total) {
        $scope.totalMovies = 0 ;
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

    function getMovie(id) {
        return imdbMovieRessource.get({
            id: id
        }).$promise;
    }

    $scope.updateList = function(){
         getViewsInfo()
    }
    function getViewsInfo() {
        viewMovieRess.query({
            filter: true,
            user: id
        }).$promise.then(function(data) {
            $scope.viewMovies = data;
            incraseTotal(data.length);
            angular.forEach($scope.viewMovies, function(viewMovie, key) {
                getMovie(viewMovie.Movie.imdbId).then(function(data) {
                    $scope.viewMovies[key].imdbMovie = data;
                });
            });
        });
    }
    $scope.init();
});