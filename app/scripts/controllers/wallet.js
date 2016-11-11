'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:WalletCtrl
 * @description
 * # WalletCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('WalletCtrl', function ($scope, $uibModal, $uibModalStack, $window, coinomiaService, config) {

    $scope.walletHeading = config.wallet;
    $scope.currentPage = config.currentPage;
    $scope.productMaxUnit = config.productMaxUnit;
    $scope.btcImagePath = config.btcImagePath;
    $scope.ethImagePath = config.ethImagePath;
    $scope.verifiedStatus = false;


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

    // Get Transaction Details
    $scope.getTransctions = function() {
      $scope.transactionData = [];
      coinomiaService.getTransactionDetails($scope.currentPage)
        .then(function(res){
          if(res.status === 200) {
            var transaction = res.data.rows;
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

    // Transfer Fund
    $scope.transferFund = function(transferAmount, userId) {
      var transferData = {
        "userid":userId,
        "amount":transferAmount
      }
      coinomiaService.transferFund(transferData).then(function(res) {
        console.log(res);
        if(res.status === 200) {
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
  });
