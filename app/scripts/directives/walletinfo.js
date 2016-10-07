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
        walletType: '@'
      }
    };
  });
