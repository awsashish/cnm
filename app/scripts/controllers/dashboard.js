'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('DashboardCtrl', function ($scope, $sce, $rootScope, $localStorage, $location, $uibModal, $uibModalStack, coinomiaService, UtilsService, $filter, config, $interval, $timeout) {

    $scope.goToSection = function(id) {
      $location.hash(id);
    }

    $scope.hasDirectReferral = false;
    $scope.hasBinaryReferral = false;

    $scope.packagesDetails = [];
    $scope.treeDetails = '';
    $scope.poolDetails = '';
    $scope.contributorDetails = '';
    $scope.rackDetails = '';

    $scope.salesDirectHeading = config.salesDirectHeading;
    $scope.salesDirectImage = config.salesDirectImage;
    $scope.salesBinaryHeading = config.salesBinaryHeading;
    $scope.salesBinaryImage = config.salesBinaryImage;

    // Rewards Section 
    $scope.allRewards = [];
    $scope.weekRewards = [];

    // Sales Commission default values
    $scope.poolContract = config.poolSelectedValue;
    $scope.contributorContract = config.machineSelectedValue;
    $scope.rackContract = config.rackSelectedValue;
    $scope.dashContract = config.dashSelectedValue;

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
    $scope.dashPoolContract = 0;
    $scope.dashContributorContract = 0;
    $scope.dashRackContract = 0;
    $scope.moneroPoolContract = 0;
    $scope.moneroContributorContract = 0;
    $scope.moneroRackContract = 0;
    $scope.litePoolContract = 0;
    $scope.liteContributorContract = 0;
    $scope.liteRackContract = 0;

    // TH/s and MH/s values
    $scope.btcPoolValue = config.btcPoolValue;
    $scope.btcMachineValue = config.btcMachineValue;
    $scope.btcRackValue = config.btcRackValue;
    $scope.ethPoolValue = config.ethPoolValue;
    $scope.ethMachineValue = config.ethMachineValue;
    $scope.ethRackValue = config.ethRackValue;
    $scope.dashPoolValue = config.dashPoolValue;
    $scope.dashMachineValue = config.dashMachineValue;
    $scope.dashRackValue = config.dashRackValue;
    $scope.moneroPoolValue = config.moneroPoolValue;
    $scope.moneroMachineValue = config.moneroMachineValue;
    $scope.moneroRackValue = config.moneroRackValue;
    $scope.litePoolValue = config.litePoolValue;
    $scope.liteMachineValue = config.liteMachineValue;
    $scope.liteRackValue = config.liteRackValue;

    $scope.currentPage = config.currentPage;

    $scope.poolOptions = config.poolDropdown;
    $scope.machineOptions = config.machineDropdown;
    $scope.rackOptions = config.rackDropdown;
    
    $scope.packageImage = config.productImage;

    // Get Date Ranges
    var startDate = moment('2016-09-01').format('YYYY-MM-DD');
    var endDate = moment('2016-09-26').format('YYYY-MM-DD');

    $scope.getDates = [];
    while(startDate <= endDate) {
      $scope.getDates.push(moment(startDate).format('YYYY-MM-DD'));
      // console.log($scope.getDates);
      startDate = moment(startDate).add(1, 'day').format('YYYY-MM-DD');
    }

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
      var btcCoin = {};
      var dashCoin = {};
      var ethCoin = {};
      var liteCoin = {};
      if(res.status === 200) {
        purchasedData.forEach(function(purchased) {
          if(purchased.coin == 'MONERO'){
            $scope.purchasedPower.push(purchased);
          }
          else if(purchased.coin == 'DASH'){
            dashCoin = purchased;
          }
          else if(purchased.coin == 'BTC'){
            btcCoin = purchased;
          }
          else if(purchased.coin == 'LITE'){
            liteCoin = purchased;
          }
          else{
            ethCoin = purchased;
          }
        });
        $scope.purchasedPower.push(liteCoin);
        $scope.purchasedPower.push(dashCoin);
        $scope.purchasedPower.push(btcCoin);
        $scope.purchasedPower.push(ethCoin);
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
        'btc2Mining':'',
        'ethMining':'',
        'dashMining':'',
        'moneroMining':'',
        'liteMining':'',
        'btcUsd':'',
        'btc2Usd':'',
        'ethUsd':'',
        'dashUSD':'',
        'moneroUsd':'',
        'liteUsd': ''
      };
     
      if(res.status === 200) {
        miningData.forEach(function(mining) {
          if($scope.currentMining.btc2Mining === '' && mining.coin === 'BTC' && mining.miningpower === 3) {
            $scope.currentMining.btcMining = mining.product_mining_rate;
            $scope.currentMining.btcUsd = mining.USDPrice;
          }else if($scope.currentMining.btc2Mining === '' && mining.coin === 'BTC' && mining.miningpower === 2) {
            $scope.currentMining.btc2Mining = mining.product_mining_rate;
            $scope.currentMining.btc2Usd = mining.USDPrice;
          }else if($scope.currentMining.ethMining === '' && mining.coin === 'ETH'){
            $scope.currentMining.ethMining = mining.product_mining_rate;
            $scope.currentMining.ethUsd = mining.USDPrice;
          }else if($scope.currentMining.dashMining === '' && mining.coin === 'DASH'){
            $scope.currentMining.dashMining = mining.product_mining_rate;
            $scope.currentMining.dashUsd = mining.USDPrice;
          }else if($scope.currentMining.moneroMining === '' && mining.coin === 'MONERO'){
            $scope.currentMining.moneroMining = mining.product_mining_rate;
            $scope.currentMining.moneroUsd = mining.USDPrice;
          }else if($scope.currentMining.liteMining === '' && mining.coin === 'LITE'){
            $scope.currentMining.liteMining = mining.product_mining_rate;
            $scope.currentMining.liteUsd = mining.USDPrice;
          }
        });
        // console.log($scope.currentMining.dashMining);
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
      $scope.ethIncome = {};
      $scope.btcIncome = {};
      $scope.dashIncome = {};
      $scope.liteIncome = {};
      $scope.totalIncome = [];
      if(res.status === 200) {
        totalIncomeData.forEach(function(income) {
          if(income.coin == 'MONERO') {
            $scope.totalIncome.push(income);
          }else if(income.coin == 'DASH'){
            $scope.dashIncome = income;
          }else if(income.coin == 'BTC'){
            $scope.btcIncome = income;
          }else if(income.coin == 'ETH'){
            $scope.ethIncome = income;
          }else if(income.coin == 'LITE'){
            $scope.liteIncome = income;
          }
        });
        $scope.totalIncome.push($scope.liteIncome);
        $scope.totalIncome.push($scope.dashIncome);
        $scope.totalIncome.push($scope.btcIncome);
        $scope.totalIncome.push($scope.ethIncome);
      }
    });

    // Get User Team
    $scope.myTeam = [];
    $scope.hasMyTeamData = false;
    $scope.loadingData = true;
    coinomiaService.getTeamCalendar()
    .then(function(res) {
      var teamData = res.data;
      if(res.status === 200) {
        teamData.forEach(function(user) {
        var myTeam = coinomiaService.changeDateFormat(user);
        $scope.myTeam.push(myTeam);
          // console.log(date.format('ddd')+'--', date.date());
          // $scope.myTeam[day] = {
          //   "number": parseInt(user.total),
          //   "url": "#"
          // };
        });

        // Get All Dates Between Two Dates
        var dateRange = coinomiaService.getAllDates($scope.myTeam);
        $scope.myTeam = $scope.myTeam.concat(dateRange);

        $scope.loadingData = false;
        $scope.hasMyTeamData = true;
      }
    });

    // Get Coinomia Team
    $scope.coinomiaTeam = [];
    $scope.hasCoinomiaTeamData = false;
    $scope.loadingCoinomiaData = true;
    coinomiaService.getCoinomiaTeamCalendar()
    .then(function(res) {
      var coinomiaTeamData = res.data;
      if(res.status === 200) {
        coinomiaTeamData.forEach(function(user) {
          var _myTeam = coinomiaService.changeDateFormat(user);
          $scope.coinomiaTeam.push(_myTeam);
        });

        // Get All Dates Between Two Dates
        var dateRange = coinomiaService.getAllDates($scope.coinomiaTeam);
        $scope.coinomiaTeam = $scope.coinomiaTeam.concat(dateRange);

        $scope.loadingCoinomiaData = false;
        $scope.hasCoinomiaTeamData = true;
      }
    });

    // Get User Virtual Tree
    coinomiaService.getVirtualTree()
    .then(function(res) {
      var virtualData = res.data;
      if(res.status === 200) {
        $scope.treeDetails = virtualData;
        $scope.hasDirectReferral = true;
        $scope.binaryUsers = virtualData.LeftTotal + virtualData.RightTotal;
        $scope.userPackages();
        $scope.hasBinaryReferral = true;
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
              $scope.dashPoolMining($scope.dashPoolContract, $scope.poolDetails, $scope.currentMining);
              $scope.moneroPoolMining($scope.moneroPoolContract, $scope.poolDetails, $scope.currentMining);
              $scope.litePoolMining($scope.litePoolContract, $scope.poolDetails, $scope.currentMining);
            }else if(packages.PackageName === 'Contributor') {
              $scope.contributorDetails = packages;
              $scope.contributorCalc($scope.treeDetails, $scope.contributorContract, $scope.contributorDetails);
              $scope.binaryContributorCalc($scope.treeDetails, $scope.contributorContract, $scope.contributorDetails);
              $scope.btcContributorMining($scope.btcContributorContract, $scope.contributorDetails, $scope.currentMining);
              $scope.ethContributorMining($scope.ethContributorContract, $scope.contributorDetails, $scope.currentMining);
              $scope.dashContributorMining($scope.dashContributorContract, $scope.contributorDetails, $scope.currentMining);
              $scope.moneroContributorMining($scope.moneroContributorContract, $scope.contributorDetails, $scope.currentMining);
              $scope.liteContributorMining($scope.liteContributorContract, $scope.contributorDetails, $scope.currentMining);
            }else {
              $scope.rackDetails = packages;
              $scope.rackCalc($scope.treeDetails, $scope.rackContract, $scope.rackDetails);
              $scope.binaryRackCalc($scope.treeDetails, $scope.rackContract, $scope.rackDetails);
              $scope.btcRackMining($scope.btcRackContract, $scope.rackDetails, $scope.currentMining);
              $scope.ethRackMining($scope.ethRackContract, $scope.rackDetails, $scope.currentMining);
              $scope.dashRackMining($scope.dashRackContract, $scope.rackDetails, $scope.currentMining);
              $scope.moneroRackMining($scope.moneroRackContract, $scope.rackDetails, $scope.currentMining);
              $scope.liteRackMining($scope.liteRackContract, $scope.rackDetails, $scope.currentMining);
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
      $scope.totalBtcPool = mining.btc2Mining * value;
      $scope.btcPoolTotalUsd = mining.btc2Usd * value;
      $scope.btcPoolPrice = btcValue;
      $scope.totalBtc();
    }

    $scope.btcContributorMining = function(value, contributor, mining) {
      var btcContributorValue = contributor.Price * value;
      $scope.totalBtcContributor = mining.btc2Mining * value * config.contributorMining;
      $scope.btcContributorTotalUsd = mining.btc2Usd * value * config.contributorMining;
      $scope.btcContributorPrice = btcContributorValue;
      $scope.totalBtc();
    }

    $scope.btcRackMining = function(value, rack, mining) {      
      var btcRackValue = rack.Price * value;
      $scope.totalBtcRack = mining.btc2Mining * value * config.rackMining;
      $scope.btcRackTotalUsd = mining.btc2Usd * value * config.rackMining;
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

    $scope.dashPoolMining = function(value, pool, mining) {
      var dashPoolValue = pool.Price * value;
      $scope.totalDashPool = mining.dashMining * value;
      $scope.dashPoolTotalUsd = mining.dashUsd * value;
      $scope.dashPoolPrice = dashPoolValue;
      $scope.totalDash();
    }

    $scope.dashContributorMining = function(value, contributor, mining) {
      var dashContributorValue = contributor.Price * value;
      $scope.totalDashContributor = mining.dashMining * value * config.contributorMining;
      $scope.dashContributorTotalUsd = mining.dashUsd * value * config.contributorMining;
      $scope.dashContributorPrice = dashContributorValue;
      $scope.totalDash();
    }

    $scope.dashRackMining = function(value, rack, mining) {      
      var dashRackValue = rack.Price * value;
      $scope.totalDashRack = mining.dashMining * value * config.rackMining;
      $scope.dashRackTotalUsd = mining.dashUsd * value * config.rackMining;
      $scope.dashRackPrice = dashRackValue;
      $scope.totalDash();
    }

    $scope.moneroPoolMining = function(value, pool, mining) {
      var moneroPoolValue = pool.Price * value;
      $scope.totalMoneroPool = mining.moneroMining * value;
      $scope.moneroPoolTotalUsd = mining.moneroUsd * value;
      $scope.moneroPoolPrice = moneroPoolValue;
      $scope.totalMonero();
    }

    $scope.moneroContributorMining = function(value, contributor, mining) {
      var moneroContributorValue = contributor.Price * value;
      $scope.totalMoneroContributor = mining.moneroMining * value * config.contributorMining;
      $scope.moneroContributorTotalUsd = mining.moneroUsd * value * config.contributorMining;
      $scope.moneroContributorPrice = moneroContributorValue;
      $scope.totalMonero();
    }

    $scope.moneroRackMining = function(value, rack, mining) {
      var moneroRackValue = rack.Price * value;
      $scope.totalMoneroRack = mining.moneroMining * value * config.rackMining;
      $scope.moneroRackTotalUsd = mining.moneroUsd * value * config.rackMining;
      $scope.moneroRackPrice = moneroRackValue;
      $scope.totalMonero();
    }

    $scope.litePoolMining = function(value, pool, mining) {
      var litePoolValue = pool.Price * value;
      $scope.totalLitePool = mining.liteMining * value;
      $scope.litePoolTotalUsd = mining.liteUsd * value;
      $scope.litePoolPrice = litePoolValue;
      $scope.totalLite();
    }

    $scope.liteContributorMining = function(value, contributor, mining) {
      var liteContributorValue = contributor.Price * value;
      $scope.totalLiteContributor = mining.liteMining * value * config.contributorMining;
      $scope.liteContributorTotalUsd = mining.liteUsd * value * config.contributorMining;
      $scope.liteContributorPrice = liteContributorValue;
      $scope.totalLite();
    }

    $scope.liteRackMining = function(value, rack, mining) {      
      var liteRackValue = rack.Price * value;
      $scope.totalLiteRack = mining.liteMining * value * config.rackMining;
      $scope.liteRackTotalUsd = mining.liteUsd * value * config.rackMining;
      $scope.liteRackPrice = liteRackValue;
      $scope.totalLite();
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

    $scope.totalDash = function () {
      if($scope.totalDashPool === 0 && $scope.totalDashContributor === 0 && $scope.totalDashRack === 0) {
        $scope.finalDash = 0;
        $scope.finalDashUsd = 0;
      }else{
        $scope.finalDash = $scope.totalDashPool + $scope.totalDashContributor + $scope.totalDashRack;
        $scope.finalDashUsd = $scope.dashPoolTotalUsd + $scope.dashContributorTotalUsd + $scope.dashRackTotalUsd;
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

    $scope.totalMonero = function () {
      if($scope.totalMoneroPool === 0 && $scope.totalMoneroContributor === 0 && $scope.totalMoneroRack === 0) {
        $scope.finalMonero = 0;
        $scope.finalMoneroUsd = 0;
      }else{
        $scope.finalMonero = $scope.totalMoneroPool + $scope.totalMoneroContributor + $scope.totalMoneroRack;
        $scope.finalMoneroUsd = $scope.moneroPoolTotalUsd + $scope.moneroContributorTotalUsd + $scope.moneroRackTotalUsd;
      }

    }

    $scope.totalLite = function () {
      if($scope.totalLitePool === 0 && $scope.totalLiteContributor === 0 && $scope.totalLiteRack === 0) {
        $scope.finalLite = 0;
        $scope.finalLiteUsd = 0;
      }else{
        $scope.finalLite = $scope.totalLitePool + $scope.totalLiteContributor + $scope.totalLiteRack;
        $scope.finalLiteUsd = $scope.litePoolTotalUsd + $scope.liteContributorTotalUsd + $scope.liteRackTotalUsd;
      }

    }

    $scope.miningCalculate = function(btcValue, btcUsd, ethValue, ethUsd, dashValue, dashUsd, moneroValue, moneroUsd, liteValue, liteUsd, event) {
      $scope.estIncome = [];
      var dailyUsd = btcUsd + ethUsd + dashUsd + moneroUsd;
      var daily = {duration:'Daily', btc:btcValue, eth:ethValue, dash:dashValue, monero:moneroValue, lite:liteValue, miningUsd: dailyUsd };
      var weekly = {duration:'Weekly', btc:btcValue*config.DAYS_IN_A_WEEK, eth:ethValue*config.DAYS_IN_A_WEEK, dash:dashValue*config.DAYS_IN_A_WEEK, monero:moneroValue*config.DAYS_IN_A_WEEK, lite:liteValue*config.DAYS_IN_A_WEEK, miningUsd: dailyUsd*config.DAYS_IN_A_WEEK };
      var monthly = {duration:'Monthly', btc:btcValue*config.DAYS_IN_A_MONTH, eth:ethValue*config.DAYS_IN_A_MONTH, dash:dashValue*config.DAYS_IN_A_MONTH, monero:moneroValue*config.DAYS_IN_A_MONTH, lite:liteValue*config.DAYS_IN_A_MONTH, miningUsd: dailyUsd*config.DAYS_IN_A_MONTH };
      var annually = {duration:'Annually', btc:btcValue*config.DAYS_IN_A_YEAR, eth:ethValue*config.DAYS_IN_A_YEAR, dash:dashValue*config.DAYS_IN_A_YEAR, monero:moneroValue*config.DAYS_IN_A_YEAR, lite:liteValue*config.DAYS_IN_A_YEAR,  miningUsd: dailyUsd*config.DAYS_IN_A_YEAR };
      var monthly_15 = {duration:'15 Monthly', btc:btcValue*config.DAYS_IN_A_15_MONTHLY, eth:ethValue*config.DAYS_IN_A_15_MONTHLY, dash:dashValue*config.DAYS_IN_A_15_MONTHLY, monero:moneroValue*config.DAYS_IN_A_15_MONTHLY, lite:liteValue*config.DAYS_IN_A_15_MONTHLY, miningUsd: dailyUsd*config.DAYS_IN_A_15_MONTHLY };
      $scope.estIncome.push(daily);
      $scope.estIncome.push(weekly);
      $scope.estIncome.push(monthly);
      $scope.estIncome.push(annually);
      $scope.estIncome.push(monthly_15);
    }

    $scope.btcPoolClick = function(value, pool, mining) {
      $scope.btcPoolContract = config.poolSelectedValue;
      $scope.ethPoolContract = 0;
      $scope.dashPoolContract = 0;
      $scope.moneroPoolContract = 0;
      $scope.litePoolContract = 0;
      $scope.ethPoolMining($scope.ethPoolContract, pool, mining);
      $scope.btcPoolMining($scope.btcPoolContract, pool, mining);
      $scope.dashPoolMining($scope.dashPoolContract, pool, mining);
      $scope.moneroPoolMining($scope.moneroPoolContract, pool, mining);
      $scope.litePoolMining($scope.litePoolContract, pool, mining);
    }

    $scope.dashPoolClick = function(value, pool, mining) {
      $scope.dashPoolContract = config.poolSelectedValue;
      $scope.ethPoolContract = 0;
      $scope.btcPoolContract = 0;
      $scope.moneroPoolContract = 0;
      $scope.litePoolContract = 0;
      $scope.ethPoolMining($scope.ethPoolContract, pool, mining);
      $scope.btcPoolMining($scope.btcPoolContract, pool, mining);
      $scope.dashPoolMining($scope.dashPoolContract, pool, mining);
      $scope.moneroPoolMining($scope.moneroPoolContract, pool, mining);
      $scope.litePoolMining($scope.litePoolContract, pool, mining);
    }

    $scope.ethPoolClick = function(value, pool, mining) {
      $scope.ethPoolContract = config.poolSelectedValue;
      $scope.btcPoolContract = 0;
      $scope.dashPoolContract = 0;
      $scope.moneroPoolContract = 0;
      $scope.litePoolContract = 0;
      $scope.ethPoolMining($scope.ethPoolContract, pool, mining);
      $scope.btcPoolMining($scope.btcPoolContract, pool, mining);
      $scope.dashPoolMining($scope.dashPoolContract, pool, mining);
      $scope.moneroPoolMining($scope.moneroPoolContract, pool, mining);
      $scope.litePoolMining($scope.litePoolContract, pool, mining);
    }

    $scope.moneroPoolClick = function(value, pool, mining) {
      $scope.moneroPoolContract = config.poolSelectedValue;
      $scope.btcPoolContract = 0;
      $scope.dashPoolContract = 0;
      $scope.ethPoolContract = 0;
      $scope.litePoolContract = 0;
      $scope.ethPoolMining($scope.ethPoolContract, pool, mining);
      $scope.btcPoolMining($scope.btcPoolContract, pool, mining);
      $scope.dashPoolMining($scope.dashPoolContract, pool, mining);
      $scope.moneroPoolMining($scope.moneroPoolContract, pool, mining);
      $scope.litePoolMining($scope.litePoolContract, pool, mining);
    }

    $scope.litePoolClick = function(value, pool, mining) {
      $scope.litePoolContract = config.poolSelectedValue;
      $scope.btcPoolContract = 0;
      $scope.dashPoolContract = 0;
      $scope.ethPoolContract = 0;
      $scope.moneroPoolContract = 0;
      $scope.ethPoolMining($scope.ethPoolContract, pool, mining);
      $scope.btcPoolMining($scope.btcPoolContract, pool, mining);
      $scope.dashPoolMining($scope.dashPoolContract, pool, mining);
      $scope.moneroPoolMining($scope.moneroPoolContract, pool, mining);
      $scope.litePoolMining($scope.litePoolContract, pool, mining);
    }

    $scope.btcMachineClick = function(value, contributor, mining) {
      $scope.btcContributorContract = config.machineSelectedValue
      $scope.ethContributorContract = 0;
      $scope.dashContributorContract = 0;
      $scope.moneroContributorContract = 0;
      $scope.liteContributorContract = 0;
      $scope.ethContributorMining($scope.ethContributorContract, contributor, mining);
      $scope.btcContributorMining($scope.btcContributorContract, contributor, mining);
      $scope.dashContributorMining($scope.dashContributorContract, contributor, mining);
      $scope.moneroContributorMining($scope.moneroContributorContract, contributor, mining);
      $scope.liteContributorMining($scope.liteContributorContract, contributor, mining);
    }

    $scope.dashMachineClick = function(value, contributor, mining) {
      $scope.dashContributorContract = config.machineSelectedValue
      $scope.ethContributorContract = 0;
      $scope.btcContributorContract = 0;
      $scope.moneroContributorContract = 0;
      $scope.liteContributorContract = 0;
      $scope.ethContributorMining($scope.ethContributorContract, contributor, mining);
      $scope.btcContributorMining($scope.btcContributorContract, contributor, mining);
      $scope.dashContributorMining($scope.dashContributorContract, contributor, mining);
      $scope.moneroContributorMining($scope.moneroContributorContract, contributor, mining);
      $scope.liteContributorMining($scope.liteContributorContract, contributor, mining);
    }

    $scope.ethMachineClick = function(value, contributor, mining) {
      $scope.ethContributorContract = config.machineSelectedValue;
      $scope.btcContributorContract = 0;
      $scope.dashContributorContract = 0;
      $scope.moneroContributorContract = 0;
      $scope.liteContributorContract = 0;
      $scope.ethContributorMining($scope.ethContributorContract, contributor, mining);
      $scope.btcContributorMining($scope.btcContributorContract, contributor, mining);
      $scope.dashContributorMining($scope.dashContributorContract, contributor, mining);
      $scope.moneroContributorMining($scope.moneroContributorContract, contributor, mining);
      $scope.liteContributorMining($scope.liteContributorContract, contributor, mining);
    }

    $scope.moneroMachineClick = function(value, contributor, mining) {
      $scope.moneroContributorContract = config.machineSelectedValue;
      $scope.btcContributorContract = 0;
      $scope.dashContributorContract = 0;
      $scope.ethContributorContract = 0;
      $scope.liteContributorContract = 0;
      $scope.ethContributorMining($scope.ethContributorContract, contributor, mining);
      $scope.btcContributorMining($scope.btcContributorContract, contributor, mining);
      $scope.dashContributorMining($scope.dashContributorContract, contributor, mining);
      $scope.moneroContributorMining($scope.moneroContributorContract, contributor, mining);
      $scope.liteContributorMining($scope.liteContributorContract, contributor, mining);
    }

    $scope.liteMachineClick = function(value, contributor, mining) {
      $scope.liteContributorContract = config.machineSelectedValue;
      $scope.btcContributorContract = 0;
      $scope.dashContributorContract = 0;
      $scope.ethContributorContract = 0;
      $scope.moneroContributorContract = 0;
      $scope.ethContributorMining($scope.ethContributorContract, contributor, mining);
      $scope.btcContributorMining($scope.btcContributorContract, contributor, mining);
      $scope.dashContributorMining($scope.dashContributorContract, contributor, mining);
      $scope.moneroContributorMining($scope.moneroContributorContract, contributor, mining);
      $scope.liteContributorMining($scope.liteContributorContract, contributor, mining);
    }

    $scope.btcRackClick = function(value, rack, mining) {
      $scope.btcRackContract = config.rackSelectedValue;
      $scope.ethRackContract = 0;
      $scope.dashRackContract =0;
      $scope.moneroRackContract = 0;
      $scope.liteRackContract = 0;
      $scope.ethRackMining($scope.ethRackContract, rack, mining);
      $scope.btcRackMining($scope.btcRackContract, rack, mining);
      $scope.dashRackMining($scope.dashRackContract, rack, mining);
      $scope.moneroRackMining($scope.moneroRackContract, rack, mining);
      $scope.liteRackMining($scope.liteRackContract, rack, mining);
    }

    $scope.dashRackClick = function(value, rack, mining) {
      $scope.dashRackContract = config.rackSelectedValue;
      $scope.ethRackContract = 0;
      $scope.btcRackContract = 0;
      $scope.moneroRackContract = 0;
      $scope.liteRackContract = 0;
      $scope.ethRackMining($scope.ethRackContract, rack, mining);
      $scope.btcRackMining($scope.btcRackContract, rack, mining);
      $scope.dashRackMining($scope.dashRackContract, rack, mining);
      $scope.moneroRackMining($scope.moneroRackContract, rack, mining);
      $scope.liteRackMining($scope.liteRackContract, rack, mining);
    }

    $scope.ethRackClick = function(value, rack, mining) {
      $scope.ethRackContract = config.rackSelectedValue;
      $scope.btcRackContract = 0;
      $scope.dashRackContract = 0;
      $scope.moneroRackContract = 0;
      $scope.liteRackContract = 0;
      $scope.ethRackMining($scope.ethRackContract, rack, mining);
      $scope.btcRackMining($scope.btcRackContract, rack, mining);
      $scope.dashRackMining($scope.dashRackContract, rack, mining);
      $scope.moneroRackMining($scope.moneroRackContract, rack, mining);
      $scope.liteRackMining($scope.liteRackContract, rack, mining);
    }

    $scope.moneroRackClick = function(value, rack, mining) {
      $scope.moneroRackContract = config.rackSelectedValue;
      $scope.btcRackContract = 0;
      $scope.dashRackContract = 0;
      $scope.ethRackContract = 0;
      $scope.liteRackContract = 0;
      $scope.ethRackMining($scope.ethRackContract, rack, mining);
      $scope.btcRackMining($scope.btcRackContract, rack, mining);
      $scope.dashRackMining($scope.dashRackContract, rack, mining);
      $scope.moneroRackMining($scope.moneroRackContract, rack, mining);
      $scope.liteRackMining($scope.liteRackContract, rack, mining);
    }

    $scope.liteRackClick = function(value, rack, mining) {
      $scope.liteRackContract = config.rackSelectedValue;
      $scope.btcRackContract = 0;
      $scope.dashRackContract = 0;
      $scope.ethRackContract = 0;
      $scope.moneroRackContract = 0;
      $scope.ethRackMining($scope.ethRackContract, rack, mining);
      $scope.btcRackMining($scope.btcRackContract, rack, mining);
      $scope.dashRackMining($scope.dashRackContract, rack, mining);
      $scope.moneroRackMining($scope.moneroRackContract, rack, mining);
      $scope.liteRackMining($scope.liteRackContract, rack, mining);
    }

    // Open Reward Structure Modal
    // if(!$localStorage.viewPopup) {
    //   var modalInstance = $uibModal.open({
    //       templateUrl: 'views/reward-structure.html',
    //       scope: $scope,
    //       size: 'lg',
    //       backdrop: 'static'
    //   });
    // }

    $scope.videoOne = config.videoIdOne;
    $scope.videoTwo = config.videoIdTwo;
    $scope.playerAttr = {
        autoplay: true
    };

    // Open Video Pop up
    if(!$localStorage.viewPopup) {
      $scope.modalInstance = $uibModal.open({
          templateUrl: 'views/modal/cloud-mining-video.html',
          scope: $scope,
          size: 'lg',
          windowClass: 'academy-video',
      });

      $scope.modalInstance.result.then(function(){
          $localStorage.$default({viewPopup: 1});
      }, function(){
          $localStorage.$default({viewPopup: 1});
      });
    }

    $scope.closeModal = function() {
      $localStorage.$default({viewPopup: 1});
      $uibModalStack.dismissAll();
    }

    $scope.closePopup = function() {
      $localStorage.$default({viewPopup: 1});
      $uibModalStack.dismissAll();
    }

    // Open Angular Modal
    $scope.getReferrals = function() {
      var modalInstance = $uibModal.open({
          templateUrl: 'views/modal/automatic-referrals.html',
          scope: $scope,
          size: 'md'
      });
    }

    // Get All Time Rewards
    $scope.getAllRewards = function() {
      coinomiaService.getAllRewards()
        .then(function(res) {
          if(res.status === 200) {
            $scope.allRewards = res.data;
          }
        })
    }

    // Get All Time Rewards
    $scope.get7daysRewards = function() {
      coinomiaService.get7daysRewards()
        .then(function(res) {
          if(res.status === 200) {
            $scope.weekRewards = res.data;
          }
        })
    }
    // News Ticker Implementation
    $scope.moving = false;
    $scope.moveDown = function() {
        $scope.moving = true;
        $timeout($scope.switchFirst, 1000);
    };
    $scope.switchFirst = function() {
        $scope.weekRewards.push($scope.weekRewards.shift());
        $scope.allRewards.push($scope.allRewards.shift());
        $scope.moving = false;
        $scope.$apply();
    };

    $interval($scope.moveDown, 3000);

    // Get Available Package
    $scope.packageStock = function() {
      coinomiaService.getPackageStock()
        .then(function(res) {
          if(res.status === 200) {
            $scope.availablePackage = res.data;
          }
        });
    }

    $scope.packageStock();
    $scope.getAllRewards();
    $scope.get7daysRewards();
    
   });
