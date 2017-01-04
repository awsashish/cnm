'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:RewardCtrl
 * @description
 * # RewardCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('RewardCtrl', function ($scope, $rootScope, config, coinomiaService) {

    $rootScope.s3Url = config.s3BucketUrl;
    $scope.rewards = config.rewards;

    $scope.toggleDiv = function(value) {
      console.log(value);
    }

    // Get All Time Rewards
    $scope.getAllRewards = function() {
      coinomiaService.getAllRewards()
        .then(function(res) {
          if(res.status === 200) {
            $scope.allRewards = res.data;
          }
        })
    }

    // Get All Time Rewards
    $scope.get7daysRewards = function() {
      coinomiaService.get7daysRewards()
        .then(function(res) {
          if(res.status === 200) {
            $scope.weekRewards = res.data;
          }
        })
    }

    // Get Achievements History
    $scope.getAchievements = function() {
      coinomiaService.getAchievements()
        .then(function(res) {
          if(res.status === 200) {
            if(res.data.total > 0) {
              $scope.noRecords = false;
              $scope.achievements = [];
              var data =  res.data.rows;
              data.forEach(function(_data) {
                _data.ondate = new Date(_data.ondate);
                $scope.achievements.push(_data);
              });
            }else{
              $scope.noRecords = true;
            }
            
          }
        });
    }
     
    $scope.getAllRewards();
    $scope.get7daysRewards();
    $scope.getAchievements();

  });
