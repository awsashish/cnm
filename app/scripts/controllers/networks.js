'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:NetworksCtrl
 * @description
 * # NetworksCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('NetworksCtrl', function ($scope, coinomiaService, config, UtilsService) {
    $scope.currentPage = config.currentPage;
    $scope.pagination = {
      totalDirects: 0,
      totalTeam:0,
      perpage: 25
    }

    // Get User Directs
    coinomiaService.getUserDirects($scope.currentPage)
      .then(function(res) {
        if(res.status === 200) {
          var data = res.data;
          $scope.pagination.totalDirects = data.total;
          $scope.teamDirectsData  = data.rows;
        }
    });

    // Get All Referrals
    $scope.allReferral = function(page) {
      coinomiaService.getAllReferral($scope.currentPage)
        .then(function(res) {
          if(res.status === 200) {
            var data = res.data;
            $scope.teamData = data.rows;
            $scope.pagination.totalTeam = data.total;
            $scope.getFlags(0, $scope.teamData.length);
          }
      });
    }

    var flags = {};
    $scope.getFlags = function(dataIndex, length) {
      var _country = ($scope.teamData[dataIndex] ? $scope.teamData[dataIndex].country : '');
      if(dataIndex < length && _country != '') {
        if(flags[_country]) {
          $scope.teamData[dataIndex].flag = flags[_country];
          $scope.getFlags((dataIndex + 1), length);
        }
        else {
          UtilsService.getCountryFlag(_country).then(function(res) {
            flags[_country] = 'images/flags/'+res[0].code.toLowerCase()+'.png';
            $scope.teamData[dataIndex].flag = flags[_country];
            $scope.getFlags((dataIndex + 1), length);
          });
        }
      }
      else if(dataIndex < length && _country == '') {
        $scope.getFlags((dataIndex + 1), length);
      }
    }

  });
