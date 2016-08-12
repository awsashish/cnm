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
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
      $httpProvider.interceptors.push('authInterceptor');
  })
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore) {
    return {
      // Add authorization token to headers
      request: function (config) {
        $rootScope.signin = true;
        config.headers = config.headers || {};
      //  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        if ($cookieStore.get('token')) {
          config.headers.authorization = 'Bearer ' + $cookieStore.get('token');
          $rootScope.signin = false;
        }
        return config;
      },
    };
  });
