'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:SupportCtrl
 * @description
 * # SupportCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('SupportCtrl', function ($scope, coinomiaService, $localStorage, $cookies) {

    // Os Ticket Login
    $scope.osLogin = function(token) {
      coinomiaService.osTicketlogin(token)
      .then(function(res){
        if(res.status === 200){

        }
      });
    }

    // Check Token exists or not
    if($localStorage.token) {
      $scope.osLogin($localStorage.token);
    }
  });
