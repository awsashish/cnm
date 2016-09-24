'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:salesCommission
 * @description
 * # salesCommission
 */
angular.module('coinomiaFrontendApp')
  .directive('salesCommission', function () {
    return {
      restrict: 'A',
      templateUrl: 'views/directiveTemplates/salesCommission.html',
      scope: {
        commission: "=",
        treeDetails: "=",
        binaryDetails: "=",
        salesHeading: "=",
        salesImagePath: "=",
        poolContract: "=",
        binaryPoolContract: "=",
        contributorContract: "=",
        binaryContributorContract: "=",
        rackContract: "=",
        binaryRackContract: "=",
        contributorTotal: "=",
        binaryContributorTotal: "=",
        poolTotal: "=",
        binaryPoolTotal: "=",
        rackTotal: "=",
        binaryRackTotal: "=",
        poolDetails: "=",
        contributorDetails: "=",
        rackDetails: "=",
        poolCalc: "&",
        binaryPoolCalc: "&",
        contributorCalc: "&",
        binaryContributorCalc: "&",
        rackCalc: "&",
        binaryRackCalc: "&"
      }
    };
  });
