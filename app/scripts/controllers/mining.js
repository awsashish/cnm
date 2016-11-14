'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MiningCtrl
 * @description
 * # MiningCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('MiningCtrl', function ($scope, $uibModal, $uibModalStack, $window, coinomiaService, config) {

    $scope.walletHeading = config.wallet;
    $scope.currentPage = config.currentPage;
    $scope.ethPoolCurrentPage = config.currentPage;
    $scope.ethMachineCurrentPage = config.currentPage;
    $scope.ethRackCurrentPage = config.currentPage;

    $scope.btcPoolCurrentPage = config.currentPage;
    $scope.btcMachineCurrentPage = config.currentPage;
    $scope.btcRackCurrentPage = config.currentPage;

    $scope.productMaxUnit = config.productMaxUnit;
    $scope.btcImagePath = config.btcImagePath;
    $scope.ethImagePath = config.ethImagePath;
    $scope.pageLimit = config.pageLimit;

    $scope.package = ['pool', 'rack', 'machine'];

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


    // Close Modal 
      $scope.closeModal = function() {
        $uibModalStack.dismissAll();
        $window.location.reload();
      }

    // Select Payment Mode
    $scope.selectPayment = function() {
      $scope.noOrder = false;
      $scope.payment = {
        mode:"BTC"
      }

      $scope.orderDetails = [];
      var i = 0, j=0;
      $scope.btcProducts.forEach(function(btcInfo) {
        if(btcInfo.quantity !== 0) {
          var btcAmount = btcInfo.amount*btcInfo.btcMining/btcInfo.miningpower;
          $scope.purchaseTotal += btcAmount;
          $scope.orderDetails.push({data:{id:btcInfo.id, quantity:btcInfo.quantity}, name:btcInfo.productname, price:btcAmount, path:$scope.btcImagePath[i]});
        }
        i++;
      });

      console.log($scope.orderDetails);

      $scope.ethProducts.forEach(function(ethInfo) {
        if(ethInfo.quantity !== 0) {
          var ethAmount = ethInfo.amount * ethInfo.ethMining/ethInfo.miningpower;
          $scope.purchaseTotal += ethAmount;
          $scope.orderDetails.push({data:{id:ethInfo.id, quantity:ethInfo.quantity}, name:ethInfo.productname,  price:ethAmount, path:$scope.ethImagePath[j]});
          j++;
        }
      });

      $scope.orderParams = [];
      
      $scope.orderDetails.forEach(function(info) {
        if(info.data.quantity !== undefined) {
          $scope.orderParams.push(info.data);
        }
      });

      if($scope.orderParams.length > 0) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal/purchase-contract.html',
            scope: $scope,
            size: 'md'
        });
      }else{
        $scope.noOrder = true;
      }
      

    }

    $scope.purchaseTotal = 0;

    $scope.bookOrder = function(payment) {
      $scope.loadingData = true;

      var orderData = {
        "payment_method": payment.mode,
        "payment_type": "",
        "OrderDetails" : $scope.orderParams
      } 

      // console.log(orderData);
      // Book Order 
      coinomiaService.bookOrder(orderData).then(function(res) {
        $uibModalStack.dismissAll();
        $scope.loadingData = false;
        if(res.status === 200) {
          var data = res.data;
          if(data.message !== 'success') {
            $scope.noBalance = true;
          }else{
            $scope.purchase = data;
            $scope.orderDetails = $scope.orderDetails;
          }

          var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/purchase-invoice.html',
                scope: $scope,
                size: 'md',
                backdrop: 'static'
            });
        }
      })
    }

    // Get Purchase History
    $scope.purchaseEthPool = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
      .then(function(res){
        if(res.status === 200) {
          var data = res.data;
          $scope.ethPoolPower = data.TotalPower;
          $scope.ethPoolEstimateIncome = data.estimated_total_income;
          $scope.ethPoolCurrentRate = data.current_rate;
          $scope.ethPoolRecords = data.records.total;
          $scope.ethPoolDetails = data.records.rows;
          if($scope.ethPoolRecords === 0) {
            $scope.noEthPoolRecords = true;
          }
        }
      })
    }


    $scope.purchaseEthMachine = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
      .then(function(res){
        if(res.status === 200) {
          var data = res.data;
          $scope.ethMachinePower = data.TotalPower;
          $scope.ethMachineEstimateIncome = data.estimated_total_income;
          $scope.ethMachineCurrentRate = data.current_rate;
          $scope.ethMachineRecords = data.records.total;
          $scope.ethMachineDetails = data.records.rows;
          if($scope.ethMachineRecords === 0) {
            $scope.noEthMachineRecords = true;
          }
        }
      })
    }

    $scope.purchaseEthRack = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
      .then(function(res){
        if(res.status === 200) {
          var data = res.data;
          $scope.ethRackPower = data.TotalPower;
          $scope.ethRackEstimateIncome = data.estimated_total_income;
          $scope.ethRackCurrentRate = data.current_rate;
          $scope.ethRackRecords = data.records.total;
          $scope.ethRackDetails = data.records.rows;
          if($scope.ethRackRecords === 0) {
            $scope.noEthRackRecords = true;
          }
        }
      })
    }


    // Get Purchase History
    $scope.purchaseBtcPool = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
      .then(function(res){
        if(res.status === 200) {
          var data = res.data;
          $scope.btcPoolPower = data.TotalPower;
          $scope.btcPoolEstimateIncome = data.estimated_total_income;
          $scope.btcPoolCurrentRate = data.current_rate;
          $scope.btcPoolRecords = data.records.total;
          $scope.btcPoolDetails = data.records.rows;
          if($scope.btcPoolRecords === 0) {
            $scope.nobtcPoolRecords = true;
          }
        }
      })
    }


    $scope.purchaseBtcMachine = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
      .then(function(res){
        if(res.status === 200) {
          var data = res.data;
          $scope.btcMachinePower = data.TotalPower;
          $scope.btcMachineEstimateIncome = data.estimated_total_income;
          $scope.btcMachineCurrentRate = data.current_rate;
          $scope.btcMachineRecords = data.records.total;
          $scope.btcMachineDetails = data.records.rows;
          if($scope.btcMachineRecords === 0) {
            $scope.nobtcMachineRecords = true;
          }
        }
      })
    }

    $scope.purchaseBtcRack = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
      .then(function(res){
        if(res.status === 200) {
          var data = res.data;
          $scope.btcRackPower = data.TotalPower;
          $scope.btcRackEstimateIncome = data.estimated_total_income;
          $scope.btcRackCurrentRate = data.current_rate;
          $scope.btcRackRecords = data.records.total;
          $scope.btcRackDetails = data.records.rows;
          if($scope.btcRackRecords === 0) {
            $scope.nobtcRackRecords = true;
          }
        }
      })
    }

    $scope.purchaseEthPool('ETH', 'pool', $scope.ethPoolCurrentPage);
    $scope.purchaseEthMachine('ETH', 'machine', $scope.ethMachineCurrentPage);
    $scope.purchaseEthRack('ETH', 'rack', $scope.ethRackCurrentPage);

    $scope.purchaseBtcPool('BTC', 'pool', $scope.btcPoolCurrentPage);
    $scope.purchaseBtcMachine('BTC', 'machine', $scope.btcMachineCurrentPage);
    $scope.purchaseBtcRack('BTC', 'rack', $scope.btcRackCurrentPage);
  });
