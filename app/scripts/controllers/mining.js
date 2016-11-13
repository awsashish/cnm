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
        $scope.orderParams.push(info.data);
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
          if(data.message) {
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
  });
