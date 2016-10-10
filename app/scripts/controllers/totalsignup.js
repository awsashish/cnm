'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:TotalsignupCtrl
 * @description
 * # TotalsignupCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('TotalsignupCtrl', function ($scope, coinomiaService, UtilsService) {

    // Get Country Codes
    UtilsService.getCountryCode().then(function(res) {
      $scope.allCountryCodes = res;
    });

    // Get Total Signups
    coinomiaService.getLatestSignup().then(function(res){
      if(res.status === 200) {
        $scope.totalUsers = res.data.totalusers;
        $scope.latestSignup = res.data.data;
      }
    })
  });
