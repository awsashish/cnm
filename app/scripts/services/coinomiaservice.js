'use strict';

/**
 * @ngdoc service
 * @name coinomiaFrontendApp.coinomiaService
 * @description
 * # coinomiaService
 * Service in the coinomiaFrontendApp.
 */
angular.module('coinomiaFrontendApp')
  .service('coinomiaService', function ($http, $log) {
    this.apiHost = 'http://http://coinomia.azurewebsites.net';

    // Login Process
    this.login = function(formData) {
      var data = formData;
      return $http.post(this.apiHost + '/oauth2/token', data)
        .then(loginComplete)
        .catch(loginFailed);

      function loginComplete(response) {
        return response.data;
      }

      function loginFailed(error) {
        $log.error('XHR Failed for login.\n' + angular.toJson(error.data, true));
      }
    }

    // Sign Up process
    this.signup = function(formData) {
      var data = formData;
      return $http.post(this.apiHost + '/user/signup', data)
        .then(signupComplete)
        .catch(signupFailed);

      function signupComplete(response) {
        return response.data;
      }

      function signupFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }
    }

    // Get User Referrals
    this.getUserReferral = function(currentPage, pageLimit) {
      return $http.post(this.apiHost +'/user/referral/'+currentPage+'/'+pageLimit)
        .then(userReferralComplete)
        .catch(userReferralFailed);

        function userReferralComplete(response) {
          return response.data;
        }

        function userReferralFailed(error) {
          $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
        }
    }

    // All Referrals
    this.getReferral = function(currentPage, pageLimit) {
      return $http.post(this.apiHost +'/user/all-referral/'+currentPage+'/'+pageLimit)
        .then(getReferralComplete)
        .catch(getReferralFailed);

        function getReferralComplete(response) {
          return response.data;
        }

        function getReferralFailed(error) {
          $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
        }
    }

    // Change password process
    this.changePassword = function(formData) {
      var data = formData;
      return $http.post(this.apiHost +'/user/change-password/', data)
        .then(changePasswordComplete)
        .catch(changePasswordFailed);

        function changePasswordComplete(response) {
          return response.data;
        }

        function changePasswordFailed(error) {
          $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
        }
    }

    // Get All Countries
    this.getCountries = function() {
      return $http.post(this.apiHost +'/utilities/list-countries/')
        .then(getCountriesComplete)
        .catch(getCountriesFailed);

        function getCountriesComplete(response) {
          return response.data;
        }

        function getCountriesFailed(error) {
          $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
        }
    }

    // Get User Profile
    this.userProfile = function() {
      return $http.post(this.apiHost +'/user/me/')
        .then(userProfileComplete)
        .catch(userProfileFailed);

        function userProfileComplete(response) {
          return response.data;
        }

        function userProfileFailed(error) {
          $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
        }
    }
  });
