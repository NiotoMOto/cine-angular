'use strict';
/**
 * @ngdoc service
 * @name cineApp.imdbService
 * @description
 * # imdbService
 * Service in the cineApp.
 */
angular.module('cineApp').service('imdbService', function imdbService($resource) {
    return {
        getRessource: function(shema) {
            return $resource('https://api.themoviedb.org/3/' + shema + '/:id', {
                api_key: '6c004d34d854c2effb7f697045aea2bd',
                language :'fr'
            }, {
                'query': {
                    method: 'GET',
                    isArray: false
                }
            });
        }
    };
});