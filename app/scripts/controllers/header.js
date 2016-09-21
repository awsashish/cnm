'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('HeaderCtrl', function ($scope, $cookies, $state, $rootScope, $localStorage, $timeout, coinomiaService, UtilsService) {

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
          $rootScope.name = data.name;
          $rootScope.sponsorId = data.username;
          $rootScope.country = data.Country;
          $scope.getFlag($rootScope.country);
        }
      });
    }

    $scope.getUserDetails();

    $scope.getFlag = function(countryName) {
      UtilsService.getCountryFlag(countryName).then(function(res){
        $scope.countryFlag = res[0];
      });
    }
  });
