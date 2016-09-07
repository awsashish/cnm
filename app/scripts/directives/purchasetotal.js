'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:purchaseTotal
 * @description
 * # purchaseTotal
 */
angular.module('coinomiaFrontendApp')
  .directive('purchaseTotal', function () {
    return {
      restrict: 'A',
      templateUrl: 'views/purchaseTotal.html',
      scope: {
        purchasedAttr: "=",
        purchasedParams: "=",
        totalAttr: "=",
        totalParams: "="
      }
    };
  });
