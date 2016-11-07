'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:VerifyemailCtrl
 * @description
 * # VerifyemailCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('VerifyemailCtrl', function ($scope, coinomiaService, $state, $location, config) {
    $scope.loading = true;
    $scope.s3Url = config.s3BucketUrl
    $scope.getToken = $location.path().split('/').pop();
    // console.log(getId);
    // Verifying Email
    coinomiaService.verifyEmail($scope.getToken).then(function(res) {
      var data = res.data;
      if(res.status == 200) {
        $scope.loading = false;
        $scope.verificationMessage = data.Message;
        $scope.isVerified = true;
      }else if(res.status == 404 && data.Message){
        $scope.status = res.status;
        $scope.loading = false;
        $scope.verificationMessage = data.Message+'. Please contact to the support team.';
        $scope.isVerified = false;
      }else{
        $scope.loading = false;
        $scope.verificationMessage = 'Something went wrong. Please contact to the support team';
        $scope.isVerified = false;
      }
    });

  });
