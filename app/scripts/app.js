'use strict';

/**
 * @ngdoc overview
 * @name coinomiaFrontendApp
 * @description
 * # coinomiaFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('coinomiaFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ui.router',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');
      $httpProvider.interceptors.push('authInterceptor');
  })
  .factory('authInterceptor', function ($rootScope, $q, $cookies, $window, $localStorage) {
    return {
      // Add authorization token to headers
      request: function (config) {
        $rootScope.signin = true;
        config.headers = config.headers || {};
        if ($cookies.get('token') || $localStorage.token) {
        //config.headers.authorization = 'Bearer ' + $cookieStore.get('token');
          $rootScope.signin = false;
        }
        return config;
      },
    };
  });
