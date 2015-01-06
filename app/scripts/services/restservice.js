'use strict';
/**
 * @ngdoc service
 * @name cineApp.restService
 * @description
 * # restService
 * Service in the cineApp.
 */
angular.module('cineApp').service('restService', function restService($resource) {
    // var API_URL = 'http://srv.guillemoto.com:8080/api';
    var API_URL = 'http://localhost:8080/api';
    return {
        getRessource: function(shema, control) {
            return $resource(API_URL + '/' + shema + '/:id', {}, {
                'update': {
                    method: 'PUT',
                    transformRequest: function(data) {
                        delete data.$promise;
                        delete data.$resolved;
                        return angular.toJson(data);
                    },
                },
                'get': {
                    method: 'get',
                    interceptor: {
                        response: function(response) {
                            delete response.$promise;
                            delete response.$resolved;
                            return response.data;
                        }
                    }
                },
                'query': {
                    url: API_URL + '/' + shema + 's',
                    method: 'GET',
                    isArray: true
                },
                'calcul': {
                    url: API_URL + '/' + shema + '/:id/' + control,
                    method: 'GET'
                }
            });
        }
    };
});