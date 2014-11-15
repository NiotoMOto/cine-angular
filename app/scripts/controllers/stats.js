'use strict';
/**
 * @ngdoc function
 * @name cineApp.controller:StatsCtrl
 * @description
 * # StatsCtrl
 * Controller of the cineApp
 */
angular.module('cineApp').controller('StatsCtrl', function($scope, restService) {
    var userRess = restService.getRessource('user');
    var noteUserRess = restService.getRessource('user', 'note');

    function getUsers() {
        userRess.query({
            includes: 'views'
        }).$promise.then(function(data) {
            $scope.users = data;
            angular.forEach($scope.users, function(user, key) {
                noteUserRess.calcul({
                    id: user.id
                }).$promise.then(function(data) {
                    $scope.users[key].notes = data;
                });
            });
        });
    }
    getUsers();
});