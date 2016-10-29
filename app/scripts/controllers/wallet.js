'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:WalletCtrl
 * @description
 * # WalletCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('WalletCtrl', function ($scope, coinomiaService, config) {

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

    $scope.walletInfo();
  });
