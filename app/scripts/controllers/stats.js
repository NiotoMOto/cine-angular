'use strict';
/**
 * @ngdoc function
 * @name cineApp.controller:StatsCtrl
 * @description
 * # StatsCtrl
 * Controller of the cineApp
 */
angular.module('cineApp').controller('StatsCtrl', function($scope, restService, $rootScope) {
    var userRess = restService.getRessource('user');
    var noteUserRess = restService.getRessource('user', 'note');
    $rootScope.container = 'container-fluid';
    $scope.highchartsNotes = {
        series: [],
        xAxis: {
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        },
        options: {
            chart: {
                type: 'column'
            }
        },
        title: {
            text: 'Notes'
        },
        loading: true
    };
    $scope.highchartsCritique = {
        series: [{
            type: 'pie',
            name: 'Caractères',
            data: []
        }],
        options: {
            chart: {
                type: 'pie'
            }
        },
        title: {
            text: 'Critiques'
        },
        loading: true
    };

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
                    console.log(data.commSize);
                    $scope.highchartsCritique.series[0].data.push([
                        $scope.users[key].username,
                        data.commSize,
                    ]);
                    console.log($scope.highchartsCritique.series);
                    console.log($scope.highchartsNotes.series);
                    $scope.highchartsNotes.series.push({
                        name: $scope.users[key].username,
                        data: data.noteTab
                    });
                    $scope.highchartsNotes.loading = false;
                    $scope.highchartsCritique.loading = false;
                });
            });
        });
    }
    getUsers();
});