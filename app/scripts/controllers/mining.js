'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:MiningCtrl
 * @description
 * # MiningCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('MiningCtrl', function ($scope, $uibModal, $uibModalStack, $window, coinomiaService, config, $stateParams) {

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

    $scope.moneroPoolCurrentPage = config.currentPage;
    $scope.moneroMachineCurrentPage = config.currentPage;
    $scope.moneroRackCurrentPage = config.currentPage;

    $scope.viaPoolCurrentPage = config.currentPage;
    $scope.viaMachineCurrentPage = config.currentPage;
    $scope.viaRackCurrentPage = config.currentPage;

    $scope.litePoolCurrentPage = config.currentPage;
    $scope.liteMachineCurrentPage = config.currentPage;
    $scope.liteRackCurrentPage = config.currentPage;

    $scope.productMaxUnit = config.productMaxUnit;
    $scope.btcImagePath = config.btcImagePath;
    $scope.ethImagePath = config.ethImagePath;
    $scope.dashImagePath = config.dashImagePath;
    $scope.moneroImagePath = config.moneroImagePath;
    $scope.viaImagePath = config.viaImagePath;
    $scope.ltcImagePath = config.ltcImagePath;
    $scope.pageLimit = config.pageLimit;
    $scope.oldPackage = config.oldPackage;

    $scope.package = ['pool', 'rack', 'machine'];

    $scope.total = 0;

    if($stateParams.orderTab) {
      $scope.activeTab = $stateParams.orderTab;
    }

    // Get Products
    coinomiaService.getProducts()
    .then(function(res) {
      var productsData = res.data;
      $scope.btcProducts = [];
      $scope.ethProducts = [];
      $scope.dashProducts = [];
      $scope.moneroProducts = [];
      $scope.viaProducts = [];
      $scope.ltcProducts = [];
      if(res.status === 200) {
        console.log(productsData);
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
          }else if(products.coin === 'MONERO' && $scope.oldPackage[k] !== products.productname){
            products.moneroMining = 0;
            products.quantity = 0;
            $scope.moneroProducts.push(products);
          }
          else if(products.coin === 'VIA' && $scope.oldPackage[k] !== products.productname){
            products.viaMining = 0;
            products.quantity = 0;
            $scope.viaProducts.push(products);
          }
          else if(products.coin === 'LITE' && $scope.oldPackage[k] !== products.productname){
            products.liteMining = 0;
            products.quantity = 0;
            $scope.ltcProducts.push(products);
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

    $scope.calculateMoneroAmount = function(key, quantity, miningpower, maxUnit) {
      if(quantity > maxUnit) {
        $scope.moneroProducts[key].quantity = maxUnit;
        $scope.moneroProducts[key].moneroMining = maxUnit*miningpower;
        angular.element("#quantity-monero-"+key).parent().find(".price-slider .ui-slider-handle > label").html($scope.moneroProducts[key].moneroMining+'<small>H/s</small>');
        return false;
      }else{
        $scope.moneroProducts[key].moneroMining = quantity*miningpower;
        angular.element("#quantity-monero-"+key).parent().find(".price-slider .ui-slider-handle > label").html($scope.moneroProducts[key].moneroMining+'<small>H/s</small>');
      }
    }

    $scope.calculateViaAmount = function(key, quantity, miningpower, maxUnit) {
      if(quantity > maxUnit) {
        $scope.viaProducts[key].quantity = maxUnit;
        $scope.viaProducts[key].viaMining = maxUnit*miningpower;
        angular.element("#quantity-via-"+key).parent().find(".price-slider .ui-slider-handle > label").html($scope.viaProducts[key].viaMining+'<small>MH/s</small>');
        return false;
      }else{
        $scope.viaProducts[key].viaMining = quantity*miningpower;
        angular.element("#quantity-via-"+key).parent().find(".price-slider .ui-slider-handle > label").html($scope.viaProducts[key].viaMining+'<small>MH/s</small>');
      }
    }

    $scope.calculateLiteAmount = function(key, quantity, miningpower, maxUnit) {
      if(quantity > maxUnit) {
        $scope.ltcProducts[key].quantity = maxUnit;
        $scope.ltcProducts[key].LiteMining = maxUnit*miningpower;
        angular.element("#quantity-lite-"+key).parent().find(".price-slider .ui-slider-handle > label").html($scope.ltcProducts[key].liteMining+'<small>MH/s</small>');
        return false;
      }else{
        $scope.ltcProducts[key].liteMining = quantity*miningpower;
        angular.element("#quantity-lite-"+key).parent().find(".price-slider .ui-slider-handle > label").html($scope.ltcProducts[key].liteMining+'<small>MH/s</small>');
      }
    }
    $scope.setEthQuantity = function(key, val) {
      $scope.ethProducts[key].quantity = val;
    }

    $scope.setDashQuantity = function(key, val) {
      $scope.dashProducts[key].quantity = val;
    }

    $scope.setMoneroQuantity = function(key, val) {
      $scope.moneroProducts[key].quantity = val;
    }

    $scope.setViaQuantity = function(key, val) {
      $scope.viaProducts[key].quantity = val;
    }

    $scope.setLiteQuantity = function(key, val) {
      $scope.ltcProducts[key].quantity = val;
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
      var i=0, j=0, k=0, l=0, m=0, n=0;
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

      $scope.moneroProducts.forEach(function(moneroInfo) {
        if(moneroInfo.quantity !== 0 && moneroInfo.quantity !== null) {
          var moneroAmount = moneroInfo.amount * moneroInfo.moneroMining/moneroInfo.miningpower;
          $scope.purchaseTotal += moneroAmount;
          $scope.orderDetails.push({data:{id:moneroInfo.id, quantity:moneroInfo.quantity}, name:moneroInfo.productname,  price:moneroAmount, path:$scope.moneroImagePath[j]});
        }
        l++;
      });

      $scope.viaProducts.forEach(function(viaInfo) {
        if(viaInfo.quantity !== 0 && viaInfo.quantity !== null) {
          var viaAmount = viaInfo.amount * viaInfo.viaMining/viaInfo.miningpower;
          $scope.purchaseTotal += viaAmount;
          $scope.orderDetails.push({data:{id:viaInfo.id, quantity:viaInfo.quantity}, name:viaInfo.productname,  price:viaAmount, path:$scope.viaImagePath[j]});
        }
        m++;
      });
      $scope.ltcProducts.forEach(function(ltcInfo) {
        if(ltcInfo.quantity !== 0 && ltcInfo.quantity !== null) {
          var ltcAmount = ltcInfo.amount * ltcInfo.viaMining/ltcInfo.miningpower;
          $scope.purchaseTotal += ltcAmount;
          $scope.orderDetails.push({data:{id:ltcInfo.id, quantity:ltcInfo.quantity}, name:ltcInfo.productname,  price:ltcAmount, path:$scope.ltcImagePath[j]});
        }
        n++;
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

    $scope.purchaseMoneroPool = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
      .then(function(res){
        if(res.status === 200) {
          var data = res.data;
          $scope.moneroPoolPower = data.TotalPower;
          $scope.moneroPoolEstimateIncome = data.estimated_total_income;
          $scope.moneroPoolCurrentRate = data.current_rate;
          $scope.moneroPoolRecords = data.records.total;
          $scope.moneroPoolDetails = data.records.rows;
          if($scope.moneroPoolRecords === 0) {
            $scope.nomoneroPoolRecords = true;
          }
        }
      })
    }


    $scope.purchaseMoneroMachine = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
      .then(function(res){
        if(res.status === 200) {
          var data = res.data;
          $scope.moneroMachinePower = data.TotalPower;
          $scope.moneroMachineEstimateIncome = data.estimated_total_income;
          $scope.moneroMachineCurrentRate = data.current_rate;
          $scope.moneroMachineRecords = data.records.total;
          $scope.moneroMachineDetails = data.records.rows;
          if($scope.moneroMachineRecords === 0) {
            $scope.nomoneroMachineRecords = true;
          }
        }
      })
    }

    $scope.purchaseMoneroRack = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
      .then(function(res){
        if(res.status === 200) {
          var data = res.data;
          $scope.moneroRackPower = data.TotalPower;
          $scope.moneroRackEstimateIncome = data.estimated_total_income;
          $scope.moneroRackCurrentRate = data.current_rate;
          $scope.moneroRackRecords = data.records.total;
          $scope.moneroRackDetails = data.records.rows;
          if($scope.moneroRackRecords === 0) {
            $scope.nomoneroRackRecords = true;
          }
        }
      })
    }

    $scope.purchaseViaPool = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
      .then(function(res){
        if(res.status === 200) {
          var data = res.data;
          $scope.viaPoolPower = data.TotalPower;
          $scope.viaPoolEstimateIncome = data.estimated_total_income;
          $scope.viaPoolCurrentRate = data.current_rate;
          $scope.viaPoolRecords = data.records.total;
          $scope.viaPoolDetails = data.records.rows;
          if($scope.viaPoolRecords === 0) {
            $scope.noViaPoolRecords = true;
          }
        }
      })
    }


    $scope.purchaseViaMachine = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
      .then(function(res){
        if(res.status === 200) {
          var data = res.data;
          $scope.viaMachinePower = data.TotalPower;
          $scope.viaMachineEstimateIncome = data.estimated_total_income;
          $scope.viaMachineCurrentRate = data.current_rate;
          $scope.viaMachineRecords = data.records.total;
          $scope.viaMachineDetails = data.records.rows;
          if($scope.viaMachineRecords === 0) {
            $scope.noViaMachineRecords = true;
          }
        }
      })
    }

    $scope.purchaseViaRack = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
      .then(function(res){
        if(res.status === 200) {
          var data = res.data;
          $scope.viaRackPower = data.TotalPower;
          $scope.viaRackEstimateIncome = data.estimated_total_income;
          $scope.viaRackCurrentRate = data.current_rate;
          $scope.viaRackRecords = data.records.total;
          $scope.viaRackDetails = data.records.rows;
          if($scope.viaRackRecords === 0) {
            $scope.noViaRackRecords = true;
          }
        }
      })
    }


    $scope.purchaseLitePool = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
        .then(function(res){
          if(res.status === 200) {
            var data = res.data;
            $scope.litePoolPower = data.TotalPower;
            $scope.litePoolEstimateIncome = data.estimated_total_income;
            $scope.litePoolCurrentRate = data.current_rate;
            $scope.litePoolRecords = data.records.total;
            $scope.litePoolDetails = data.records.rows;
            if($scope.litePoolRecords === 0) {
              $scope.noLitePoolRecords = true;
            }
          }
        })
    }


    $scope.purchaseLiteMachine = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
        .then(function(res){
          if(res.status === 200) {
            var data = res.data;
            $scope.liteMachinePower = data.TotalPower;
            $scope.liteMachineEstimateIncome = data.estimated_total_income;
            $scope.liteMachineCurrentRate = data.current_rate;
            $scope.liteMachineRecords = data.records.total;
            $scope.liteMachineDetails = data.records.rows;
            if($scope.liteMachineRecords === 0) {
              $scope.noLiteMachineRecords = true;
            }
          }
        })
    }

    $scope.purchaseLiteRack = function(type, product, currentPage) {
      coinomiaService.orderHistory(type, product, currentPage)
        .then(function(res){
          if(res.status === 200) {
            var data = res.data;
            $scope.liteRackPower = data.TotalPower;
            $scope.liteRackEstimateIncome = data.estimated_total_income;
            $scope.liteRackCurrentRate = data.current_rate;
            $scope.liteRackRecords = data.records.total;
            $scope.liteRackDetails = data.records.rows;
            if($scope.liteRackRecords === 0) {
              $scope.noLiteRackRecords = true;
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

    $scope.purchaseMoneroPool('MONERO', 'pool', $scope.moneroPoolCurrentPage);
    $scope.purchaseMoneroMachine('MONERO', 'machine', $scope.moneroMachineCurrentPage);
    $scope.purchaseMoneroRack('MONERO', 'rack', $scope.moneroRackCurrentPage);

    $scope.purchaseViaPool('VIA', 'pool', $scope.viaPoolCurrentPage);
    $scope.purchaseViaMachine('VIA', 'machine', $scope.viaMachineCurrentPage);
    $scope.purchaseViaRack('VIA', 'rack', $scope.viaRackCurrentPage);
    $scope.purchaseLitePool('LITE', 'pool', $scope.litePoolCurrentPage);
    $scope.purchaseLiteMachine('LITE', 'machine', $scope.liteMachineCurrentPage);
    $scope.purchaseLiteRack('LITE', 'rack', $scope.liteRackCurrentPage);
  });
