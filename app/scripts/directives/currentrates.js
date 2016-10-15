'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:currentRates
 * @description
 * # currentRates
 */
angular.module('coinomiaFrontendApp')
  .directive('currentRates', function () {
    return {
      restrict: 'A',
      templateUrl: 'views/directiveTemplates/currentRates.html',
      scope: {
        currentMining: "=",
        miningParams: "=",
        s3Url: "="
      }
    };
  });
