'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('DashboardCtrl', function ($scope, $rootScope, coinomiaService) {

    $scope.currentPage = 1;

    // Get Purchased Power
    coinomiaService.getPurchasePower()
    .then(function(res) {
      var purchasedData = res.data;
      $scope.purchasedPower = [];
      if(res.status === 200) {
        purchasedData.forEach(function(purchased) {
          $scope.purchasedPower.push(purchased);
        });
      }
    });

    // Get Current Rates
    coinomiaService.currentMining()
    .then(function(res) {
      var miningData = res.data;
      $scope.currentMining = [];
      if(res.status === 200) {
        miningData.forEach(function(mining) {
          $scope.currentMining.push(mining);
        });
      }
    });

    // Get Total Income
    coinomiaService.getTotalIncome()
    .then(function(res) {
      var totalIncomeData = res.data;
      $scope.totalIncome = [];
      if(res.status === 200) {
        totalIncomeData.forEach(function(income) {
          $scope.totalIncome.push(income);
        });
      }
    });

    // Get Products
    coinomiaService.getProducts()
    .then(function(res) {
      var productsData = res.data;
      $scope.btcProducts = [];
      $scope.ethProducts = [];
      if(res.status === 200) {
        var i=1, j=1;
        productsData.forEach(function(products) {
          if(products.coin === 'BTC') {
            products.btcClass = 'btc-pool-'+i;
            $scope.btcProducts.push(products);
            i++;
          }else{
            products.ethClass = 'eth-pool-'+j;
            $scope.ethProducts.push(products);
            i++;
          }
        });
      }
    });

    // Get Latest Transaction and Withdrawals
    coinomiaService.getTransactionDetails($scope.currentPage)
    .then(function(res) {
      var transactionData = res.data;
      $scope.transactionDetails = [];
      if(res.status === 200) {
        $scope.totalRecords = transactionData.total;
        transactionData.rows.forEach(function(transaction) {
          $scope.transactionDetails.push(transaction);
        });
      }
    });
  });
