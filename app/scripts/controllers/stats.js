'use strict';
/**
 * @ngdoc function
 * @name cineApp.controller:StatsCtrl
 * @description
 * # StatsCtrl
 * Controller of the cineApp
 */
angular.module('cineApp').controller('StatsCtrl', function($scope, restService) {
    var viewMovieRess = restService.getRessource('viewMovie');
    var userRess = restService.getRessource('user');
    var noteUserRess = restService.getRessource('user','note');
    getUsers();

    function getUsers() {
        userRess.query({
            includes: 'views'
        }).$promise.then(function(data) {
            $scope.users = data;
            angular.forEach($scope.users, function(user, key) {
            	noteUserRess.calcul({id : user.id}).$promise.then(function(data){
            		$scope.users[key].notes = data;
            	})
            });
        });
    }

    function getViewsInfo(user) {
        return viewMovieRess.query({
            filter: true,
            user: user.id
        }).$promise;
    }
});