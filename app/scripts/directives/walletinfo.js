'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:walletInfo
 * @description
 * # walletInfo
 */
angular.module('coinomiaFrontendApp')
  .directive('walletInfo', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directiveTemplates/walletInfo.html',
      scope:{
        walletData:'=',
        successMessage:'=',
        errorMessage:'=',
        walletHeading:'=',
        type:'@',
        updateWallet: '&',
        walletType: '@',
        s3Url:"="
      },
      controller: function($scope, $rootScope, $element, $attrs, coinomiaService) {
        $scope.submit = function(amount) {
          $rootScope.addAmount = amount;
        }

        $scope.checkAmount = function(amount) {
          if(amount < 100) {
            $scope.amountError = true;
          }else {
            $scope.amountError = false;
            $rootScope.addAmount = amount;
          }
        }

        $scope.getUserId = function(userId) {
          $rootScope.transferUserId = userId;
        }

        $scope.getWallet = function(data, type, imageName) {
          $rootScope.withdrawalAmountError = false;
          $rootScope.withdrawalInfo = false;
          $rootScope.withdrawalSuccess = false;
          $rootScope.withdrawalError = false;
          $rootScope.convertSuccess = false;
          $rootScope.responseSuccess = false;
          $rootScope.convertError = false;
          $rootScope.walletAmount = '';          

          if(imageName === 'BTC') {
            $rootScope.networkFees = 0.0004;
          }else if(imageName === 'ETH') {
            $rootScope.networkFees = 0.04;
          }

          
          $rootScope.balance = data.Balance;
          if(data.Balance > 1) {
            $rootScope.networkFees = 1;
          }


          $rootScope.withdrawalHeading = false;
          $rootScope.convertUSDHeading = false;
          $rootScope.btcImage = false;
          if(imageName === 'USD') {
             $rootScope.walletName = imageName;
          }else{
             $rootScope.walletName = data.Wallet;            
          }
         
          $rootScope.imageName = imageName;
          if(type === 'withdrawal') {
            $rootScope.walletType = type;
            $rootScope.withdrawalHeading = true;
          }else if(type === 'convertUSD'){
            $rootScope.walletType = type;
            $rootScope.convertUSDHeading = true;
            $rootScope.convertUSDName = 'Convert USD';
          }else{
            $rootScope.walletType = type; 
            $rootScope.btcImage = true;
            $rootScope.convertUSDHeading = true;
            $rootScope.convertUSDName = 'Convert To BTC';
          }
        }

      }
    };
  });
