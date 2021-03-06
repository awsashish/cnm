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
			else if(res.status == 401){
				$state.go('login');
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
		var paymentMethod = '';
		if($scope.payment == "1"){
			paymentMethod = 'BTC';
		} else if($scope.payment == "2"){
			paymentMethod = 'WALLET';
		} else{
			paymentMethod = 'ACADEMY';
		}
		var orderList = [];
		var data = {
			"payment_method": paymentMethod,
			"payment_type": '',
			"OrderDetails": [{"id": $scope.cartItem.itemid, "quantity": 1}]
		};
		coinomiaService.buyPackages(data)
		.then(function(result) {
			if(result.status === 200) {
				if(result.data.message && result.data.message !== 'success') {
		            $scope.noBalance = true;
		            $scope.message = result.data.message;
		        }else{
					$scope.invoiceInfo = result.data;
				}
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
