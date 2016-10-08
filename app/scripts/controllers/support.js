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
      angular.element('#osticket').submit();
    }

    // Check Token exists or not
    if($localStorage.token) {
      $scope.token = $localStorage.token;
      $scope.osLogin();
    }

    $scope.redirectURL = $sce.trustAsResourceUrl($location.search().return_url);


  });
