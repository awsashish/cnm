'use strict';

angular.module('coinomiaFrontendApp').controller('CoinomiaAcademyCartCtrl', function ($scope, $uibModal, $uibModalStack, $window, $state, $rootScope, coinomiaService) {

	$scope.totalPrice = 0;
	$scope.showTable = true;
  	$scope.getCartItems = function() {
		coinomiaService.academyPackages()
		.then(function(result) {
			if(result.status === 200) {
				$scope.index = parseInt($state.params.id);
				$scope.cartItem = result.data.rows[$state.params.id];
				$scope.totalPrice = parseInt($scope.cartItem.Price);
			}
		});
	};

	// Remove Item from Cart
	$scope.removeFromCart = function (){
		$scope.cartItem = {};
		$scope.showTable = false;
		$scope.totalPrice = $scope.cartItem.Price;
	};

	// Purchase Selected Package
	$scope.placeOrder = function (){
		var orderList = [];
		var data = {
			"payment_method": ($scope.payment === "1") ? 'BTC' : 'WALLET',
			"payment_type": '',
			"OrderDetails": [{"id": $scope.cartItem.itemid, "quantity": 1}]
		};
		coinomiaService.buyPackages(data)
		.then(function(result) {
			if(result.status === 200) {
				$scope.invoiceInfo = result.data;
			}
		});
	};
	// Close Modal 
	$scope.closeModal = function() {
		$uibModalStack.dismissAll();
		$window.location.reload();
		$state.go('coinomia-academy');
	};
	$scope.getCartItems();
});
