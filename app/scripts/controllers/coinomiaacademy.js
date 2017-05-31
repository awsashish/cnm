'use strict';

angular.module('coinomiaFrontendApp')
  .controller('CoinomiaAcademyCtrl', function ($scope, $state, coinomiaService) {

	$scope.getPackagePurchaseHistory = function () {
		coinomiaService.packagePurchaseHistory()
		.then(function(result) {
			if(result.status === 200) {
				$scope.packagesBought = result.data;
			}
			$scope.getAcademyPackages();
		});
	};

	$scope.getAcademyPackages = function() {
		coinomiaService.academyPackages()
		.then(function(res) {
			if(res.status === 200) {
				$scope.packages = res.data.rows;
			}
			$scope.getPurchaseHistory();
		});
	};

	$scope.getPurchaseHistory = function(){
		angular.forEach($scope.packages, function(eachPackage){
			angular.forEach($scope.packagesBought, function(packageBought){
				if(eachPackage.PackageName == packageBought.ProductName){
					eachPackage.isDisabled = true;
				}
			})
		})
	};

	$scope.getPackagePurchaseHistory();
  });
