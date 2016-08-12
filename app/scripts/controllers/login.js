'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('LoginCtrl', function ($scope, coinomiaService) {
    $scope.sigin = true;
    $scope.login = function() {
      var loginData = {
        'username': $scope.username,
        'password': $scope.password,
        'grant_type':'password'
      };

      coinomiaService.login(loginData, function(res) {
        console.log(res);
      });
    };
  });
