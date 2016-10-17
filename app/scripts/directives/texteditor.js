'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:textEditor
 * @description
 * # textEditor
 */
angular.module('coinomiaFrontendApp')
  .directive('textEditor', function () {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $(element).Editor();
      }
    };
  });
