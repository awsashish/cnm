'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:footer
 * @description
 * # footer
 */
angular.module('coinomiaFrontendApp')
  .directive('mainFooter', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/common/footer.html',
      scope: true,
      // controller: 'FooterCtrl'
    };
  });
