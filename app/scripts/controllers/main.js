'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('MainCtrl', function ($scope, $rootScope, $cookies, $state, $window, coinomiaService) {
    // Authenticate User
    if(coinomiaService.isAuthenticated){
      $state.go('dashboard');
    }

    $rootScope.$on('getRefreshToken', function() {
      console.log(1);
    });
  });
