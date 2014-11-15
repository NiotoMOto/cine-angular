'use strict';
/**
 * @ngdoc directive
 * @name cineApp.directive:viewMovie
 * @description
 * # viewMovie
 */
angular.module('cineApp').directive('viewMovie', function() {
    return {
        templateUrl: 'views/template/viewmovie.html',
        restrict: 'E',
        scope: {
            updateList: '&',
            view: '=',
            user: '=',
            versionUser: '=',
            versionMovie: '='
        },
        controller: function($scope, restService, historyService) {
            $scope.isCollapsed = true;
            var viewMovieRess = restService.getRessource('viewMovie');
            $scope.updateView = function(view) {
                viewMovieRess.update({
                    viewMovie: view
                }).$promise.then(function() {
                    toastr.success('Note mise a jour');
                    historyService.add('a mis à jour son avis sur', 'update', view.User, view.Movie);
                    $scope.updateList();
                });
            };
            $scope.deleteView = function(view) {
                viewMovieRess.remove({
                    id: view.id
                }).$promise.then(function() {
                    toastr.error('Suppression réussie');
                    historyService.add('a supprimé sont avis sur', 'delete', view.User, view.Movie);
                    $scope.updateList();
                });
            };
        }
    };
});