'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $cookies, $state, $window, $location, $localStorage, coinomiaService, config) {
    $scope.sigin = true;
    $scope.loginError = '';
    $scope.s3Url = config.s3BucketUrl;
    $scope.otpRequest = false;

    // Authenticate User
    if(coinomiaService.isAuthenticated()){
      $state.go('dashboard');
    }

    if($location.search().t) {
      var token = $location.search().t;
      $scope.$storage = $localStorage.$default({token:token});
      $state.go('dashboard');
    }

    // For Testing
    // $scope.username = 'coinomia';
    // $scope.password = 'coinomia';
    // $scope.grant_type = 'password';

    $scope.back = function() {
      $scope.otpRequest = false;
    }

    // Login Process
    $scope.submit = function() {

      // $scope.otpRequest = true;

      if($scope.login.$valid){
        var loginData = {
          'username': $scope.username,
          'password': $scope.password,
          'grant_type':'password',
        };

        var checkCredentials = {
          'UserName': $scope.username,
          'Password': $scope.password
        }

        coinomiaService.checkLoginCredentials(loginData).then(function(res) {
            var data = res.data;
            if(res.status === 200 && data.Message !== 'success'){
              if($scope.remember === true) {
                $cookies.put('token', data.access_token, {expires:moment().second(data.expires_in).toISOString()});
                $scope.$storage = $localStorage.$default({token: data.access_token, expires:moment().second(data.expires_in).toISOString(), refresh_token:data.refresh_token});
              }
              $scope.$storage = $localStorage.$default({token: data.access_token});
              // $window.sessionStorage.setItem('token', data.access_token);
              if($location.search().return_url){
                var url = atob($location.search().return_url);
                $window.location.href = 'http://'+$location.host()+'/#/support?return_url='+url;
              }else{
                $state.go( "dashboard" );
              }

              console.log(2);
            }else{
              console.log(1);
              $scope.loginError = data.Message;
            }
        });

        
      }
    };
  });
