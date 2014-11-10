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
        controller: function($scope, $element) {
            $scope.openDatePicker = function() {
                $scope.opened = true;
            };
        },
        link: function postLink(scope, element, attrs) {
            scope.$watch('field', function(newval, oldvalue) {
                if (newval) {
                    scope.updateMethod();
                }
            });
        }
    };
});