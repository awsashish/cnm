'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $cookies, $state, $window, $location, $localStorage, coinomiaService) {
    $scope.sigin = true;
    $scope.loginError = '';

    // Authenticate User
    if(coinomiaService.isAuthenticated()){
      $state.go('dashboard');
    }

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
                $cookies.put('token', data.access_token, {expires:moment().second(data.expires_in).toISOString()});
                $scope.$storage = $localStorage.$default({token: data.access_token, expires:moment().second(data.expires_in).toISOString(), refresh_token:data.refresh_token});
              }
              $scope.$storage = $localStorage.$default({token: data.access_token});
              // $window.sessionStorage.setItem('token', data.access_token);
              if($location.search().return_url){
                var url = atob($location.search().return_url);
                $window.location.href = 'http://'+$location.host()+':9000/#/support?return_url='+url;
              }else{
                $state.go( "dashboard" );
              }
            }else{
              $scope.loginError = data.error_description;
            }
        });
      }
    };
  });
