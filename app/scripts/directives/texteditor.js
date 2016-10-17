'use strict';

/**
 * @ngdoc directive
<<<<<<< HEAD
 * @name coinomiaFrontendApp.directive:textEditor
 * @description
 * # textEditor
=======
 * @name coinomiaFrontendApp.directive:texteditor
 * @description
 * # texteditor
>>>>>>> group-chat
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
