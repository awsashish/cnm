'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MainCtrl
 * @description
 * # DashboardCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('DashboardCtrl', function ($scope, $window, $cookies, $state, coinomiaService) {
    console.log('DashBoard');
    coinomiaService.Auth();
  });
