'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('MainCtrl', function ($scope, $cookies, $state, $window) {
    $scope.validateUser = function() {
      if($cookies.get('token') || $window.sessionStorage.getItem('token')) {
        $state.go( "dashboard" );
      } else {
        $state.go("login");
      }
    };
    $scope.validateUser();
  });
