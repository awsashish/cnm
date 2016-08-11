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
  });
