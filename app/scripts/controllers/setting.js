'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:SettingCtrl
 * @description
 * # SettingCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('SettingCtrl', function ($scope, coinomiaService) {

    // Get User Profile
    $scope.getUserProfile = function() {
      coinomiaService.getUserInfo()
        .then(function(res) {
          var data = res.data;
          if(res.status === 200) {
            $scope.userInfo = data;
          }
        });
    }

    $scope.getUserProfile();

    // Get User's Sponsor
    // $scope.sponsorInfo = function() {
    //   coinomiaService.getUserSponsor()
    //     .then(function(res) {
    //       console.log(res);
    //     });
    // }
  });
