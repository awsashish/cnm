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
      perpage: config.pageLimit
    }

    $scope.sponsorId = '';

    // Get User Directs
    $scope.userDirects = function(currentPage) {
      coinomiaService.getUserDirects(currentPage)
        .then(function(res) {
          if(res.status === 200) {
            var data = res.data;
            $scope.pagination.totalDirects = data.total;
            $scope.teamDirectsData  = data.rows;
            $scope.getFlags(0, $scope.teamDirectsData, $scope.teamDirectsData.length);
          }
      });
    }

    $scope.userDirects($scope.currentPage);

    // Get All Referrals
    $scope.allReferral = function(page) {
      coinomiaService.getAllReferral(page)
        .then(function(res) {
          if(res.status === 200) {
            var data = res.data;
            $scope.teamData = data.rows;
            $scope.pagination.totalTeam = data.total;
            $scope.getFlags(0, $scope.teamData, $scope.teamData.length);
          }
      });
    }

    var flags = {};
    $scope.getFlags = function(dataIndex, data, length) {
      var _country = (data[dataIndex] ? data[dataIndex].country : '');
      if(dataIndex < length && _country != '') {
        if(flags[_country]) {
          data[dataIndex].flag = flags[_country];
          $scope.getFlags((dataIndex + 1), data, length);
        }
        else {
          UtilsService.getCountryFlag(_country).then(function(res) {
            flags[_country] = 'images/flags/'+res[0].code.toLowerCase()+'.png';
            data[dataIndex].flag = flags[_country];
            $scope.getFlags((dataIndex + 1), data, length);
          });
        }
      }
      else if(dataIndex < length && _country == '') {
        $scope.getFlags((dataIndex + 1), data, length);
      }
    }

    // Get User Downline
    $scope.userDownline = function(sponsorId) {
      coinomiaService.getUserDownline(sponsorId)
        .then(function(res) {
          if(res.status === 200) {
            $scope.downline  = res.data;
            $scope.tableInfo = res.data["0"];
            console.log($scope.downline.length);
            $scope.getFlags(0, $scope.downline, $scope.downline.length);
          }
      });
    }

    $scope.getDownline = function(sponsorId) {
      $scope.userDownline(sponsorId);
    }

    $scope.getDownline($scope.sponsorId);
  });
