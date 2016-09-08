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
        poolContract: "=",
        contributorContract: "=",
        rackContract: "=",
        contributorTotal: "=",
        poolTotal: "=",
        rackTotal: "=",
        poolDetails: "=",
        contributorDetails: "=",
        rackDetails: "=",
        poolCalc: "&",
        contributorCalc: "&",
        rackCalc: "&"
      }
    };
  });
