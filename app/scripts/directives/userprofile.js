'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:userProfile
 * @description
 * # userProfile
 */
angular.module('coinomiaFrontendApp')
  .directive('userProfile', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directiveTemplates/user-profile.html',
      scope: {
        'userInfo': '=',
        'dialCode':'=',
        'errorMessage':'=',
        'successMessage':'=',
        'updateProfile':'&',
        'customClass': '@'
      },
    };
  });
