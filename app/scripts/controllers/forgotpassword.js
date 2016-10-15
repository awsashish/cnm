'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:ForgotpasswordCtrl
 * @description
 * # ForgotpasswordCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('ForgotpasswordCtrl', function ($scope,coinomiaService,config) {

    $scope.s3Url = config.s3BucketUrl;
    $scope.emailError = false;

    // Forgot Password
    $scope.submit = function() {
      if($scope.user) {
        $scope.emailError = false;
        $scope.emailId = JSON.stringify($scope.user.email);
        coinomiaService.forgotPassword($scope.emailId)
          .then(function(res){
            if(res.status === 200) {
              $scope.hasSuccess = true;
              $scope.successEmail = '<'+$scope.user.email+'>';
            }
          })
      }else{
        $scope.emailError = true;
      }
    }

  });
