'use strict';

angular.module('coinomiaFrontendApp')
  .controller('CoinomiaAcademyCtrl', function ($scope, $state, coinomiaService) {

  	$scope.getAcademyPackages = function() {
		coinomiaService.academyPackages()
		.then(function(result) {
			if(result.status === 200) {
				$scope.packages = result.data.rows;
			}
		})
	};

	$scope.getAcademyPackages();

  });
