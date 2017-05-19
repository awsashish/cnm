'use strict';

angular.module('coinomiaFrontendApp').controller('CoinomiaAcademyCartCtrl', function ($scope, $state, coinomiaService) {

	$scope.totalPrice = 0;
  	$scope.getCartItems = function() {
		coinomiaService.academyPackages()
		.then(function(result) {
			if(result.status === 200) {
				$scope.cartItems = result.data.rows;
				angular.forEach($scope.cartItems, function(cartItem){
					$scope.totalPrice += parseInt(cartItem.Price);
				})
			}
		})
	};

	$scope.removeFromCart = function (item, index){
		$scope.cartItems.splice(index, 1);
		$scope.totalPrice = $scope.totalPrice - parseInt(item.Price);
	}

	$scope.getCartItems();

});
