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

	$scope.addLsvtUser = function (){
		var data = {
			"command": 'addUser',
			"token": '03aa0e9e1bf44676b985fa03cbae917d',
			"login": 'CoinomiaUser1',
			"password": 'coinomiacoinomia',
			"FName": 'Dummy',
			"LName": 'Coinomia',
			"Email": 'sanjay.tripathi@geminisolutions.in',
			"isActive": 'True',
			"userAccessLevel": 12,
			"gdlrid": '85625'
		}
		coinomiaService.addLsvtUser(data)
		.then(function(result) {
			if(result.status === 200) {
				$scope.userData = result.data;
			}
		})
	};

	$scope.getAcademyPackages();
	$scope.addLsvtUser();

  });
