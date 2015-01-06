'use strict';

/**
 * @ngdoc service
 * @name cineApp.historyService
 * @description
 * # historyService
 * Service in the cineApp.
 */
angular.module('cineApp')
  .factory('historyService', function historyService(restService) {
  	var historyRess = restService.getRessource('historique');
    return {
    	add : function(message, type, user, movie){
    		var historique = {};
    		historique.message = message;
    		historique.type = type;
    		historyRess.save({historique: historique, user: user, movie : movie});

    	},
    	getAll: function(){
    		return historyRess.query().$promise;
    	}
    };
  });
