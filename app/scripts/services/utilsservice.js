'use strict';

/**
 * @ngdoc service
 * @name coinomiaFrontendApp.UtilsService
 * @description
 * # UtilsService
 * Service in the coinomiaFrontendApp.
 */
angular.module('coinomiaFrontendApp')
  .service('UtilsService', function ($http, $log, $state, $window, $cookies, $localStorage, $filter, config) {

    // Get Country Flag
    this.getCountryFlag = function(countryName) {

      function getCountryFlagComplete(response) {
        response.data = $filter('filter')(response.data, {"name": countryName}, true);
        return response.data;
      }

      function getCountryFlagFailed(error) {
        $log.error('XHR Failed for country flag.\n' + angular.toJson(error.data, true));
      }

      return $http.get('js/countries.json')
        .then(getCountryFlagComplete)
        .catch(getCountryFlagFailed);
    };

    // Get Country Code
    this.getCountryCode = function(countryName) {

      function getCountryCodeComplete(response) {
        return response.data;
      }

      function getCountryCodeFailed(error) {
        $log.error('XHR Failed for country flag.\n' + angular.toJson(error.data, true));
      }

      return $http.get('js/countryToCode.json')
        .then(getCountryCodeComplete)
        .catch(getCountryCodeFailed);
    };


    // Get Dial Code
    this.getCountryCode = function() {

      function getCountryDialCodeComplete(response) {
        return response.data;
      }

      function getCountryDialCodeFailed(error) {
        $log.error('XHR Failed for country flag.\n' + angular.toJson(error.data, true));
      }

      return $http.get('js/countryInfo.json')
        .then(getCountryDialCodeComplete)
        .catch(getCountryDialCodeFailed);
    };

  });
