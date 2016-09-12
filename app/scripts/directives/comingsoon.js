'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:comingSoon
 * @description
 * # comingSoon
 */
angular.module('coinomiaFrontendApp')
  .directive('comingSoon', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directiveTemplates/comingSoon.html',
      scope:{
        textValue: "="
      }
    };
  });
