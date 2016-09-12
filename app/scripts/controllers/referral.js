'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:ReferralCtrl
 * @description
 * # ReferralCtrl
 * Controller of the coinomiaFrontendApp
 */
 angular.module('coinomiaFrontendApp')
   .controller('ReferralCtrl', function ($scope, $window, $cookies, $state, coinomiaService) {

    //  Get Landing pages and referral links
    coinomiaService.getLandingPages().then(function(res) {
      var data = res.data;
      if( res.status === 200) {
        $scope.totalRecords = data.total;
        //$scope.landingPages = [];
        var refferalHtml = "<p>This page will be coming soon.<br /><br />For now your referral links are: <br /><br />";
        data.rows.forEach(function(item) {
            refferalHtml += "<a href='" + item.path + "'" + "title='" + item.Title + "'>"
                         + item.path + "</a><br /><br />";
        });
        refferalHtml += "</p>";
        $scope.landingPages = refferalHtml;
      }
    });
   });
