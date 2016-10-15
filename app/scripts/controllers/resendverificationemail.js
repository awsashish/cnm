'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:ResendverificationemailCtrl
 * @description
 * # ResendverificationemailCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('ResendverificationemailCtrl', function ($scope, coinomiaService, config) {

    $scope.s3Url = config.s3BucketUrl;
    $scope.emailError = false;

    // Forgot Password
    $scope.submit = function() {
      if($scope.user) {
        $scope.emailError = false;
        $scope.emailId = JSON.stringify($scope.user.email);
        coinomiaService.resendEmail($scope.emailId)
          .then(function(res){
            if(res.status === 200) {
              $scope.hasSuccess = true;
              $scope.successEmail = '<'+$scope.user.email+'>';
            }else if(res.status === 404){
              $scope.resendError = res.data.Message;
            }else{
              $scope.resendError = 'OOPS! Something went wrong. Please try again.';
            }
          })
      }else{
        $scope.emailError = true;
      }
    }
  });
