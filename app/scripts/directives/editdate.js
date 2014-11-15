'use strict';
/**
 * @ngdoc directive
 * @name cineApp.directive:editDate
 * @description
 * # editDate
 */
angular.module('cineApp').directive('editDate', function() {
    return {
        templateUrl: 'views/template/editDate.html',
        restrict: 'C',
        scope: {
            updateMethod: '&',
            field: '='
        },
        controller: function($scope) {
            $scope.openDatePicker = function() {
                $scope.opened = true;
            };
        },
        link: function postLink(scope) {
            scope.$watch('field', function(newval) {
                if (newval) {
                    scope.updateMethod();
                }
            });
        }
    };
});