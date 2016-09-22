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
        treeDetails: "=",
        binaryDetails: "=",
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
