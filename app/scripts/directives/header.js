'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:header
 * @description
 * # header
 */
angular.module('coinomiaFrontendApp')
  .directive('mainHeader', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/common/header.html',
      scope: true,
      controller: 'HeaderCtrl'
    };
  });
