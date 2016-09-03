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

    $scope.confrimPassError = false;
    $scope.user = {
      'sponsor': 'coinomia',
      'ipadr': '',
      'country': '',
      'state': '',
      'city': ''
    };

    // Authenticate User
    if(coinomiaService.isAuthenticated()){
      $state.go('dashboard');
    }

    coinomiaService.getUserLocation().then(function(res) {
      var data = res.data;
      $scope.user.ipadr = data.ip;
      $scope.user.country = data.country_name;
      $scope.user.state = data.region_name;
      $scope.user.city = data.city;
    });


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

    $scope.next = function() {
      $scope.confirmPass(function(error) {
        if( error === false ) {
          $scope.showme = true;
        }
      })
      // if($scope.signup.sponsor.$valid && $scope.signup.userid.$valid && $scope.signup.firstname.$valid && $scope.signup.password.$valid && $scope.signup.confirmpassword.$valid) {
      //   $scope.showme = true;
      //   $scope.formError = false;
      //   console.log(1);
      // }else{
      //   $scope.formError = true;
      //   $scope.showme = false;
      //   console.log(2);
      // }
    };

    // Accept terms and conditions.
    $scope.accept = function() {
      if($scope.terms == true) {
        $scope.termsError = '';
      }else{
        $scope.termsError = 'You must accept our terms and conditions.';
      }
    }

    $scope.submit = function() {
      $scope.emailError = '';
      $scope.userIdError = '';
      $scope.firstNameError = '';
      $scope.lastNameError = '';
      if($scope.terms == true) {
        var formData = {
          'sponsor':$scope.user.sponsor,
          'userid':$scope.user.userid,
          'FirstName':$scope.user.firstName,
          'LastName':$scope.user.lastName,
          'Address':$scope.user.address,
          'Country':$scope.user.country,
          'State':$scope.user.state,
          'City':$scope.user.city,
          'Pincode':$scope.user.pincode,
          'Mobile':$scope.user.mobile,
          'Email':$scope.user.email,
          'IPAdr':$scope.user.ipadr,
          'Password':$scope.user.password,
          'ConfirmPassword':$scope.user.confirmPassword
        };
        // console.log(formData);
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
      }else{
        $scope.termsError = 'You must accept our terms and conditions.';
      }
    };
  });
