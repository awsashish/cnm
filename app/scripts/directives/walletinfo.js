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

        $scope.getWallet = function(wallet, type, imageName) {
          $rootScope.withdrawalSuccess = false;
          $rootScope.withdrawalError = false;
          $rootScope.convertSuccess = false;
          $rootScope.responseSuccess = false;

          $rootScope.walletAmount = '';

          $rootScope.withdrawalHeading = false;
          $rootScope.convertUSDHeading = false;
          $rootScope.btcImage = false;
          if(imageName === 'USD') {
             $rootScope.walletName = imageName;
          }else{
             $rootScope.walletName = wallet;            
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
