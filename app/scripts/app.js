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
    'ngStorage',
    'ncy-angular-breadcrumb'
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
          var authToken = $localStorage.token || $cookies.get('token');
          if(config.url.indexOf('oauth2/token') < 0) {
            config.headers.authorization = 'Bearer ' + authToken;
          }
          $rootScope.signin = false;
        }
        return config;
      },
    };
  })
  .run(function ($rootScope, $state, coinomiaService, $timeout, $localStorage) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !coinomiaService.isAuthenticated()) {
        $state.go('login');
        event.preventDefault();
      }
      var refreshTokenParams = {
        'grant_type': 'refresh_token',
        'refresh_token': $localStorage.refresh_token
      }
      // Get Expiry Time
      var refreshTime = coinomiaService.getExpiryTime();
      if(refreshTime > 0) {
        $timeout(function() {
          // Get Refresh Token Service
          coinomiaService.getRefreshToken(refreshTokenParams).then(function(res) {
            if(res.status === 200) {
              console.log('>>>>> Token Generated');
            }
          });
        }, refreshTime);
      }
    });
  });
