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

    $scope.walletHeading = config.wallet;
    $scope.currentPage = config.currentPage;
    $scope.productMaxUnit = config.productMaxUnit;
    $scope.btcImagePath = config.btcImagePath;
    $scope.ethImagePath = config.ethImagePath;

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
            products.btcMining = 0;
            $scope.btcProducts.push(products);
          }else{
            products.ethMining = 0;
            $scope.ethProducts.push(products);
          }
          // $scope.total += products.amount;
          // console.log($scope.total);
        });
      }
    });

    // Get Wallet Info
    $scope.walletInfo = function() {
      coinomiaService.getWalletInfo()
        .then(function(res){
          if(res.status === 200){
            $scope.walletData = res.data;
          }
        });
        $scope.getTransctions();
    }

    $scope.getTransctions = function() {
      coinomiaService.getTransactionDetails($scope.currentPage)
        .then(function(res){
          if(res === 200) {
            $scope.transactionDetails = res.data;
          }
        })
    }

    $scope.setBtcQuantity = function(key, val) {
      $scope.btcProducts[key].quantity = val;
    }

    $scope.setEthQuantity = function(key, val) {
      $scope.ethProducts[key].quantity = val;
    }

    $scope.bookOrder = function() {
      console.log($scope);
    }
  });
