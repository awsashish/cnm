'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MainCtrl
 * @description
 * # SignupCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('SignupCtrl', function ($scope, coinomiaService, $window) {
    $scope.sponsor = 'coinomia';
    $scope.confrimPassError = false;

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
        $scope.signupError = 'Password does not match.';
      }else{
        $scope.confrimPassError = false;
      }

        $scope.submit = function() {
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
          coinomiaService.signup(formData, function(res) {
            if(res.status === 200){
              $scope.signupMessage = res.Message;
              $window.location.href = '#/success';
            }
          }, function(err) {
            $scope.error = true;
            $scope.signupMessage = 'Something goes wrong. Please fill the form correctly.';
          });
        };
      };
  });
