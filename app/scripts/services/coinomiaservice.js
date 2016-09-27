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
    this.getUserDirects = function(currentPage) {

      function userDirectsComplete(response) {
        return response;
      }

      function userDirectsFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.get(this.apiHost +'user/referral/'+currentPage+'/'+pageLimit)
        .then(userDirectsComplete)
        .catch(userDirectsFailed);
    };

    // All Referrals
    this.getAllReferral = function(currentPage) {

      function getAllReferralComplete(response) {
        return response;
      }

      function getAllReferralFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.get(this.apiHost +'user/all-referral/'+currentPage+'/'+pageLimit)
        .then(getAllReferralComplete)
        .catch(getAllReferralFailed);

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

    // Verify Sponsor
    this.verifySponsor = function(sponsorId) {
      // On Success
      function verfiySponsorRequestComplete(response) {
        return response;
      }

      // On Failed
      function verfiySponsorRequestFailed(error) {
        $log.error('XHR Failed for Verify Sponsor.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'utilities/verify-sponsor', sponsorId)
        .then(verfiySponsorRequestComplete)
        .catch(verfiySponsorRequestFailed);
    }

    // Update Landing Pages
    this.updateLandingPage = function(landingPage) {
      // On Success
      function updateLandingPageRequestComplete(response) {
        return response;
      }

      // On Failed
      function updateLandingPageRequestFailed(error) {
        $log.error('XHR Failed for Verify Sponsor.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/update-landing-page', landingPage)
        .then(updateLandingPageRequestComplete)
        .catch(updateLandingPageRequestFailed);
    }

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

    // Get Packages
    this.getPackages = function() {
      // On Success
      function getPackagesRequestComplete(response) {
        return response;
      }

      // On Failed
      function getPackagesRequestFailed(error) {
        $log.error('XHR Failed for Packages.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'utilities/packages')
        .then(getPackagesRequestComplete)
        .catch(getPackagesRequestFailed);
    }

    // Get User Virtual Tree Info
    this.getVirtualTree = function() {
      // On Success
      function getVirtualTreeRequestComplete(response) {
        return response;
      }

      // On Failed
      function getVirtualTreeRequestFailed(error) {
        $log.error('XHR Failed for Packages.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/virtualtree')
        .then(getVirtualTreeRequestComplete)
        .catch(getVirtualTreeRequestFailed);
    }

    // Get User Downline Info
    this.getUserDownline = function(sponsorId) {
      // On Success
      function getUserDownlineRequestComplete(response) {
        return response;
      }

      // On Failed
      function getUserDownlineRequestFailed(error) {
        $log.error('XHR Failed for Packages.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/tree/'+sponsorId)
        .then(getUserDownlineRequestComplete)
        .catch(getUserDownlineRequestFailed);
    }

    // Get User Team
    this.getTeamCalendar = function() {
      // On Success
      function getTeamRequestComplete(response) {
        return response;
      }

      // On Failed
      function getTeamRequestFailed(error) {
        $log.error('XHR Failed for User Team.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/team-calendar')
        .then(getTeamRequestComplete)
        .catch(getTeamRequestFailed);
    }

    // Get Coinomia Team
    this.getCoinomiaTeamCalendar = function() {
      // On Success
      function getCoinomiaTeamRequestComplete(response) {
        return response;
      }

      // On Failed
      function getCoinomiaTeamRequestFailed(error) {
        $log.error('XHR Failed for User Team.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/coinomia-calendar')
        .then(getCoinomiaTeamRequestComplete)
        .catch(getCoinomiaTeamRequestFailed);
    }

    // Forgot Password
    this.forgotPassword = function(emailId) {
      // On Success
      function forgotPasswordRequestComplete(response) {
        return response;
      }

      // On Failed
      function forgotPasswordRequestFailed(error) {
        $log.error('XHR Failed for Forgot Password.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'forgot-password', emailId)
        .then(forgotPasswordRequestComplete)
        .catch(forgotPasswordRequestFailed);
    }

    // Reset Password
    this.resetPassword = function(resetData) {
      // On Success
      function resetPasswordRequestComplete(response) {
        return response;
      }

      // On Failed
      function resetPasswordRequestFailed(error) {
        $log.error('XHR Failed for Reset Password.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'reset-password', resetData)
        .then(resetPasswordRequestComplete)
        .catch(resetPasswordRequestFailed);
    }

    // Switch to L | R | A | W Placement
    this.switchPlacement = function(placement) {
      // On Success
      function switchPlacementRequestComplete(response) {
        return response;
      }

      // On Failed
      function switchPlacementRequestFailed(error) {
        $log.error('XHR Failed for Switch Placement.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/auto-rotator', placement)
        .then(switchPlacementRequestComplete)
        .catch(switchPlacementRequestFailed);
    }

    // Get User Banners
    this.getBanners = function() {
      // On Success
      function getBannerRequestComplete(response) {
        return response;
      }

      // On Failed
      function getBannerRequestFailed(error) {
        $log.error('XHR Failed for Switch Placement.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/banners')
        .then(getBannerRequestComplete)
        .catch(getBannerRequestFailed);
    }
  });
