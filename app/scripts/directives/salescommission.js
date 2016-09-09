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
        contributorContract: "=",
        rackContract: "=",
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
        contributorCalc: "&",
        rackCalc: "&"
      }
    };
  });
