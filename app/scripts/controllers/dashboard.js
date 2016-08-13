'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MainCtrl
 * @description
 * # DashboardCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('DashboardCtrl', function ($scope, $window, $cookies, $state) {
    console.log('DashBoard');
    $scope.validateUser = function() {
      var userSession = $window.sessionStorage.getItem('token');
      var userCookies = $cookies.get('token');
      console.log(userSession, userCookies);
      if(userCookies =='' || userSession == '') {
        $state.go('login');
      }
    }

   $scope.validateUser();
  });
