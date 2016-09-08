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
      restrict: 'E',
      scope: true,
      templateUrl: 'views/directiveTemplates/salesCommission.html'
    };
  });
