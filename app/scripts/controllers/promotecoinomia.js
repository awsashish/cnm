'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:PromotecoinomiaCtrl
 * @description
 * # PromotecoinomiaCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('PromotecoinomiaCtrl', function ($scope, $stateParams, config) {
    
    $scope.activeTab = config.activeTab;

    if($stateParams.tabId) {
      $scope.activeTab = $stateParams.tabId;
    }
  });
