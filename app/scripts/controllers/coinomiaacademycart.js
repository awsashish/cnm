'use strict';

angular.module('coinomiaFrontendApp').controller('CoinomiaAcademyCartCtrl', function ($scope, $state, $rootScope, coinomiaService) {

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

	$scope.placeOrder = function (){
		var orderList = [];
		var orderedItem = {};
		angular.forEach($scope.cartItems, function(cartItem){
			orderList.push({"id": cartItem.itemid, "quantity": 1});
		})

		var data = {
			"payment_method": ($scope.payment == "1") ? 'BTC' : 'USD',
			"payment_type": '',
			"OrderDetails": orderList
		}
		coinomiaService.buyPackages(data)
		.then(function(result) {
			if(result.status === 200) {
				$scope.invoiceInfo = result.data;
			}
		})
	};

	$scope.getCartItems();
});
