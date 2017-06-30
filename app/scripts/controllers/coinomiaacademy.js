'use strict';

angular.module('coinomiaFrontendApp')
  .controller('CoinomiaAcademyCtrl', function ($scope, $state, coinomiaService, $location, config, $sce, $uibModal, $uibModalStack) {

  	init();
  	function init() {
		$scope.videoOne = config.videoIdOne;
	    $scope.videoTwo = config.videoIdTwo;
	    $scope.playerAttr = {
	        autoplay: true
	    };
       	coinomiaService.getUserInfo().then(function(res) {
			var data = res.data;
			if(res.status === 200){
				if(data.biguurl){
					$scope.bigUUrl = data.biguurl; //BigU Url where the user is to be redirected
				}
			}
		});
		$scope.videoOne = config.videoIdOne;
	    $scope.videoTwo = config.videoIdTwo;
	    $scope.playerAttr = {
	        autoplay: true
	    };

	    // Open Video Modal
	    $scope.openVideo = function() {
	      var url = config.academyUrl;
	      var autoplay = true;
	      $scope.videoUrl = $sce.trustAsResourceUrl(url+autoplay);
	      var modalInstance = $uibModal.open({
	          templateUrl: 'views/modal/cloud-mining-video.html',
	          scope: $scope,
	          size: 'lg',
	          windowClass: 'academy-video'
	      });
	    }
	    $scope.closePopup = function() {
	      $uibModalStack.dismissAll();
	    }
    }
    //Information of Purchased Packages
	$scope.getPackagePurchaseHistory = function () {
		coinomiaService.packagePurchaseHistory()
		.then(function(result) {
			if(result.status === 200) {
				$scope.packagesBought = result.data;
			}
			$scope.getAcademyPackages();
		});
	};

	// All Coinomia Academy Packages
	$scope.getAcademyPackages = function() {
		coinomiaService.academyPackages()
		.then(function(res) {
			if(res.status === 200) {
				$scope.packages = res.data.rows;
			}
			$scope.getPurchaseHistory();
		});
	};

	// Disabling the Buy Now option of already purchased packages
	$scope.getPurchaseHistory = function(){
		angular.forEach($scope.packages, function(eachPackage){
			angular.forEach($scope.packagesBought, function(packageBought){
				if(eachPackage.PackageName == packageBought.ProductName){
					eachPackage.isDisabled = true;
				}
			})
		})
	};

	// Light Speed Domain for viewing BigU videos
	$scope.goToLightSpeed = function() {
		window.open($scope.bigUUrl, '_blank');
	}

	$scope.getPackagePurchaseHistory();
	$scope.openVideo();
  });
