'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MainCtrl
 * @description
 * # SignupCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('SignupCtrl', function ($scope, coinomiaService) {

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

      coinomiaService.signup(formData, function(res) {
        console.log(res);
      });
    };

  });
