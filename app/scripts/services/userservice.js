'use strict';

/**
 * @ngdoc service
 * @name cineApp.userService
 * @description
 * # userService
 * Service in the cineApp.
 */
angular.module('cineApp')
  .factory('userService', function userService($cookieStore) {
  	var user = null ;
    return{
    	save: function(user){
  			this.user = user;
    	},
    	user : $cookieStore.get('user')
    };
  });
