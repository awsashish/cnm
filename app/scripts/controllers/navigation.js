'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
.controller('NavCtrl', function ($scope, $cookies, $state, $localStorage, coinomiaService) {

  //Get User Info
  $scope.getUserInfo = function() {
    coinomiaService.userInfo().then(function(res) {
      var data = res.data;
      if(res.status === 200){
        $scope.name = data.name;
      }
    });
  }
  $scope.getUserInfo();

 //  Logged out User
 $scope.logout = function() {
   if($localStorage.token || $cookies.get('token')) {
     $localStorage.$reset();
     $cookies.remove('token');
     $state.go('login');
   }
 }
});
