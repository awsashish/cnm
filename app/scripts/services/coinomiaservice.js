'use strict';

/**
 * @ngdoc service
 * @name coinomiaFrontendApp.coinomiaService
 * @description
 * # coinomiaService
 * Service in the coinomiaFrontendApp.
 */
angular.module('coinomiaFrontendApp')
  .service('coinomiaService', function ($http, $log, $state, $window, $cookies, $localStorage) {
    this.apiHost = 'http://coinomiaapi.azurewebsites.net/';
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

    this.requestFailed = function (error) {
      $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
    };

    // Login Process
    this.login = function(formData) {
      var data = formData;

      function loginComplete(response) {
        return response;
      }

      function loginFailed(error) {
        $log.error('XHR Failed for login.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost + '/oauth2/token', data, this.loginRequestConfig)
        .then(loginComplete)
        .catch(loginFailed);
    };

    // Sign Up process
    this.signup = function(formData) {
      var data = formData;

      function signupComplete(response) {
        return response;
      }

      function signupFailed(error, status) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(status, true));
        return error;
      }

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
    this.getProducts = function() {

      function getProductsComplete(response) {
        return response.data;
      }

      function getProductsFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.post(this.apiHost +'/user/products/')
        .then(getProductsComplete)
        .catch(getProductsFailed);
    };

    // Get User Location

    this.getUserLocation = function() {
      return $http.get('http://freegeoip.net/json/')
      .catch(this.requestFailed);
    };

    // Authentication
    this.Auth = function() {
      if ($cookies.get('token') || $localStorage.token) {
        $state.go('dashboard');
      }else{
        $state.go('login');
      }
    };

    // Verfying User Email
    this.verifyEmail = function(token) {

      function verificationComplete(response) {
        return response;
      }

      function verificationFailed(error) {
        $log.error('XHR Failed for verification email.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'/user/email-verify/'+token)
        .then(verificationComplete)
        .catch(verificationFailed);
    }
  });
