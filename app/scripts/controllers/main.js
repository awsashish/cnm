'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('MainCtrl', function ($scope, $rootScope, $cookies, $state, $window, $location, coinomiaService, config) {

    $rootScope.s3Url = config.s3BucketUrl;

    // Authenticate User
    if($location.path() !== '/terms-and-conditions' && coinomiaService.isAuthenticated){
      $state.go('dashboard');
    }
    
  });
