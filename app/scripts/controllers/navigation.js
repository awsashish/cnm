'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
.controller('NavCtrl', function ($scope, $cookies, $state, $window, $rootScope, $localStorage, $timeout, coinomiaService, UtilsService) {

 //  Logged out User
 $scope.logout = function() {
   if($localStorage.token || $cookies.get('token')) {
     $localStorage.$reset();
     $cookies.remove('token');
     $state.go('login');
     $window.location.reload();
   }
 }

 $rootScope.$on('logout', function() {
   $scope.logout();
   $window.location.reload();
 });
});
