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
    var userRess = restService.getRessource('user');
    $scope.template = {};
    $scope.template.route = $routeParams.cat;
    $scope.init = function() {
        $rootScope.animation = 'slide';
        $scope.totalMovies = 0;
        getUser();
        switch ($scope.template.route) {
            case 'films':
                $scope.template.url = 'views/usertemplate.html';
                break;
            case 'logs':
                $scope.template.url = 'views/logs.html';
                break;
            case 'historique':
                $scope.template.url = 'views/historique.html';
                break;
            case 'stats':
                $scope.template.url = 'views/stats.html';
                break;
            default:
                $scope.template.route = 'films';
                $scope.template.url = 'views/usertemplate.html';
        }
    };
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
                $location.path('/user/' + $scope.users[index].id + '/' + $scope.template.route);
                break;
            case 'prev':
                index--;
                if (index < 0) {
                    index = $scope.totalUser - 1;
                }
                $location.path('/user/' + $scope.users[index].id + '/' + $scope.template.route);
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
            $rootScope.pageTitle = data.username;
        });
        userRess.query().$promise.then(function(data) {
            $scope.totalUser = data.length;
            $scope.users = data;
        });
    }
    $scope.init();
});