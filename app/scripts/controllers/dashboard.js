'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('DashboardCtrl', function ($scope, $rootScope, coinomiaService, config) {

    $scope.packagesDetails = [];
    $scope.treeDetails = '';
    $scope.poolDetails = '';
    $scope.contributorDetails = '';
    $scope.rackDetails = '';

    $scope.currentPage = 1;
    $scope.btcMining = 0.5;
    $scope.ethMining = 0.5;

    // Get Purchased Power
    coinomiaService.getPurchasePower()
    .then(function(res) {
      $scope.purchasedParams = {
        title:config.purchasedTitle,
        subTitle:config.purchasedSubTitle,
        iconPath:config.purchasedIcon
      };
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
      $scope.ratesParams = {
        title:config.ratesTitle,
        subTitle:config.ratesSubTitle,
        iconPath:config.ratesIcon
      };
      var miningData = res.data;
      $scope.currentMining = {
        'btcMining':'',
        'ethMining':'',
        'btcUsd':'',
        'ethUsd':''
      };
      if(res.status === 200) {
        miningData.forEach(function(mining) {
          if(mining.coin === 'BTC') {
            $scope.currentMining.btcMining = mining.current_mining;
            $scope.currentMining.btcUsd = mining.USDPrice;
          }else{
            $scope.currentMining.ethMining = mining.current_mining;
            $scope.currentMining.ethUsd = mining.USDPrice;
          }

        });
      }
    });

    // Get Total Income
    coinomiaService.getTotalIncome()
    .then(function(res) {
      $scope.totalParams = {
        title:config.incomeTitle,
        subTitle:config.incomeSubTitle,
        iconPath:config.incomeIcon
      };
      var totalIncomeData = res.data;
      $scope.totalIncome = [];
      if(res.status === 200) {
        totalIncomeData.forEach(function(income) {
          if(income.coin != 'USD') {
            $scope.totalIncome.push(income);
          }
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
        productsData.forEach(function(products) {
          if(products.coin === 'BTC') {
            $scope.btcProducts.push(products);
          }else{
            $scope.ethProducts.push(products);
          }
        });
      }
    });

    // Get User Packages
    coinomiaService.getPackages()
    .then(function(res) {
      $scope.btcIcon = config.btcIcon;
      var packagesData = res.data;
      if(res.status === 200) {
        packagesData.rows.forEach(function(packages) {
          if(packages.PackageName === 'Pool Contract') {
            $scope.poolDetails = packages;
          }else if(packages.PackageName === 'Contributor') {
            $scope.contributorDetails = packages;
          }else {
            $scope.rackDetails = packages;
          }
          $scope.packagesDetails.push(packages);
        });
      }
    })

    // Get User Virtual Tree
    coinomiaService.getVirtualTree()
    .then(function(res) {
      var virtualData = res.data;
      if(res.status === 200) {
        $scope.treeDetails = virtualData;
      }
    })

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
    // Sales Commission Calculation

    // Pool Commission Calculation
    $scope.poolCalc = function(totalDirect, poolContract, poolPrice) {
      var poolData = totalDirect * poolContract * poolPrice * 12;
      $scope.poolTotal = poolData/100;
    }

  });
