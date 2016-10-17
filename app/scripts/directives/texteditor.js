'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:texteditor
 * @description
 * # texteditor
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
