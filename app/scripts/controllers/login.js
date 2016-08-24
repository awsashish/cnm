'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('LoginCtrl', function ($scope, $cookies, $state, $window, $location, $localStorage, coinomiaService) {
    $scope.sigin = true;
    coinomiaService.Auth();
    $scope.loginError = '';

    // For Testing
    // $scope.username = 'coinomia';
    // $scope.password = 'coinomia';
    // $scope.grant_type = 'password';

    // Login Process
    $scope.submit = function() {

      if($scope.login.$valid){
        var loginData = {
          'username': $scope.username,
          'password': $scope.password,
          'grant_type':'password',
        };

        coinomiaService.login(loginData).then(function(res) {
            var data = res.data;
            if(res.status === 200){
              if($scope.remember === true) {
                $cookies.put('token', data.access_token, {expires:moment().second(data.expires_in).toString()});
              }
              $scope.$storage = $localStorage.$default({token: data.access_token});
              // $window.sessionStorage.setItem('token', data.access_token);
              $state.go( "dashboard" );
            }else{
              $scope.loginError = data.error_description;
            }
        });
      }
    };
  });
