'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:SettingCtrl
 * @description
 * # SettingCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('SettingCtrl', function ($scope, coinomiaService, $state, $timeout) {
    $scope.confirmPassError = false;
    $scope.user = {};

    $scope.confirmPass = function(callback) {
      if($scope.user.NewPassword !== $scope.user.ConfirmPassword) {
        $scope.confirmPassError = true;
        $scope.passwordError = 'Passwords do not match.';
      }else{
        $scope.confirmPassError = false;
      }
      if(typeof callback === 'function') {
        return callback($scope.confirmPassError);
      }
    }

    // Change User Password
    $scope.changeUserPassword = function(data) {
      var info = $scope.user;
      $scope.confirmPass(function(error) {
        if(error === false) {
          coinomiaService.changePassword(info)
            .then(function(res) {
              if(res.status === 200) {
                $scope.errorMessage = '';
                $scope.successMessage = 'Password Changed Successfully';
              }else{
                $scope.successMessage = '';
                $scope.errorMessage = res.data.Message;
              }
            });
        }
      });
    }

    $scope.updateProfile = function(userData) {
      $scope.name = $scope.name.split(" ");
      var formData = {
        'FirstName':$scope.name[0],
        'LastName':$scope.name[1],
        'Email':$scope.userInfo.Email,
        'Country':$scope.userInfo.Country,
        'State':$scope.userInfo.State,
        'City':$scope.userInfo.City,
        'Address':$scope.userInfo.Address,
        'Mobile':$scope.userInfo.Mobile,
        'Pincode':$scope.userInfo.Pincode
      };

      coinomiaService.updateProfile(formData)
        .then(function(res) {
          if(res.status === 200){
            $scope.errorMessage = '';
            $scope.successMessage = 'Profile Updated Successfully';
          }else{
            $scope.successMessage = '';
            $scope.errorMessage = res.data.Message;
          }
        });
    }

    // Get User's Sponsor
    // $scope.sponsorInfo = function() {
    //   coinomiaService.getUserSponsor()
    //     .then(function(res) {
    //       console.log(res);
    //     });
    // }
  });
