'use strict';

/**
 * @ngdoc overview
 * @name cineApp
 * @description
 * # cineApp
 *
 * Main module of the application.
 */
angular
  .module('cineApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.select',
    'ui.bootstrap',
    'highcharts-ng',
    'ngDraggable',
    'xeditable',
    'ui.bootstrap',
    'angular-loading-bar',
    'checklist-model'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/movie/:id', {
        templateUrl: 'views/movie.html',
        controller: 'MovieCtrl'
      })
      .when('/user/:id', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/historique/:id', {
        templateUrl: 'views/historique.html',
        controller: 'HistoriqueCtrl'
      })
      .when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl'
      })
      .when('/stats/user', {
        templateUrl: 'views/stats.html',
        controller: 'StatsCtrl'
      })
      .when('/logs', {
        templateUrl: 'views/logs.html',
        controller: 'LogsCtrl'
      })
      .when('/stats/movie', {
        templateUrl: 'views/stats/movie.html',
        controller: 'StatsMovieCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).
    run(function($rootScope, $location, userService, editableOptions, $cookieStore) {
      userService.user =  $cookieStore.get('user');
     editableOptions.theme = 'bs3';
    $rootScope.$on( '$routeChangeStart', function() {
      if (userService.user === null) {
          $location.path('/');
      }
    });
  });
