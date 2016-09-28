'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:ReferralCtrl
 * @description
 * # ReferralCtrl
 * Controller of the coinomiaFrontendApp
 */
 angular.module('coinomiaFrontendApp')
   .controller('ReferralCtrl', function ($scope, $rootScope, $window, $cookies, $state, $location, coinomiaService) {

     $scope.confrimPassError = false;
     $scope.errorPlacement = false;
     $scope.user = {
       'sponsor': '',
       'sponsorName': '',
       'ipadr': '',
       'country': '',
       'state': '',
       'city': ''
     };

     $scope.redirectPage = $window.location.host + '/#' + $location.path();

    //  Get Landing pages and referral links
    coinomiaService.getLandingPages().then(function(res) {
      var data = res.data;
      if( res.status === 200) {
        $scope.totalRecords = data.total;
        var sponsorId = $rootScope.sponsorId;
        $scope.landingPages = [];
        data.rows.forEach(function(item) {
          var path = item.path;
          item.path = path+'?id=';
          $scope.landingPages.push(item)
        });
      }
    });

    $scope.updatePlacement = function(placement) {
      $scope.placement = JSON.stringify(placement);
      coinomiaService.switchPlacement($scope.placement)
        .then(function(res) {
          if(res.status === 200) {
            if(placement === 'L') {
              $scope.activePlacement = 'Left Placement';
            }else if(placement === 'R') {
              $scope.activePlacement = 'Right Placement';
            }if(placement === 'A') {
              $scope.activePlacement = 'Alternate Placement';
            }if(placement === 'W') {
              $scope.activePlacement = 'Balance Weak Leg';
            }
          }
      });
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
      if($scope.user.placement){
        $scope.errorPlacement = false;
        $scope.confirmPass(function(error) {
          if( error === false ) {
            $scope.submit();
          }
        })
      }else{
        $scope.errorPlacement = true;
        $scope.errorPlacementMessage = 'Please select any placement.'
      }
    }

    $scope.submit = function() {
      $scope.emailError = '';
      $scope.userIdError = '';
      $scope.nameError = '';
      $scope.user.email = $scope.user.email;
      var formData = {
        'sponsor':$scope.sponsorId,
        'userid':$scope.user.userid,
        'FirstName':$scope.user.firstName,
        'LastName':$scope.user.lastName,
        'Country':$scope.user.country,
        'Email':$scope.user.email,
        'IPAdr':$scope.user.ipadr,
        'Password':$scope.user.password,
        'ConfirmPassword':$scope.user.confirmPassword,
        'Leg':$scope.user.placement
      };
      $scope.error = false;
      coinomiaService.signup(formData).then(function(res) {
        var data = res.data;
        if(res.status === 200){
          $scope.signupMessage = data.Message;
          angular.element("#referral-aweber-form").submit();
        }else if(res.status === 404) {
            $scope.showme = false;
            $scope.userIdError = data.Message;
        }else if(angular.isObject(data.Messages)) {
          var errorMessage = data.Messages;
          if(errorMessage['Member.Email'] !== undefined) {
            $scope.emailError = data.Messages['Member.Email'][0];
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
          $scope.errorMessage = 'Oops! Something went wrong. Please check if you entered data properly.';
        }
      });
    };

    $scope.updatePage = function(defaultPage) {
      var pageId = JSON.stringify(defaultPage);
      coinomiaService.updateLandingPage(pageId)
      .then(function(res) {
        $rootScope.landingPage = defaultPage;
      })
    }

   });
