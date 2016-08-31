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
          console.log(res);
        });
    }

    $scope.getUserProfile();
  });
