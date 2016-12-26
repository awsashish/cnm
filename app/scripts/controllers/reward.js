'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:RewardCtrl
 * @description
 * # RewardCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('RewardCtrl', function ($scope, $rootScope, config) {

    $rootScope.s3Url = config.s3BucketUrl;
    $scope.rewards = config.rewards;

    $scope.toggleDiv = function(value) {
      console.log(value);
    }

  });
