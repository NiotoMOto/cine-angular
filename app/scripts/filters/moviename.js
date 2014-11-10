'use strict';

/**
 * @ngdoc filter
 * @name cineApp.filter:movieName
 * @function
 * @description
 * # movieName
 * Filter in the cineApp.
 */
angular.module('cineApp')
  .filter('movieName', function (imdbService) {
    return function (input) {
    	var movieRess = imdbService.getRessource('movie');
    	movieRess.get({id : input}).$promise.then(function(data){
    		return  data ;		
    	});
      
    };
  });
