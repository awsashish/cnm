'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('LoginCtrl', function ($scope, $cookieStore, coinomiaService) {
    $scope.sigin = true;
    $scope.login = function() {
      var loginData = {
        'username': $scope.username,
        'password': $scope.password,
        'grant_type':'password'
      };

      coinomiaService.login(loginData, function(res) {
        if(res.status === 200){
          $cookieStore.put('token', res.data.access_token);
          console.log('Login Succesfully');
        }
      });
    };
  });
