'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('LoginCtrl', function ($scope, $cookies, $state, $window, $location, coinomiaService) {
    $scope.sigin = true;
    coinomiaService.Auth();
    $scope.loginError = '';
    $scope.login = function() {
      var loginData = {
        'username': $scope.username,
        'password': $scope.password,
        'grant_type':'password',
      };

      coinomiaService.login(loginData, function(res) {
          var data = res.data;
          if(res.status == 200){
            if($scope.remember == true) {
              $cookies.put('token', data.access_token, {expires:moment().second(data.expires_in).toString()});
            }
            $window.sessionStorage.setItem('token', data.access_token);
            $state.go( "dashboard" );
          }
      }, function(err) {
          $scope.loginError = err.data.error_description;
      });
    };
  });
