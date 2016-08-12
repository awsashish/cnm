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
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'validation',

  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
      //$locationProvider.html5Mode('true');
      //$locationProvider.hashPrefix('!');
      $httpProvider.interceptors.push('authInterceptor');
  })
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.authorization = 'Bearer ' + $cookieStore.get('token');
          $rootScope.signin = false;
        }
        return config;
      },
    };
  });
