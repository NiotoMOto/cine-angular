'use strict';
/**
 * @ngdoc overview
 * @name cineApp
 * @description
 * # cineApp
 *
 * Main module of the application.
 */
angular.module('cineApp', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ui.select', 'ui.bootstrap', 'highcharts-ng', 'ngDraggable', 'xeditable', 'angular-loading-bar', 'checklist-model', 'iso-3166-country-codes']).config(function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    }).when('/addMovie', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    }).when('/movie/:id', {
        templateUrl: 'views/movie.html',
        controller: 'MovieCtrl'
    }).when('/user/:id', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
    }).when('/user/:id/:cat', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
    }).when('/historique/:id', {
        templateUrl: 'views/historique.html',
        controller: 'HistoriqueCtrl'
    }).when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl'
    }).when('/movies/genre/:genre', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl'
    }).when('/stats/user', {
        templateUrl: 'views/stats.html',
        controller: 'StatsCtrl'
    }).when('/logs', {
        templateUrl: 'views/logs.html',
        controller: 'LogsCtrl'
    }).when('/logs/user/:user', {
        templateUrl: 'views/logs.html',
        controller: 'LogsCtrl'
    }).when('/logs/movie/:movie', {
        templateUrl: 'views/logs.html',
        controller: 'LogsCtrl'
    }).when('/stats/movie', {
        templateUrl: 'views/stats/movie.html',
        controller: 'StatsMovieCtrl'
    }).when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    }).when('/searchResult', {
        templateUrl: 'views/searchresult.html',
        controller: 'SearchresultCtrl'
    }).otherwise({
        redirectTo: '/',
        controller: 'LoginCtrl'
    });
}).
run(function($rootScope, $location, userService, editableOptions, $cookieStore) {
    userService.user = $cookieStore.get('user');
    editableOptions.theme = 'bs3';
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.container = 'container';
        if (_.isUndefined(userService.user)) {
            $location.path('/');
        }
    });
});