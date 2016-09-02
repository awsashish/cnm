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

  //Get User Info
  $scope.getUserDetails = function() {
    coinomiaService.getUserInfo().then(function(res) {
      var data = res.data;
      if(res.status === 200){
        $rootScope.name = data.name;
        $scope.name = $rootScope.name;
      }else {
        // Log out if API request failed.
        $scope.logout();
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
