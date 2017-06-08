'use strict';

angular.module('coinomiaFrontendApp').controller('CoinomiaAcademyCartCtrl', function ($scope, $uibModal, $uibModalStack, $window, $state, $rootScope, coinomiaService) {

	$scope.totalPrice = 0;
	$scope.showTable = true;
  	$scope.getCartItems = function() {
		coinomiaService.academyPackages()
		.then(function(result) {
			if(result.status === 200) {
				$scope.cartItem = result.data.rows[$state.params.id];
				$scope.totalPrice = parseInt($scope.cartItem.Price);
			}
		});
	};

	$scope.removeFromCart = function (){
		$scope.cartItem = {};
		$scope.showTable = false;
		$scope.totalPrice = $scope.cartItem.Price;
	};

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
		/* coinomiaService.packageIdAPI */
		// var tokenInfo = {
		// 	"command": getLGToken,
		// 	"authkey": 'A4CCEA76'
		// };
		// coinomiaService.getlgToken(tokenInfo)
		// .then(function(result) {
		// 	if(result.status === 200) {
		// 		$scope.token = result.data;
		// 	}
		// });

		// var bigUData = {
		// 	"command": 'addUser',
		// 	"token": $scope.token,
		// 	"login": $rootScope.userInfo.username,
		// 	"password": 'coinomia1',
		// 	"FName": $rootScope.userInfo.name,
		// 	"LName": '',
		// 	"Email": $rootScope.userInfo.Email,
		// 	"isActive": 'True',
		// 	"userAccessLevel": 7,
		// 	"gdlrid": '85625'
		// };
		// coinomiaService.addLsvtUser(bigUData)
		// .then(function(result) {
		// 	if(result.status === 200) {
		// 		$scope.userId = result.data;
		// 	}
		// });
		// var academyUser = {
		// 	"GUserID": $scope.userId,
		// 	"GUserLogin": $rootScope.userInfo.username,
		// 	"GUserAccessLevel": 7,
		// 	"GUserAccessLevelName": '',
		// 	"GUserEmail": $rootScope.userInfo.Email,
		// 	"LGID": $rootScope.userInfo.username,
		// 	"ContentRID": 'packageId'
		// };
		// coinomiaService.addAcademyUser(academyUser)
		// .then(function(result) {
		// 	if(result.status === 200) {
		// 		$scope.userData = result.data;
		// 	}
		// });
	};
	// Close Modal 
	$scope.closeModal = function() {
		$uibModalStack.dismissAll();
		$window.location.reload();
		$state.go('coinomia-academy');
	};
	$scope.getCartItems();
});
