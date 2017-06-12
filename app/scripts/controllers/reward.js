'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:RewardCtrl
 * @description
 * # RewardCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('RewardCtrl', function ($scope, $rootScope, config, coinomiaService, $interval, $timeout) {

    $rootScope.s3Url = config.s3BucketUrl;
    $scope.rewards = config.rewards;
    $scope.allRewards = [];
    $scope.allAchiever = [];
    $scope.weekRewards = [];

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
    $scope.getAchiever = function() {
      coinomiaService.getAllTimeAchiever()
        .then(function(res) {
          if(res.status === 200) {
            $scope.allAchiever = res.data;
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

    $scope.frontlineCommission = config.reward_commission.frontline_commission;
    $scope.maximumCommission = config.reward_commission.referral_commission;
    $scope.paidCommission = config.reward_commission.paid_commission;
    $scope.repurchaseCheque = config.reward_commission.repurchase_cheque;

    // News Ticker Implementation
    $scope.movingRewards = false;
    $scope.moveDown = function() {
        $scope.movingRewards = true;
        $timeout($scope.switchFirst, 1000);
    };
    $scope.switchFirst = function() {
        $scope.weekRewards.push($scope.weekRewards.shift());
        $scope.allRewards.push($scope.allRewards.shift());
        $scope.allAchiever.push($scope.allAchiever.shift());
        $scope.movingRewards = false;
        $scope.$apply();
    };
    $scope.getAllRewards();
    $scope.get7daysRewards();
    $scope.getAchievements();
    $scope.getAchiever();
    $interval($scope.moveDown, 3000);

  });
