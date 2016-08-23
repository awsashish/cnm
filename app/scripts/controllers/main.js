'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('MainCtrl', function ($scope, $cookies, $state, $window, coinomiaService) {
    coinomiaService.Auth();
  });
