'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:SuccessCtrl
 * @description
 * # SuccessCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('SuccessCtrl', function ($scope, config) {

    $scope.s3Url = config.s3BucketUrl;

  });
