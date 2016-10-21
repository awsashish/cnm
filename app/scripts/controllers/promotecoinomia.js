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
    $scope.loadingData = true;

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
          $scope.loadingData = false;
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

    // Create Campaign
    $scope.createCampaign = function(campaign) {
      if(campaign.referralId === undefined) {
        $scope.errorMessage = "Please select atleast one option."
      }else{
        var campaignData = {
          CampaignType:"referral",
          CampaignName:campaign.campaignName,
          Bannerid:'',
          pageid: campaign.referralId
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

    // Get Referral and Banner Reports
    $scope.reports = function(type) {
      $scope.loadingData = true;
      coinomiaService.getReports(type)
      .then(function(res) {
        if(res.status === 200) {
          var data = res.data;
          $scope.totalReports = data.total;
          $scope.allReports = data.rows;
        }
        $scope.loadingData = false;
      });
    }

    // Get Banner Reports
    // $scope.bannerReports = function() {
    //   $scope.loadingData = true;
    //   coinomiaService.getBannerReports()
    //   .then(function(res) {
    //     if(res.status === 200) {
    //       var data = res.data;
    //       $scope.totalBanners = data.total;
    //       $scope.bannerReports = data.rows;
    //     }
    //     $scope.loadingData = false;
    //   });
    // }

  });
