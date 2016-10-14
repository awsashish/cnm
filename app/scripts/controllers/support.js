'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:SupportCtrl
 * @description
 * # SupportCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('SupportCtrl', function ($scope, coinomiaService, $location, $sce, $localStorage, $cookies) {

    // Os Ticket Login
    $scope.osLogin = function() {
      setTimeout(function() {
        angular.element('#osticket').submit();
      }, 500);
    }

    // Check Token exists or not
    if($localStorage.token) {
      $scope.redirectURL = $sce.trustAsResourceUrl($location.search().return_url);
      $scope.token = $localStorage.token;
      $scope.osLogin();
    }
  });
