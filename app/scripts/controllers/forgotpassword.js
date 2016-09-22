'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:ForgotpasswordCtrl
 * @description
 * # ForgotpasswordCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('ForgotpasswordCtrl', function ($scope) {

    $scope.emailError = false;

    // Forgot Password
    $scope.submit = function() {
      if($scope.user) {
        $scope.emailError = false;
        console.log($scope.user.email);
      }else{
        $scope.emailError = true;
      }
    }

  });
