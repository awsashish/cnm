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
    $scope.payoutCurrentPage = config.currentPage;
    $scope.ethPoolCurrentPage = config.currentPage;
    $scope.ethMachineCurrentPage = config.currentPage;
    $scope.ethRackCurrentPage = config.currentPage;

    $scope.btcPoolCurrentPage = config.currentPage;
    $scope.btcMachineCurrentPage = config.currentPage;
    $scope.btcRackCurrentPage = config.currentPage;

    $scope.dashPoolCurrentPage = config.currentPage;
    $scope.dashMachineCurrentPage = config.currentPage;
    $scope.dashRackCurrentPage = config.currentPage;

    $scope.productMaxUnit = config.productMaxUnit;
    $scope.btcImagePath = config.btcImagePath;
    $scope.ethImagePath = config.ethImagePath;
    $scope.dashImagePath = config.dashImagePath;
    $scope.pageLimit = config.pageLimit;
    $scope.oldPackage = config.oldPackage;

    $scope.package = ['pool', 'rack', 'machine'];

    $scope.total = 0;
    // Get Products
    coinomiaService.getProducts()
    .then(function(res) {
      var productsData = res.data;
      $scope.btcProducts = [];
      $scope.ethProducts = [];
      $scope.dashProducts = [];
      if(res.status === 200) {
        var k = 0;
        productsData.forEach(function(products) {          
          if(products.coin === 'BTC' && $scope.oldPackage[k] !== products.productname) {
            products.btcMining = 0;
            products.quantity = 0;
            $scope.btcProducts.push(products);
          }else if(products.coin === 'ETH' && $scope.oldPackage[k] !== products.productname){
            products.ethMining = 0;
            products.quantity = 0;
            $scope.ethProducts.push(products);
          }else if(products.coin === 'DASH' && $scope.oldPackage[k] !== products.productname){
            products.dashMining = 0;
            products.quantity = 0;
            $scope.dashProducts.push(products);
          }
          k++;
          // $scope.total += products.amount;
          // console.log($scope.btcProducts);
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

    // Get Mining Payouts
    $scope.miningPayouts = function(payoutCurrentPage) {
      coinomiaService.getPayouts(payoutCurrentPage)
        .then(function(res){
          if(res.status === 200) {
            var data = res.data;
            $scope.payoutDetails = data.rows;
            $scope.payoutTotal = data.total;
            if($scope.payoutTotal === 0) {
              $scope.noPayout = true;
            }
          }
        })
    }

    $scope.setBtcQuantity = function(key, val) {
      $scope.btcProducts[key].quantity = val;
    }

    $scope.calculateBtcAmount = function(key, quantity, miningpower, maxUnit) {
      if(quantity > maxUnit) {
        $scope.btcProducts[key].quantity = maxUnit;
        $scope.btcProducts[key].btcMining = maxUnit*miningpower;
        angular.element("#quantity-"+key).parent().find(".price-slider .ui-slider-handle > label").html($scope.btcProducts[key].btcMining+'<small>TH/s</small>');
        return false;
      }else{
        $scope.btcProducts[key].btcMining = quantity*miningpower;
        angular.element("#quantity-"+key).parent().find(".price-slider .ui-slider-handle > label").html($scope.btcProducts[key].btcMining+'<small>TH/s</small>');
      }
    }

    $scope.calculateEthAmount = function(key, quantity, miningpower, maxUnit) {
      if(quantity > maxUnit) {
        $scope.ethProducts[key].quantity = maxUnit;
        $scope.ethProducts[key].ethMining = maxUnit*miningpower;
        angular.element("#quantity-eth-"+key).parent().find(".price-slider .ui-slider-handle > label").html($scope.ethProducts[key].ethMining+'<small>MH/s</small>');
        return false;
      }else{
        $scope.ethProducts[key].ethMining = quantity*miningpower;
        angular.element("#quantity-eth-"+key).parent().find(".price-slider .ui-slider-handle > label").html($scope.ethProducts[key].ethMining+'<small>MH/s</small>');
      }
    }

    $scope.calculateDashAmount = function(key, quantity, miningpower, maxUnit) {
      if(quantity > maxUnit) {
        $scope.dashProducts[key].quantity = maxUnit;
        $scope.dashProducts[key].dashMining = maxUnit*miningpower;
        angular.element("#quantity-dash-"+key).parent().find(".price-slider .ui-slider-handle > label").html($scope.dashProducts[key].dashMining+'<small>MH/s</small>');
        return false;
      }else{
        $scope.dashProducts[key].dashMining = quantity*miningpower;
        angular.element("#quantity-dash-"+key).parent().find(".price-slider .ui-slider-handle > label").html($scope.dashProducts[key].dashMining+'<small>MH/s</small>');
      }
    }

    $scope.setEthQuantity = function(key, val) {
      $scope.ethProducts[key].quantity = val;
    }

    $scope.setDashQuantity = function(key, val) {
      $scope.dashProducts[key].quantity = val;
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
      var i = 0, j=0, k=0;
      
      $scope.dashProducts.forEach(function(dashInfo) {
        if(dashInfo.quantity !== 0 && dashInfo.quantity !== null) {
          var dashAmount = dashInfo.amount * dashInfo.dashMining/dashInfo.miningpower;
          $scope.purchaseTotal += dashAmount;
          $scope.orderDetails.push({data:{id:dashInfo.id, quantity:dashInfo.quantity}, name:dashInfo.productname,  price:dashAmount, path:$scope.dashImagePath[k]});
        }
        k++;
      });
      
      $scope.btcProducts.forEach(function(btcInfo) {
        if(btcInfo.quantity !== 0 && btcInfo.quantity !== null) {
          var btcAmount = btcInfo.amount*btcInfo.btcMining/btcInfo.miningpower;
          $scope.purchaseTotal += btcAmount;
          $scope.orderDetails.push({data:{id:btcInfo.id, quantity:btcInfo.quantity}, name:btcInfo.productname, price:btcAmount, path:$scope.btcImagePath[i]});
        }
        i++;
      });
      
      $scope.ethProducts.forEach(function(ethInfo) {
        if(ethInfo.quantity !== 0 && ethInfo.quantity !== null) {
          var ethAmount = ethInfo.amount * ethInfo.ethMining/ethInfo.miningpower;
          $scope.purchaseTotal += ethAmount;
          $scope.orderDetails.push({data:{id:ethInfo.id, quantity:ethInfo.quantity}, name:ethInfo.productname,  price:ethAmount, path:$scope.ethImagePath[j]});
        }
        j++;
      });      

      $scope.orderParams = [];
      
      $scope.orderDetails.forEach(function(info) {
        if(info.data.quantity !== undefined && info.data.quantity !== null) {
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

    $scope.printInvoice = function() {
      $window.print();
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
          if(data.message && data.message !== 'success') {
            $scope.noBalance = true;
          }else{
            $scope.purchase = data;
            $scope.orderDetails = $scope.orderDetails;
          }

          $scope.transactionDate = moment().format('YYYY-MM-DD');

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


    $scope.purchaseDashPool = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
      .then(function(res){
        if(res.status === 200) {
          var data = res.data;
          $scope.dashPoolPower = data.TotalPower;
          $scope.dashPoolEstimateIncome = data.estimated_total_income;
          $scope.dashPoolCurrentRate = data.current_rate;
          $scope.dashPoolRecords = data.records.total;
          $scope.dashPoolDetails = data.records.rows;
          if($scope.dashPoolRecords === 0) {
            $scope.noDashPoolRecords = true;
          }
        }
      })
    }


    $scope.purchaseDashMachine = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
      .then(function(res){
        if(res.status === 200) {
          var data = res.data;
          $scope.dashMachinePower = data.TotalPower;
          $scope.dashMachineEstimateIncome = data.estimated_total_income;
          $scope.dashMachineCurrentRate = data.current_rate;
          $scope.dashMachineRecords = data.records.total;
          $scope.dashMachineDetails = data.records.rows;
          if($scope.dashMachineRecords === 0) {
            $scope.noDashMachineRecords = true;
          }
        }
      })
    }

    $scope.purchaseDashRack = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
      .then(function(res){
        if(res.status === 200) {
          var data = res.data;
          $scope.dashRackPower = data.TotalPower;
          $scope.dashRackEstimateIncome = data.estimated_total_income;
          $scope.dashRackCurrentRate = data.current_rate;
          $scope.dashRackRecords = data.records.total;
          $scope.dashRackDetails = data.records.rows;
          if($scope.dashRackRecords === 0) {
            $scope.noDashRackRecords = true;
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

    $scope.purchaseDashPool('DASH', 'pool', $scope.dashPoolCurrentPage);
    $scope.purchaseDashMachine('DASH', 'machine', $scope.dashMachineCurrentPage);
    $scope.purchaseDashRack('DASH', 'rack', $scope.dashRackCurrentPage);

    $scope.purchaseBtcPool('BTC', 'pool', $scope.btcPoolCurrentPage);
    $scope.purchaseBtcMachine('BTC', 'machine', $scope.btcMachineCurrentPage);
    $scope.purchaseBtcRack('BTC', 'rack', $scope.btcRackCurrentPage);
  });
