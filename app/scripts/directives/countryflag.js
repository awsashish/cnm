'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:countryFlag
 * @description
 * # countryFlag
 */
angular.module('coinomiaFrontendApp')
  .directive('countryFlag', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directiveTemplates/countryFlag.html',
      scope: {
        countryName: "=",
        s3Url: "="
      }
    };
  });
