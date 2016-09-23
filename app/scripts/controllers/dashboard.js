'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('DashboardCtrl', function ($scope, $rootScope, coinomiaService, UtilsService, $filter, config) {

    $scope.data = {
      "2016-09-10": {"number": 500, "url": "#"},
      "2016-09-11": {"number": 600, "url": "#"},
      "2016-09-12":{"number": 1200, "url": "#"},
      "2016-08-15": {},
      "2016-09-15": {}
    };

    $scope.company = {
      "2016-09-10": {"number": 1000, "url": "#"},
      "2016-09-11": {"number": 800, "url": "#"},
      "2016-09-12":{"number": 1500, "url": "#"},
      "2016-08-15": {},
      "2016-09-15": {}
    };

    $scope.packagesDetails = [];
    $scope.treeDetails = '';
    $scope.poolDetails = '';
    $scope.contributorDetails = '';
    $scope.rackDetails = '';

    // Sales Commission default values
    $scope.poolContract = config.poolSelectedValue;
    $scope.contributorContract = config.machineSelectedValue;
    $scope.rackContract = config.rackSelectedValue;

    // Current Rates Mining
    $scope.machineMining = config.contributorMining;
    $scope.rackMining = config.rackMining;


    // Mining Payouts dropdown selected value
    $scope.btcPoolContract = config.poolSelectedValue;
    $scope.btcContributorContract = config.machineSelectedValue;
    $scope.btcRackContract = config.rackSelectedValue;
    $scope.ethPoolContract = 0;
    $scope.ethContributorContract = 0;
    $scope.ethRackContract = 0;

    // TH/s and MH/s values
    $scope.btcPoolValue = config.btcPoolValue;
    $scope.btcMachineValue = config.btcMachineValue;
    $scope.btcRackValue = config.btcRackValue;
    $scope.ethPoolValue = config.ethPoolValue;
    $scope.ethMachineValue = config.ethMachineValue;
    $scope.ethRackValue = config.ethRackValue;

    $scope.currentPage = config.currentPage;
    $scope.btcMining = config.btcMining;
    $scope.ethMining = config.ethMining;

    $scope.poolOptions = config.poolDropdown;
    $scope.machineOptions = config.machineDropdown;
    $scope.rackOptions = config.rackDropdown;


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
        iconPath:config.ratesIcon,
        machineMining: config.contributorMining,
        rackMining: config.rackMining
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

    // Get User Virtual Tree
    coinomiaService.getVirtualTree()
    .then(function(res) {
      var virtualData = res.data;
      if(res.status === 200) {
        $scope.treeDetails = virtualData;
        $scope.binaryUsers = virtualData.LeftTotal + virtualData.RightTotal;
        $scope.userPackages();
      }
    })

    // Get User Packages
    $scope.userPackages = function() {
      coinomiaService.getPackages()
      .then(function(res) {
        // $scope.btcIcon = config.btcIcon;
        var packagesData = res.data;
        if(res.status === 200) {
          packagesData.rows.forEach(function(packages) {
            if(packages.PackageName === 'Pool Contract') {
              $scope.poolDetails = packages;
              $scope.poolCalc($scope.treeDetails, $scope.poolContract, $scope.poolDetails);
              $scope.binaryPoolCalc($scope.treeDetails, $scope.poolContract, $scope.poolDetails);
              $scope.btcPoolMining($scope.btcPoolContract, $scope.poolDetails, $scope.currentMining);
              $scope.ethPoolMining($scope.ethPoolContract, $scope.poolDetails, $scope.currentMining);
            }else if(packages.PackageName === 'Contributor') {
              $scope.contributorDetails = packages;
              $scope.contributorCalc($scope.treeDetails, $scope.contributorContract, $scope.contributorDetails);
              $scope.binaryContributorCalc($scope.treeDetails, $scope.contributorContract, $scope.contributorDetails);
              $scope.btcContributorMining($scope.btcContributorContract, $scope.contributorDetails, $scope.currentMining);
              $scope.ethContributorMining($scope.ethContributorContract, $scope.contributorDetails, $scope.currentMining);
            }else {
              $scope.rackDetails = packages;
              $scope.rackCalc($scope.treeDetails, $scope.rackContract, $scope.rackDetails);
              $scope.binaryRackCalc($scope.treeDetails, $scope.rackContract, $scope.rackDetails);
              $scope.btcRackMining($scope.btcRackContract, $scope.rackDetails, $scope.currentMining);
              $scope.ethRackMining($scope.ethRackContract, $scope.rackDetails, $scope.currentMining);
            }
            $scope.packagesDetails.push(packages);
          });
        }
      })
    }

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
    // Direct Pool Commission Calculation
    $scope.poolCalc = function(tree, poolContract, pool) {
      // Formula for Direct Sales Commission (Total Directs * No. of Contracts * Pool Contract Rates) of 12% 
      var poolData = tree.TotalDirect * poolContract * pool.Price * config.directPercent;
      $scope.poolTotal = poolData;
      $scope.paycheck();
    }

    // Binary Pool Commission Calculation
    $scope.binaryPoolCalc = function(tree, poolContract, pool) {
      // Formula for Binary Sales Commission (No. of Contracts * PV * Pairs) * PV Value
      var binaryPoolData = poolContract * pool.PV * tree.VirtualPairs * config.PV;
      $scope.binaryPoolTotal = binaryPoolData;
      $scope.paycheck();
    }

    // Direct Contributor Commission Calculation
    $scope.contributorCalc = function(tree, contributorContract, contributor) {
      // Formula for Direct Sales Commission (Total Directs * No. of Contracts * Pool Contract Rates) of 12% 
      var contributorData = tree.TotalDirect * contributorContract * contributor.Price * config.directPercent;
      $scope.contributorTotal = contributorData;
      $scope.paycheck();
    }

    // Binary Contributor Commission Calculation
    $scope.binaryContributorCalc = function(tree, contributorContract, contributor) {
      // Formula for Binary Sales Commission (No. of Contracts * PV * Pairs) * PV Value
      var binaryContributorData = contributorContract * contributor.PV * tree.VirtualPairs * config.PV;
      $scope.binaryContributorTotal = binaryContributorData;
      $scope.paycheck();
    }

    // Direct Rack Commission Calculation
    $scope.rackCalc = function(tree, rackContract, rack) {
      // Formula for Direct Sales Commission (Total Directs * No. of Contracts * Pool Contract Rates) of 12% 
      var rackData = tree.TotalDirect * rackContract * rack.Price * config.directPercent;
      $scope.rackTotal = rackData;
      $scope.paycheck();
    }

    // Binary Rack Commission Calculation
    $scope.binaryRackCalc = function(tree, rackContract, rack) {
      // Formula for Binary Sales Commission (No. of Contracts * PV * Pairs) * PV Value
      var binaryRackData = rackContract * rack.PV * tree.VirtualPairs * config.PV;
      $scope.binaryRackTotal = binaryRackData;
      $scope.paycheck();
    }

    // Calculate Total Paycheck
    $scope.paycheck = function() {
      $scope.payCheckTotal = $scope.poolTotal + $scope.binaryPoolTotal + $scope.contributorTotal + $scope.binaryContributorTotal + $scope.rackTotal + $scope.binaryRackTotal;
    }

    $scope.btcPoolMining = function(value, pool, mining) {
      var btcValue = pool.Price * value;
      $scope.totalBtcPool = mining.btcMining * value;
      $scope.btcPoolTotalUsd = mining.btcUsd * value;
      $scope.btcPoolPrice = btcValue;
      $scope.totalBtc();
    }

    $scope.btcContributorMining = function(value, contributor, mining) {
      var btcContributorValue = contributor.Price * value;
      $scope.totalBtcContributor = mining.btcMining * value * config.contributorMining;
      $scope.btcContributorTotalUsd = mining.btcUsd * value * config.contributorMining;
      $scope.btcContributorPrice = btcContributorValue;
      $scope.totalBtc();
    }

    $scope.btcRackMining = function(value, rack, mining) {
      var btcRackValue = rack.Price * value;
      $scope.totalBtcRack = mining.btcMining * value * config.rackMining;
      $scope.btcRackTotalUsd = mining.btcUsd * value * config.rackMining;
      $scope.btcRackPrice = btcRackValue;
      $scope.totalBtc();
    }

    $scope.ethPoolMining = function(value, pool, mining) {
      var ethValue = pool.Price * value;
      $scope.totalEthPool = mining.ethMining * value;
      $scope.ethPoolTotalUsd = mining.ethUsd * value;
      $scope.ethPoolPrice = ethValue;
      $scope.totalEth();
    }

    $scope.ethContributorMining = function(value, contributor, mining) {
      var ethContributorValue = contributor.Price * value;
      $scope.totalEthContributor = mining.ethMining * value * config.contributorMining;
      $scope.ethContributorTotalUsd = mining.ethUsd * value * config.contributorMining;
      $scope.ethContributorPrice = ethContributorValue;
      $scope.totalEth();
    }

    $scope.ethRackMining = function(value, rack, mining) {
      var ethRackValue = rack.Price * value;
      $scope.totalEthRack = mining.ethMining * value * config.rackMining;
      $scope.ethRackTotalUsd = mining.ethUsd * value * config.rackMining;
      $scope.ethRackPrice = ethRackValue;
      $scope.totalEth();
    }

    $scope.totalBtc = function () {
      if($scope.totalBtcPool === 0 && $scope.totalBtcContributor === 0 && $scope.totalBtcRack === 0) {
        $scope.finalBtc = 0;
        $scope.finalBtcUsd = 0;
      }else{
        $scope.finalBtc = $scope.totalBtcPool + $scope.totalBtcContributor + $scope.totalBtcRack;
        $scope.finalBtcUsd = $scope.btcPoolTotalUsd + $scope.btcContributorTotalUsd + $scope.btcRackTotalUsd;
      }
    }

    $scope.totalEth = function () {
      if($scope.totalEthPool === 0 && $scope.totalEthContributor === 0 && $scope.totalEthRack === 0) {
        $scope.finalEth = 0;
        $scope.finalEthUsd = 0;
      }else{
        $scope.finalEth = $scope.totalEthPool + $scope.totalEthContributor + $scope.totalEthRack;
        $scope.finalEthUsd = $scope.ethPoolTotalUsd + $scope.ethContributorTotalUsd + $scope.ethRackTotalUsd;
      }

    }

    $scope.miningCalculate = function(btcValue, btcUsd, ethValue, ethUsd, event) {
      $scope.estIncome = [];
      var dailyUsd = btcUsd + ethUsd;
      var daily = {duration:'Daily', btc:btcValue, eth:ethValue, miningUsd: dailyUsd };
      var weekly = {duration:'Weekly', btc:btcValue*config.DAYS_IN_A_WEEK, eth:ethValue*config.DAYS_IN_A_WEEK, miningUsd: dailyUsd*config.DAYS_IN_A_WEEK };
      var monthly = {duration:'Monthly', btc:btcValue*config.DAYS_IN_A_MONTH, eth:ethValue*config.DAYS_IN_A_MONTH, miningUsd: dailyUsd*config.DAYS_IN_A_MONTH };
      var annually = {duration:'Annually', btc:btcValue*config.DAYS_IN_A_YEAR, eth:ethValue*config.DAYS_IN_A_YEAR, miningUsd: dailyUsd*config.DAYS_IN_A_YEAR };
      var monthly_15 = {duration:'15 Monthly', btc:btcValue*config.DAYS_IN_A_15_MONTHLY, eth:ethValue*config.DAYS_IN_A_15_MONTHLY, miningUsd: dailyUsd*config.DAYS_IN_A_15_MONTHLY };
      $scope.estIncome.push(daily);
      $scope.estIncome.push(weekly);
      $scope.estIncome.push(monthly);
      $scope.estIncome.push(annually);
      $scope.estIncome.push(monthly_15);
    }

    $scope.btcPoolClick = function(value, pool, mining) {
      $scope.btcPoolContract = config.poolSelectedValue;
      $scope.ethPoolContract = 0;
      $scope.ethPoolMining($scope.ethPoolContract, pool, mining);
      $scope.btcPoolMining($scope.btcPoolContract, pool, mining);
    }

    $scope.ethPoolClick = function(value, pool, mining) {
      $scope.ethPoolContract = config.poolSelectedValue;
      $scope.btcPoolContract = 0;
      $scope.btcPoolMining($scope.btcPoolContract, pool, mining);
      $scope.ethPoolMining($scope.ethPoolContract, pool, mining);
    }

    $scope.btcMachineClick = function(value, contributor, mining) {
      $scope.btcContributorContract = config.machineSelectedValue
      $scope.ethContributorContract = 0;
      $scope.ethContributorMining($scope.ethContributorContract, contributor, mining);
      $scope.btcContributorMining($scope.btcContributorContract, contributor, mining);
    }

    $scope.ethMachineClick = function(value, contributor, mining) {
      $scope.ethContributorContract = config.machineSelectedValue;
      $scope.btcContributorContract = 0;
      $scope.btcContributorMining($scope.btcContributorContract, contributor, mining);
      $scope.ethContributorMining($scope.ethContributorContract, contributor, mining);
    }

    $scope.btcRackClick = function(value, rack, mining) {
      $scope.btcRackContract = config.rackSelectedValue;
      $scope.ethRackContract = 0;
      $scope.ethRackMining($scope.ethRackContract, rack, mining);
      $scope.btcRackMining($scope.btcRackContract, rack, mining);
    }

    $scope.ethRackClick = function(value, rack, mining) {
      $scope.ethRackContract = config.rackSelectedValue;
      $scope.btcRackContract = 0;
      $scope.btcRackMining($scope.btcRackContract, rack, mining);
      $scope.ethRackMining($scope.ethRackContract, rack, mining);
    }

   });
