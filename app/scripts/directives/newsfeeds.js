'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:newsFeeds
 * @description
 * # newsFeeds
 */
angular.module('coinomiaFrontendApp')
  .directive('newsFeeds', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/newsFeeds.html'
    };
  });
