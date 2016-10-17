'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:texteditor
 * @description
 * # texteditor
 */
angular.module('coinomiaFrontendApp')
  .directive('texteditor', function () {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $(element).Editor();
      }
    };
  });
