'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:ResetpasswordCtrl
 * @description
 * # ResetpasswordCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('ResetpasswordCtrl', function ($scope, $location, $state, coinomiaService) {

    $scope.confrimPassError = false;
    
    if($location.search().email && $location.search().ucode) {
      $scope.resetData = {
        EmailId: $location.search().email,
        UniqueCode: $location.search().ucode,
      }
    }else{
      $state.go('login');
    }

    $scope.confirmPass = function(callback) {
      if($scope.user.password !== $scope.user.confirmPassword) {
        $scope.confirmPassError = true;
        $scope.signupError = 'Passwords do not match.';
      }else{
        $scope.confirmPassError = false;
      }
      if(typeof callback === 'function') {
        return callback($scope.confirmPassError);
      }
    }

    $scope.submit = function() {
      $scope.confirmPass(function(error) {
        if( error === false ) {
          $scope.resetData.NewPassword = $scope.user.password;
          $scope.resetData.ConfirmPassword = $scope.user.confirmPassword;
          coinomiaService.resetPassword($scope.resetData)
            .then(function(res) {
              var data = res.data;
              if(res.status === 200) {
                $scope.hasSuccess = true;
              }else{
                $scope.resetPassError = data.Message;
              }
          })
        }
      })
    }
  });
