'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:ReferralCtrl
 * @description
 * # ReferralCtrl
 * Controller of the coinomiaFrontendApp
 */
 angular.module('coinomiaFrontendApp')
   .controller('ReferralCtrl', function ($scope, $rootScope, $window, $cookies, $state, coinomiaService) {
    //  Get Landing pages and referral links
    coinomiaService.getLandingPages().then(function(res) {
      var data = res.data;
      if( res.status === 200) {
        $scope.totalRecords = data.total;
        var sponsorId = $rootScope.sponsorId;
        $scope.landingPages = [];
        data.rows.forEach(function(item) {
          var path = item.path;
          item.path = path+'?id=';
          $scope.landingPages.push(item)
        });
      }
    });
   });
