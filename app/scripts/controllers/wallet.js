'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:WalletCtrl
 * @description
 * # WalletCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('WalletCtrl', function ($scope, $rootScope, $uibModal, $uibModalStack, $window, coinomiaService, config) {

    $scope.walletHeading = config.wallet;
    $scope.currentPage = config.currentPage;
    $scope.productMaxUnit = config.productMaxUnit;
    $scope.btcImagePath = config.btcImagePath;
    $scope.ethImagePath = config.ethImagePath;
    $scope.moneroImagePath = config.moneroImagePath;
    $scope.viaImagePath = config.viaImagePath;
    $scope.verifiedStatus = false;
    $scope.pagination = {
      perpage: config.pageLimit
    }


    // Get Wallet Info
    $scope.walletInfo = function() {
      coinomiaService.getWalletInfo()
        .then(function(res){
          if(res.status === 200){
            $scope.walletData = res.data;
          }
        });
        $scope.getTransctions($scope.currentPage, $scope.pagination.perpage);
    }

    // Get Transaction Details
    $scope.getTransctions = function() {
      $scope.transactionData = [];
      coinomiaService.getTransactionDetails($scope.currentPage, $scope.pagination.perpage)
        .then(function(res){
          if(res.status === 200) {
            var transaction = res.data.rows;
            $scope.totalTransactions = res.data.total;
            transaction.forEach(function(info) {
              $scope.transactionData.push(info);
            });
          }
        })
    }

    $scope.printInvoice = function() {
      $window.print();
    }

    // Close Pop Up
    $scope.closePopup = function() {
      $uibModalStack.dismissAll();
      $window.location.reload();
    }

    // Add FUND
    $scope.addFund = function(amount) {
      $scope.loadingData = true;
      coinomiaService.addUsdFund(amount)
      .then(function(res) {
        if(res.status === 200) {
          $scope.loadingData = false;
          angular.element("#add-funds").hide();
          var data = res.data;
          $scope.transactionDetails = data;
          $scope.transactionDate = moment().format('YYYY-MM-DD');
          var modalInstance = $uibModal.open({
              templateUrl: 'views/transaction-invoice.html',
              scope: $scope,
              size: 'md'
          });
        }
      })
    }

    // Check Added Fund Status
    $scope.checkStatus = function(btcAddress) {
      var btcAddress = JSON.stringify(btcAddress);
      coinomiaService.fundStatus(btcAddress)
      .then(function(res) {
        if (res.status === 200 && res.data.payment_status === 'PENDING') {
          $scope.pendingStatus = true;
        }else if (res.status === 200 && res.data.payment_status === 'SUCCESS') {
          $scope.successStatus = true;
          setTimeout(function () {
            $scope.closePopup();
          }, 2000);
        }else {
          $scope.notPaid = true;
        }
      })
    }

    // Get Wallet Info
    $scope.walletInfo();

    var timeout = null;

    // Verify User Id
    $scope.verifyUserId = function(userId) {
      $scope.verifiedStatus = false;
      $scope.verifiedUserId = false;
      var userId = userId;
      clearTimeout(timeout);
      if(userId.length > 0) {
        // Make a new timeout set to go off in 800ms
        timeout = setTimeout(function () {
          $scope.loadingData = true;
          coinomiaService.verifySponsor(JSON.stringify(userId)).then(function(res) {
            $scope.loadingData = false;
            if(res.status === 200) {
              $scope.verifiedStatus = true;
            }else{
              $scope.verifiedUserId = true;
            }
          });
        }, 1000);
      }
    }

     // Calculate Withdrawal Fees
    $scope.calcFees = function(requestAmount, balance, fees) {
      if(balance >= requestAmount) {
        $scope.requestAmount = requestAmount;
        
        if(balance > 1) {
          $scope.percentAmount = 1*requestAmount/100;
          $scope.withdrawalAmount = requestAmount - $scope.percentAmount;
          $scope.fees = fees+'%';
        }else{
          $scope.withdrawalAmount = requestAmount - fees;
          $scope.fees = fees;
        }
        
        if($scope.withdrawalAmount < 0) {
          $rootScope.withdrawalAmountError = true;
        }else{
          $rootScope.withdrawalInfo = true;
        }
      }else {
        $rootScope.withdrawalAmountError = true;
      }
    }

    // Transfer Fund
    $scope.transferFund = function(transferAmount, userId) {
      $scope.loadingData = true;
      var transferData = {
        "userid":userId,
        "amount":transferAmount
      }
      coinomiaService.transferFund(transferData).then(function(res) {
        if(res.status === 200) {
          $uibModalStack.dismissAll();
          $scope.loadingData = false;
          var data = res.data;
          if(data.message !== '!balance not available') {
            $scope.transferSuccess = true;
            $scope.amount = transferAmount;
            $scope.customerId = userId;
          }else {
            $scope.transferFailed = true;
          }

          var modalInstance = $uibModal.open({
              templateUrl: 'views/modal/transfer-amount.html',
              scope: $scope,
              size: 'md',
              backdrop: 'static'
          });
        }
      });
    }


    $scope.verifyAndSubmit = function(activity, requestAmount, type) {
      if(activity.toLowerCase() === 'withdrawal' && (type === 'BTC' || type === 'ETH' || type === 'DASH' || type === 'MONERO' || type === 'VIA')) {
        $scope.calcFees(requestAmount, $rootScope.balance, $rootScope.networkFees);
      }else{
        $scope.walletActivity(requestAmount, $rootScope.walletName, activity);
      }
    }

    // Withdrawal And Conversion
    $scope.walletActivity = function (amount, wallet, activity) {
      // console.log(amount, wallet, activity);
      $scope.loadingData = true;
      var data = JSON.stringify(amount);
      $scope.conversion = false;

      if(activity === 'withdrawal') {
        // Withdrawal Amount
        if(wallet.toLowerCase() === 'btc') {
          var type = 'btc';
        }else if(wallet.toLowerCase() === 'eth') {
          var type = 'eth';
        }else if(wallet.toLowerCase() === 'dash') {
          var type = 'dash';
        }else if(wallet.toLowerCase() === 'monero') {
          var type = 'monero';
        }else if(wallet.toLowerCase() === 'usd') {
          var type = 'usd';
        }else if(wallet.toLowerCase() === 'monero') {
          var type = 'monero';
        }else if(wallet.toLowerCase() === 'via') {
          var type = 'via';
        }

        // Withdrawal Amount 
        coinomiaService.withdrawalAmount(data, type).then(function(res) {
          if(res.status === 200) {
            $scope.loadingData = false;
            $rootScope.responseSuccess = true;
            var data = res.data;
            if(data.message === '#Request Successfully Added') {
              $rootScope.withdrawalSuccess = true; 
            }else{
              $rootScope.withdrawalError = true;
              $scope.errorMessage = data.message;
            }
          }
        });
      }else {
        // Convert Amount
        if(wallet.toLowerCase() === 'btc') {
          var type = 'btc';
          var data = JSON.stringify(amount);     
        }else if(wallet.toLowerCase() === 'eth') {
          var type = 'eth';
          var data = JSON.stringify(amount); 
        }else if(wallet.toLowerCase() === 'dash') {
          var type = 'dash';
          var data = JSON.stringify(amount); 
        }else if(wallet.toLowerCase() === 'monero') {
          var type = 'monero';
          var data = JSON.stringify(amount);
        }else if(wallet.toLowerCase() === 'usd') {
          var type = 'usd';
          var data = JSON.stringify(amount); 
        }else if(wallet.toLowerCase() === 'monero') {
          var type = 'monero';
          var data = JSON.stringify(amount); 
        }else if(wallet.toLowerCase() === 'via') {
          var type = 'via';
          var data = JSON.stringify(amount); 
        }

        // Convert Amount to USD 
        coinomiaService.convertUSD(data, type).then(function(res) {
          if(res.status === 200) {
            $scope.loadingData = false;
            $scope.responseSuccess = true;
            var data = res.data;
            if(data.message === '#Successfully Converted') {
              $rootScope.convertSuccess = true; 
            }else{
              $rootScope.convertError = true;
              $scope.errorMessage = data.message;
            }
          }
        });
      }
    }
  });
