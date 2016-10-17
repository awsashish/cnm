'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:PromotecoinomiaCtrl
 * @description
 * # PromotecoinomiaCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('PromotecoinomiaCtrl', function ($scope, $uibModal, $uibModalStack, $stateParams, $timeout, config, coinomiaService) {

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


    $scope.getReferralLinks = function() {
      //  Get Landing pages and referral links
      coinomiaService.getLandingPages().then(function(res) {
        var data = res.data;
        if( res.status === 200) {
          $scope.landingPages = [];
          $scope.totalRecords = data.total;
          data.rows.forEach(function(item) {
            var path = item.path;
            item.path = path+'?id=';
            $scope.landingPages.push(item)
          });
        }
      });
    }

    $scope.getReferral = function() {
      // Open Angular Modal
      var modalInstance = $uibModal.open({
          templateUrl: 'views/modal/referrals.html',
          scope: $scope,
          size: 'md'
      });
    }

    $scope.closeModal = function() {
      setTimeout(function () {
        $uibModalStack.dismissAll();
      }, 2000);
    }

    $scope.createCampaign = function(campaign) {
      if(campaign.referralId === undefined) {
        $scope.errorMessage = "Please select atleast one option."
      }else{
        var campaignData = {
          bannerid:campaign.referralId,
          campaignname:campaign.campaignName
        }

        coinomiaService.createCampaign(campaignData)
        .then(function(res) {
          if(res.status === 200) {
            $scope.errorMessage = '';
            $scope.successMessage = "Camapaign created successfully.";
            $scope.closeModal();
          }else{
            $scope.errorMessage = "OOPS! Something went wrong. Please try again."
          }
        })
      }
    }
  });
