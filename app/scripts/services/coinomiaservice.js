'use strict';

/**
 * @ngdoc service
 * @name coinomiaFrontendApp.coinomiaService
 * @description
 * # coinomiaService
 * Service in the coinomiaFrontendApp.
 */
angular.module('coinomiaFrontendApp')
  .service('coinomiaService', function ($http, $log, $state, $window, $cookies) {
    this.apiHost = 'http://coinomia.azurewebsites.net';
    this.loginRequestConfig = {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj) {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
          }
    };

    // Login Process
    this.login = function(formData, loginComplete, loginFailed) {
      var data = formData;

      // function loginFailed(error) {
      //   $log.error('XHR Failed for login.\n' + angular.toJson(error.data, true));
      // }

      return $http.post(this.apiHost + '/oauth2/token', data, this.loginRequestConfig)
        .then(loginComplete)
        .catch(loginFailed);
    };

    // Sign Up process
    this.signup = function(formData, signupComplete, signupFailed) {
      var data = formData;

      return $http.post(this.apiHost + '/user/signup', data)
        .then(signupComplete)
        .catch(signupFailed);
    };

    // Get User Referrals
    this.getUserReferral = function(currentPage, pageLimit) {

      function userReferralComplete(response) {
        return response.data;
      }

      function userReferralFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.post(this.apiHost +'/user/referral/'+currentPage+'/'+pageLimit)
        .then(userReferralComplete)
        .catch(userReferralFailed);
    };

    // All Referrals
    this.getReferral = function(currentPage, pageLimit) {

      function getReferralComplete(response) {
        return response.data;
      }

      function getReferralFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.post(this.apiHost +'/user/all-referral/'+currentPage+'/'+pageLimit)
        .then(getReferralComplete)
        .catch(getReferralFailed);

    };

    // Change password process
    this.changePassword = function(formData) {
      var data = formData;

      function changePasswordComplete(response) {
        return response.data;
      }

      function changePasswordFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.post(this.apiHost +'/user/change-password/', data)
        .then(changePasswordComplete)
        .catch(changePasswordFailed);
    };

    // Get All Countries
    this.getCountries = function() {

      function getCountriesComplete(response) {
        return response.data;
      }

      function getCountriesFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.post(this.apiHost +'/utilities/list-countries/')
        .then(getCountriesComplete)
        .catch(getCountriesFailed);
    };

    // Get User Profile
    this.userProfile = function() {

      function userProfileComplete(response) {
        return response.data;
      }

      function userProfileFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.post(this.apiHost +'/user/me/')
        .then(userProfileComplete)
        .catch(userProfileFailed);
    };

    // Get Purchased Power
    this.purchasePower = function() {

      function purchasePowerComplete(response) {
        return response.data;
      }

      function purchasePowerFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.post(this.apiHost +'/user/purchased-power/')
        .then(purchasePowerComplete)
        .catch(purchasePowerFailed);
    };

    // Current Mining
    this.currentMining = function() {

      function currentMiningComplete(response) {
        return response.data;
      }

      function currentMiningFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.post(this.apiHost +'/user/current-mining/')
        .then(currentMiningComplete)
        .catch(currentMiningFailed);
    };

    // Get Wallet Info
    this.walletInfo = function(currentPage, pageLimit) {

      function walletInfoComplete(response) {
        return response.data;
      }

      function wallletInfoFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.post(this.apiHost +'/user/transaction/'+currentPage+'/'+pageLimit)
        .then(walletInfoComplete)
        .catch(wallletInfoFailed);
    };

    // Get Products
    this.products = function() {

      function productsComplete(response) {
        return response.data;
      }

      function productsFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.post(this.apiHost +'/user/products/')
        .then(productsComplete)
        .catch(productsFailed);
    };

    // Authentication
    this.Auth = function() {
      var userSession = $window.sessionStorage.getItem('token');
      var userCookies = $cookies.get('token');
      if ($cookies.get('token') || $window.sessionStorage.getItem('token')) {
        $state.go('dashboard');
      }else{
        $state.go('login');
      }
    }
  });
