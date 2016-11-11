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
      }
    };
  });
