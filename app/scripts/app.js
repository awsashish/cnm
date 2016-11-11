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
    'ui.bootstrap',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ncy-angular-breadcrumb',
    'ngCountryStateSelect',
    'ngclipboard',
    'timer',
    'ngImgCrop',
    'ngExcel',
    'textAngular',
    'angular.filter'
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
        // $rootScope.$broadcast('getRefreshToken');
        config.headers = config.headers || {};
        if ($cookies.get('token') || $localStorage.token) {
          var authToken = $localStorage.token || $cookies.get('token');
          if(config.url.indexOf('oauth2/token') < 0 && config.url.indexOf('json/') < 0 && config.url.indexOf('utilities/verify-sponsor') < 0) {
            config.headers.authorization = 'Bearer ' + authToken;
          }
          $rootScope.signin = false;
        }
        return config;
      },
      responseError: function(response) {
        // If token got expired
        if (response.status === 401) {
          $rootScope.$broadcast('getRefreshToken');
        }
        return $q.reject(response);
      }
    };
  })
  .run(function ($rootScope, $state, $location, $window, coinomiaService, UtilsService, $timeout, $localStorage) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !coinomiaService.isAuthenticated()) {
        if($location.search().return_url){
          $state.go('login',{return_url:$window.btoa($location.search().return_url)});
        }else{
          $state.go('login');
        }
        event.preventDefault();
      }
    });
  });
