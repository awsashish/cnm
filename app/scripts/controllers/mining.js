'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MiningCtrl
 * @description
 * # MiningCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('MiningCtrl', function ($scope, coinomiaService, config) {

    $scope.productMaxUnit = config.productMaxUnit;
    $scope.total = 0;
    // Get Products
    coinomiaService.getProducts()
    .then(function(res) {
      var productsData = res.data;
      $scope.btcProducts = [];
      $scope.ethProducts = [];
      if(res.status === 200) {
        productsData.forEach(function(products) {
          if(products.coin === 'BTC') {
            products.btcMining = products.miningpower;
            $scope.btcProducts.push(products);
          }else{
            products.ethMining = products.miningpower;
            $scope.ethProducts.push(products);
          }
          $scope.total += products.amount;
        });
      }
    });

    $scope.updateTotal =  function(btcTotal, ethTotal) {
      $scope.total = btcTotal+ethTotal;
    }
  });
