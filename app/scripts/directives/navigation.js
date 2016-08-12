'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:navigation
 * @description
 * # navigation
 */
angular.module('coinomiaFrontendApp')
  .directive('navigation', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/common/navigation.html',
      scope: true,
      // controller: 'HeaderCtrl'
    };
  });
