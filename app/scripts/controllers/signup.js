'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MainCtrl
 * @description
 * # SignupCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('SignupCtrl', function ($scope, coinomiaService, $window, $timeout, $state) {

    $scope.sponsor = 'coinomia';
    $scope.confrimPassError = false;

    coinomiaService.getUserIP().then(function(data) {
      $scope.IPAdr = data.data;
    });

    $scope.next = function() {
      if($scope.signup.sponsor.$valid && $scope.signup.userid.$valid && $scope.signup.firstname.$valid && $scope.signup.password.$valid && $scope.signup.confirmpassword.$valid) {
        $scope.showme = true;
        $scope.formError = false;
      }else{
        $scope.formError = true;
        $scope.showme = false;
      }
    };

    $scope.confirmPass = function() {
      if($scope.Password !== $scope.ConfirmPassword) {
        $scope.confrimPassError = true;
        $scope.signupError = 'Passwords do not match.';
      }else{
        $scope.confrimPassError = false;
      }
    }

    $scope.submit = function() {
      $scope.emailError = '';
      $scope.userIdError = '';
      $scope.firstNameError = '';
      $scope.lastNameError = '';

      var formData = {
        'sponsor':$scope.sponsor,
        'userid':$scope.userid,
        'FirstName':$scope.FirstName,
        'LastName':$scope.LastName,
        'Address':$scope.Address,
        'Country':$scope.Country,
        'State':$scope.State,
        'City':$scope.City,
        'Pincode':$scope.Pincode,
        'Mobile':$scope.Mobile,
        'Email':$scope.Email,
        'IPAdr':$scope.IPAdr,
        'Password':$scope.Password,
        'ConfirmPassword':$scope.ConfirmPassword
      };

      $scope.error = false;
      coinomiaService.signup(formData).then(function(res) {
        var data = res.data;
        if(res.status === 200){
          $scope.signupMessage = data.Message;
          $state.go('success');
        }else if(res.status === 404) {
            $scope.showme = false;
            $scope.userIdError = data.Message;

        }else if(angular.isObject(data.Messages)) {
          var errorMessage = data.Messages;
          if(errorMessage['Member.Email'] !== undefined) {
            $scope.showme = true;
            $scope.emailError = data.Messages['Member.Email'][0];
          }

          if(errorMessage['Member.FirstName'] !== undefined) {
            $scope.showme = false;
            $scope.firstNameError = 'Only alphabets are allowed';
          }

          if(errorMessage['Member.LastName'] !== undefined) {
            $scope.showme = false;
            $scope.lastNameError = 'Only alphabets are allowed';
          }
        }else {
          $scope.error = true;
          $scope.signupMessage = 'Oops! Something went wrong. Please check if you entered data properly.';
        }
      });
    };
  });
