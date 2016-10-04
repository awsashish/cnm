'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:NetworksCtrl
 * @description
 * # NetworksCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('NetworksCtrl', function ($scope, $timeout, coinomiaService, config, UtilsService) {
    $scope.currentPage = config.currentPage;
    $scope.pagination = {
      totalDirects: 0,
      totalTeam:0,
      perpage: config.pageLimit
    }



    $scope.teamColumnHead = config.teamColumnHead;

    $scope.sponsorId = '';

    $scope.order = config.columnOrder;

    // Get User Directs
    $scope.userDirects = function(currentPage) {
      coinomiaService.getUserDirects(currentPage)
        .then(function(res) {
          if(res.status === 200) {
            var data = res.data;
            $scope.arrayList = [
              config.teamColumnHead
            ];
            $scope.pagination.totalDirects = data.total;
            $scope.teamDirectsData  = data.rows;
            data.rows.forEach(function(info){
              var excelArray = [info.Name, info.Email, info.Sponsor, info.username, info.Mobile, info.country, info.TotalContract, info.TotalPurchased, info.DOJ, info.TotalDirect];
              $scope.arrayList.push(excelArray);
            });
            $scope.getExcelData($scope.arrayList);
            // $scope.getFlags(0, $scope.teamDirectsData, $scope.teamDirectsData.length);
          }
      });
    }


    $scope.getExcelData = function(excelData) {
      $scope.testData = [{
          name: 'sheet1',
          data: excelData
      }];
    }

    $scope.exportExcel = {
      down: function() {},
    };

    $scope.userDirects($scope.currentPage);

    // Get All Referrals
    $scope.allReferral = function(page) {
      coinomiaService.getAllReferral(page)
        .then(function(res) {
          if(res.status === 200) {
            var data = res.data;
            $scope.teamData = data.rows;
            $scope.pagination.totalTeam = data.total;
            // $scope.getFlags(0, $scope.teamData, $scope.teamData.length);
          }
      });
    }

    // var flags = {};
    // $scope.getFlags = function(dataIndex, data, length) {
    //   var _country = (data[dataIndex] ? data[dataIndex].country : '');
    //   if(dataIndex < length && _country != '') {
    //     if(flags[_country]) {
    //       data[dataIndex].flag = flags[_country];
    //       $scope.getFlags((dataIndex + 1), data, length);
    //     }
    //     else {
    //       UtilsService.getCountryFlag(_country).then(function(res) {
    //         flags[_country] = 'images/flags/'+res[0].code.toLowerCase()+'.png';
    //         data[dataIndex].flag = flags[_country];
    //         $scope.getFlags((dataIndex + 1), data, length);
    //       });
    //     }
    //   }
    //   else if(dataIndex < length && _country == '') {
    //     $scope.getFlags((dataIndex + 1), data, length);
    //   }
    // }

    // Get User Downline
    $scope.userDownline = function(sponsorId) {
      coinomiaService.getUserDownline(sponsorId)
        .then(function(res) {
          if(res.status === 200) {
            $scope.downline  = res.data;
            $scope.tableInfo = res.data["0"];
            // $scope.getFlags(0, $scope.downline, $scope.downline.length);
          }
      });
    }

    $scope.loadingData = true;
    // Get User Direct Leader Board
    $scope.getLeaderBoard = function() {

      coinomiaService.getDirectLeaderboard()
      .then(function(res){
        if(res.status == 200){
          var members = res.data;
          var length  = Math.max(Math.max(members.Last7Days.length, members.Last30Days.length), members.alltime.length);
          $scope.maxDirects = [];
          for(var idx = 0; idx < length; idx++) {
            $scope.maxDirects.push({
              last7Days: members.Last7Days[idx] ? members.Last7Days[idx] : {},
              last30Days: members.Last30Days[idx] ? members.Last30Days[idx] : {},
              allTime: members.alltime[idx] ? members.alltime[idx] : {}
            })
          };
          $scope.loadingData = false;
        }
      })

      // Get User Team Leader Board
      // coinomiaService.getTeamLeaderboard()
      // .then(function(res){
      //   if(res.status == 200){
      //     var _members = res.data;
      //     var _length  = Math.max(Math.max(_members.Last7Days.length, _members.Last30Days.length), _members.alltime.length);
      //     $scope.maxTeam = [];
      //     for(var idx = 0; idx < length; idx++) {
      //       $scope.maxTeam.push({
      //         last7Days: _members.Last7Days[idx] ? _members.Last7Days[idx] : {},
      //         last30Days: _members.Last30Days[idx] ? _members.Last30Days[idx] : {},
      //         allTime: _members.alltime[idx] ? _members.alltime[idx] : {}
      //       })
      //     };
      //   }
      // })
    }


    $scope.getDownline = function(sponsorId) {
      $scope.userDownline(sponsorId);
    }

    $scope.getDownline($scope.sponsorId);
  });
