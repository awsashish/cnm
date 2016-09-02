'use strict';

/**
 * @ngdoc service
 * @name coinomiaFrontendApp.coinomiaService
 * @description
 * # coinomiaService
 * Service in the coinomiaFrontendApp.
 */
angular.module('coinomiaFrontendApp')
  .service('coinomiaService', function ($http, $log, $state, $window, $cookies, $localStorage, config) {
    var pageLimit = config.pageLimit;
    this.apiHost = 'http://coinomiaapi.azurewebsites.net/';
    this.requestConfig = {
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
      $log.error('XHR Failed for User location.\n' + angular.toJson(error.data, true));
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

      return $http.post(this.apiHost + 'oauth2/token', data, this.requestConfig)
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

      return $http.post(this.apiHost + 'user/signup', data)
        .then(signupComplete)
        .catch(signupFailed);
    };

    // Get User Referrals
    this.getUserReferral = function(currentPage) {

      function userReferralComplete(response) {
        return response.data;
      }

      function userReferralFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.get(this.apiHost +'user/referral/'+currentPage+'/'+pageLimit)
        .then(userReferralComplete)
        .catch(userReferralFailed);
    };

    // All Referrals
    this.getReferral = function(currentPage) {

      function getReferralComplete(response) {
        return response.data;
      }

      function getReferralFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.post(this.apiHost +'user/all-referral/'+currentPage+'/'+pageLimit)
        .then(getReferralComplete)
        .catch(getReferralFailed);

    };

    // Change password process
    this.changePassword = function(formData) {
      var data = formData;

      function changePasswordComplete(response) {
        return response;
      }

      function changePasswordFailed(error) {
        $log.error('XHR Failed for change password.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/change-password/', data)
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

      return $http.post(this.apiHost +'utilities/list-countries/')
        .then(getCountriesComplete)
        .catch(getCountriesFailed);
    };

    // Get User Profile
    this.getUserInfo = function() {

      function getInfoComplete(response) {
        return response;
      }

      function getInfoFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/me/')
        .then(getInfoComplete)
        .catch(getInfoFailed);
    };

    // Get Purchased Power
    this.getPurchasePower = function() {

      function getPurchasePowerComplete(response) {
        return response;
      }

      function getPurchasePowerFailed(error) {
        $log.error('XHR Failed for purchase power.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/purchased-power/')
        .then(getPurchasePowerComplete)
        .catch(getPurchasePowerFailed);
    };

    // Current Mining
    this.currentMining = function() {

      function currentMiningComplete(response) {
        return response;
      }

      function currentMiningFailed(error) {
        $log.error('XHR Failed for current mining.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/current-mining/')
        .then(currentMiningComplete)
        .catch(currentMiningFailed);
    };

    // Get Total Income
    this.getTotalIncome = function() {

      function getTotalIncomeComplete(response) {
        return response;
      }

      function getTotalIncomeFailed(error) {
        $log.error('XHR Failed for total income.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/total-income/')
        .then(getTotalIncomeComplete)
        .catch(getTotalIncomeFailed);
    };

    // Get Latest Transaction and Withdrawals
    this.getTransactionDetails = function(currentPage) {

      function transactionComplete(response) {
        return response;
      }

      function transactionFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/transaction/'+currentPage+'/'+pageLimit)
        .then(transactionComplete)
        .catch(transactionFailed);
    };

    // Get Products
    this.getProducts = function() {

      function getProductsComplete(response) {
        return response;
      }

      function getProductsFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/products/')
        .then(getProductsComplete)
        .catch(getProductsFailed);
    };

    // Get User Location

    this.getUserLocation = function() {
      return $http.get('http://freegeoip.net/json/')
      .catch(this.requestFailed);
    };

    // Authentication
    this.isAuthenticated = function() {
      if ($cookies.get('token') || $localStorage.token) {
        return true;
      }else{
        return false;
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

      return $http.get(this.apiHost +'user/email-verify/'+token)
        .then(verificationComplete)
        .catch(verificationFailed);
    }

    // Get Landing Pages & Referral Links
    this.getLandingPages = function() {
      // On Success
      function landingRequestComplete(response) {
        return response;
      }

      // On Failed
      function landingRequestFailed(error) {
        $log.error('XHR Failed for landing pages.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/landing-pages')
        .then(landingRequestComplete)
        .catch(landingRequestFailed);
    }

    // Get Default Sponsor
    this.getDefaultSponsor = function() {
      // On Success
      function defaultSponsorRequestComplete(response) {
        return response;
      }

      // On Failed
      function defaultSponsorRequestFailed(error) {
        $log.error('XHR Failed for Deafult Sponsor.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'utilities/default-sponsor')
        .then(defaultSponsorRequestComplete)
        .catch(defaultSponsorRequestFailed);
    }

    // Get Expiry Time
    // this.getExpiryTime = function() {
    //   if($localStorage.token && $cookies.get('token')) {
    //     var currentTime = moment();
    //     var expiryTime = moment($localStorage.expires);
    //     var callTime = expiryTime.diff(currentTime, 'seconds');
    //
    //     // Set API calling time before 5 sec of the expiry time and converted to milisecond
    //     callTime = (callTime - 5)*1000;
    //     return callTime;
    //   }
    // }

    // Refresh Token Process
    this.getRefreshToken = function(data) {

      function tokenRequestComplete(response) {
        return response;
      }

      function tokenRequestFailed(error) {
        $log.error('XHR Failed for refresh token.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost + 'oauth2/token', data, this.requestConfig)
        .then(tokenRequestComplete)
        .catch(tokenRequestFailed);
    };
  });
