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

    $scope.walletInfo();
  });
