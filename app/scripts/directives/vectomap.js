'use strict';
/**
 * @ngdoc directive
 * @name cineApp.directive:vectoMap
 * @description
 * # vectoMap
 */
angular.module('cineApp').directive('vectormap', function() {
    return {
        restrict: 'E',
        scope: {
            map: '='
        },
        link: function(scope, element) {
            function test() {
                $(element).vectorMap({
                    map: 'world_mill_en',
                    backgroundColor: 'transparent',
                    regionsSelectable: true,
                    regionsSelectableOne: true,
                    series: {
                        regions: [{
                            values: scope.map.stats,
                            scale: ['#C8EEFF', '#0071A4'],
                            normalizeFunction: 'polynomial'
                        }]
                    },
                    regionStyle: {
                        initial: {
                            fill: '#cccccc'
                        }
                    },
                    onRegionTipShow: function(e, el) {
                        scope.legend = el;
                    },
                    onRegionSelected: function(e, code, isSelected, selectedRegions) {
                        if (isSelected) {
                            scope.map.selectedRegions = selectedRegions;
                        }
                        scope.$apply();
                    }
                });
            }
            scope.$watch('map.stats', function(newValue) {
                if (newValue) {
                    test();
                }
            }, true);
        }
    };
});