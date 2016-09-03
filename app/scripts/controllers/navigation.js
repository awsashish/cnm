'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
.controller('NavCtrl', function ($scope, $cookies, $state, $rootScope, $localStorage, $timeout, coinomiaService) {

  $rootScope.$on('getRefreshToken', function() {
    if($localStorage.refresh_token) {
      var refreshTokenParams = {
        'grant_type': 'refresh_token',
        'refresh_token': $localStorage.refresh_token
      }

      coinomiaService.getRefreshToken(refreshTokenParams).then(function(res) {
        var data = res.data;
        if(res.status === 200) {
          $localStorage.$reset();
          $cookies.put('token', data.access_token, {expires:moment().second(data.expires_in).toISOString()});
          $localStorage.$default({token: data.access_token, expires:moment().second(data.expires_in).toISOString(), refresh_token:data.refresh_token});
        }else {
          $scope.logout();
        }
      });
    }else{
      $scope.logout();
    }
  });

  //Get User Info
  $scope.getUserDetails = function() {
    coinomiaService.getUserInfo().then(function(res) {
      var data = res.data;
      if(res.status === 200){
        $rootScope.name = data.name;
        $scope.name = $rootScope.name;
      }
    });
  }

  $scope.getUserDetails();

 //  Logged out User
 $scope.logout = function() {
   if($localStorage.token || $cookies.get('token')) {
     $localStorage.$reset();
     $cookies.remove('token');
     $state.go('login');
   }
 }
});
