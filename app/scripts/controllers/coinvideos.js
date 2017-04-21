'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:CoinvideosCtrl
 * @description
 * # CoinvideosCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('CoinvideosCtrl', function ($scope, $stateParams) {
    
    if($stateParams.tabId) {
      $scope.activeTab = $stateParams.tabId;
    }
  
});
