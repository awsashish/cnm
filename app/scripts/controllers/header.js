'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('HeaderCtrl', function ($scope, $sce, $cookies, $state, $rootScope, $localStorage, $timeout, $uibModal, $uibModalStack, coinomiaService, UtilsService, config) {

      $rootScope.s3Url = config.s3BucketUrl;

      $rootScope.activeMenu = $state.current.name;

       //  Logged out User
       $scope.logout = function(){
         $rootScope.$broadcast('logout');
       }

      // Calcultate remaining Time
      var futureDate = moment.utc('2016-11-14 09:00:00');
      var currentDate = moment.utc();
      // $rootScope.remainingTime = (futureDate - currentDate)/1000;
      $rootScope.remainingTime = futureDate.diff(currentDate, 'seconds');

      $rootScope.tokenRequestProgress = false;

      $rootScope.$on('getRefreshToken', function() {
        if($localStorage.refresh_token && !$cookies.get('token') && !$rootScope.tokenRequestProgress) {
          $rootScope.tokenRequestProgress = true;
          var refreshTokenParams = {
            'grant_type': 'refresh_token',
            'refresh_token': $localStorage.refresh_token
          }

        coinomiaService.getRefreshToken(refreshTokenParams).then(function(res) {
          var data = res.data;
          if(res.status === 200) {
            $localStorage.$reset();
            $cookies.put('token', data.access_token, {expires:moment().second(data.expires_in).toISOString()});
            $localStorage.$default({token: data.access_token, expires:moment().second(data.expires_in).toISOString(), refresh_token:data.refresh_token});
          }else{
            $rootScope.$broadcast('logout');
          }
          $rootScope.tokenRequestProgress = false;
        });
      }else if(!$localStorage.refresh_token){
        $rootScope.$broadcast('logout');
      }
    });

    //Get User Info
    $scope.getUserDetails = function() {
      coinomiaService.getUserInfo().then(function(res) {
        var data = res.data;
        if(res.status === 200){
          $rootScope.userInfo = data;
          $rootScope.name = data.name;
          $rootScope.sponsorId = data.username;
          $rootScope.country = data.Country;
          $rootScope.autorotator = data.autorotator;
          $rootScope.landingPage = data.LandingPage;

          $rootScope.$broadcast('userDetails', $rootScope.userInfo);

          if(data.sponsor === "0") {
            $rootScope.parentSponsor = false;
          }else{
            $rootScope.parentSponsor = true;
          }

          if($rootScope.autorotator === 'L') {
            $rootScope.activePlacement = 'Left Placement';
          }else if($rootScope.autorotator === 'R') {
            $rootScope.activePlacement = 'Right Placement';
          }if($rootScope.autorotator === 'A') {
            $rootScope.activePlacement = 'Alternate Placement';
          }if($rootScope.autorotator === 'W') {
            $rootScope.activePlacement = 'Balance Weak Leg';
          }
          $scope.getFlag($rootScope.country);
        }
        else if(res.status == 401){
          $state.go('login');
        }
      });
    }

    $scope.getUserDetails();

    $scope.getFlag = function(countryName) {
      UtilsService.getCountryFlag(countryName).then(function(res){
        $scope.countryFlag = res[0];
      });
    }

    // Get Country Codes
    UtilsService.getCountryCode().then(function(res) {
      $rootScope.allCountryCodes = res;
    });

    // Get Total Signups
    coinomiaService.getLatestSignup().then(function(res){
      if(res.status === 200) {
        $rootScope.totalUsers = res.data.totalusers;
        $rootScope.latestSignup = res.data.data;
        $rootScope.latestSignup.forEach(function(_info, key) {

          var currentDate = moment().tz("Europe/London");
          var currentTime = currentDate.format("HH:mm:ss");

          var signupDate = moment(_info.DOJ);
          var signupTime = signupDate.format("HH:mm:ss");

          var start = moment.duration(signupTime, "HH:mm:ss");
          var end = moment.duration(currentTime, "HH:mm:ss");
          var diff = end.subtract(start);

          var _hours = diff.hours(); // return hours
          var _minutes = diff.minutes(); // return minutes

          $rootScope.latestSignup[key].minutes = (_hours * 60) + _minutes;

        });
      }
    })

    $scope.videoOne = config.videoIdOne;
    $scope.videoTwo = config.videoIdTwo;
    $scope.playerAttr = {
        autoplay: true
    };

    // Open Video Modal
    // $scope.openVideo = function() {
    //   var url = config.academyUrl;
    //   var autoplay = true;
    //   $scope.videoUrl = $sce.trustAsResourceUrl(url+autoplay);
    //   var modalInstance = $uibModal.open({
    //       templateUrl: 'views/modal/cloud-mining-video.html',
    //       scope: $scope,
    //       size: 'lg',
    //       windowClass: 'academy-video'
    //   });
    // }
    // $scope.closePopup = function() {
    //   $uibModalStack.dismissAll();
    // }

  });
