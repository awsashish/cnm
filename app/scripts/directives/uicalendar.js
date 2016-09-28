'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:uiCalendar
 * @description
 * # uiCalendar
 */
angular.module('coinomiaFrontendApp')
  .directive('uiCalendar', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directiveTemplates/calendar.html',
      scope: {
        'data': '='
      },
      link: function(scope, elem, attrs) {
        $(elem).responsiveCalendar({
          events: scope.data
        });
      }
    };
  });
