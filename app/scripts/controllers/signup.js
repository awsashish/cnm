'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MainCtrl
 * @description
 * # SignupCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('SignupCtrl', function ($scope, coinomiaService, $window, $timeout, $state, $location, $cookies) {

    $scope.confrimPassError = false;
    $scope.user = {
      'sponsor': '',
      'sponsorName': '',
      'ipadr': '',
      'country': '',
      'state': '',
      'city': ''
    };

    // Authenticate User
    if(coinomiaService.isAuthenticated()){
      $state.go('dashboard');
    }

    $scope.verifySponsor = function(sponsorId) {
      coinomiaService.verifySponsor(sponsorId).then(function(res) {
        var data = res.data;
        if(res.status === 200) {
          $scope.user.sponsor = data.username;
          $scope.user.sponsorName = data.name;
          var expiryDate = moment().add(90, 'days').toISOString();
          $cookies.put('sponsorId', $scope.user.sponsor, {expires:expiryDate});
          $cookies.put('sponsorName', $scope.user.sponsorName, {expires:expiryDate});
        }else{
          $scope.defaultSponsor();
        }
      });
    }

    $scope.defaultSponsor = function() {
      coinomiaService.getDefaultSponsor().then(function(res) {
        var data = res.data;
        if(res.status === 200) {
          $scope.user.sponsor = data.Memberid;
          $scope.user.sponsorName = data.MemberName;
        }
      })
    }

    if($location.search().id) {
      var sponsorInfo = $location.search();
      var sponsorId = JSON.stringify(sponsorInfo.id);
      $scope.verifySponsor(sponsorId);
    }else if($cookies.get('sponsorId')){
      $scope.user.sponsor = $cookies.get('sponsorId');
      $scope.user.sponsorName = $cookies.get('sponsorName');
    }else{
      $scope.defaultSponsor();
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
          $scope.submit();
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
      $scope.nameError = '';
      $scope.user.email = $scope.user.email;
      $scope.user.name = $scope.user.name;
      $scope.name = $scope.user.name.split(" ");

      $scope.firstName = $scope.name[0].trim();
      $scope.lastName  = $scope.user.name.replace($scope.firstName, '').trim();

      // if($scope.name[1] && $scope.name[2]) {
      //   $scope.firstname = $scope.name[0];
      //   $scope.lastname = $scope.name[1]+" "+$scope.name[2];
      // }else if($scope.name[1]){
      //   $scope.firstname = $scope.name[0];
      //   $scope.lastname = $scope.name[1];
      // }else{
      //   $scope.firstname = $scope.user.name;
      //   $scope.lastname = '';
      // }

      if($scope.terms == true) {
        $scope.loadingMessage = true;
        var formData = {
          'sponsor':$scope.user.sponsor,
          'userid':$scope.user.userid,
          'FirstName':$scope.firstName,
          'LastName':$scope.lastName,
          'Country':$scope.user.country,
          'Email':$scope.user.email,
          'IPAdr':$scope.user.ipadr,
          'Password':$scope.user.password,
          'ConfirmPassword':$scope.user.confirmPassword,
          'Leg':''
        };
        $scope.error = false;
        coinomiaService.signup(formData).then(function(res) {
          $scope.loadingMessage = false;
          var data = res.data;
          if(res.status === 200){
            $scope.signupMessage = data.Message;
            angular.element("#aweber-internal-signup").submit();
          }else if(res.status === 404) {
              $scope.showme = false;
              $scope.signupError = data.Message;
          }else if(angular.isObject(data.Messages)) {
            var errorMessage = data.Messages;
            if(errorMessage['Member.Email'] !== undefined) {
              $scope.emailError = data.Messages['Member.Email'][0];
            }
            if(errorMessage['Member.Userid'] !== undefined) {
              $scope.userIdError = data.Messages['Member.Userid'][0];
            }

            if(errorMessage['Member.FirstName'] !== undefined) {
              $scope.showme = false;
              $scope.nameError = 'Only alphabets are allowed';
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
