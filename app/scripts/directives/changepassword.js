'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:changePassword
 * @description
 * # changePassword
 */
angular.module('coinomiaFrontendApp')
  .directive('changePassword', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directiveTemplates/changePassword.html',
      scope: {
        'changePassword':'&'
      },
    };
  });
