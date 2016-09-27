'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:PromotecoinomiaCtrl
 * @description
 * # PromotecoinomiaCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('PromotecoinomiaCtrl', function ($scope, $stateParams, config, coinomiaService) {

    $scope.activeTab = config.activeTab;
    $scope.bannerApiPath = config.bannerApiPath
    $scope.signUpPath = config.signUpPath;

    if($stateParams.tabId) {
      $scope.activeTab = $stateParams.tabId;
    }

    $scope.getBannerCode = function(bannerIndex) {
      var banner = $scope.banners[bannerIndex];
      banner.showCode = true;
    }

    // Get Banners
    coinomiaService.getBanners()
      .then(function(res) {
        if(res.status === 200) {
          var data = res.data;
          $scope.totalBanners = data.total;
          var bannerData = data.rows;
          $scope.banners = [];
          bannerData.forEach(function(banner) {
            banner.bannerimage = banner.bannerimage.replace('~', '');
            banner.showCode = false;
            $scope.banners.push(banner);
          });
        }
      });

  });
