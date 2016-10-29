'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:NetworksCtrl
 * @description
 * # NetworksCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('NetworksCtrl', function ($scope, $timeout, $location, $uibModal, $uibModalStack, $window, coinomiaService, config, UtilsService) {
    $scope.currentPage = config.currentPage;
    $scope.pagination = {
      totalDirects: 0,
      totalTeam:0,
      perpage: config.pageLimit
    }

    $scope.selected = [];
    $scope.teamColumnHead = config.teamColumnHead;
    $scope.sponsorId = '';
    $scope.order = config.columnOrder;
    $scope.pageLimit = config.pageLimit;
    $scope.limit = config.messageLimit;

    // Get User Directs
    $scope.userDirects = function(currentPage, pageLimit) {
      coinomiaService.getUserDirects(currentPage, pageLimit)
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

    $scope.getUser = function(currentPage, pageLimit) {
      coinomiaService.getUserDirects(currentPage, pageLimit)
        .then(function(res) {
          if(res.status === 200) {
            var data = res.data;
            $scope.pagination.totalUsers = data.total;
            $scope.teamDirectsUsers  = data.rows;
          }
      });
    }

    /*** Excel Export ***/
    $scope.getExcelData = function(excelData) {
      $scope.exportData = [{
          name: 'sheet1',
          data: excelData
      }];
    }

    $scope.exportExcel = {
      down: function() {},
    };
    /** -- Excel Export -- **/

    $scope.userDirects($scope.currentPage, $scope.pageLimit);

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
      $scope.loadingData = true;
      coinomiaService.getUserDownline(sponsorId)
        .then(function(res) {
          if(res.status === 200) {
            $scope.responseError = false;
            $scope.downline  = res.data;
            $scope.tableInfo = res.data["0"];
            $scope.loadingData = false;
          }else{
            $scope.responseError = true;
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

    $scope.searchDownline = function(sponsorId) {
      if(sponsorId !== undefined) {
        $scope.searchError = false;
        $scope.userDownline(sponsorId);
      }else{
        $scope.searchError = true;
      }
    }

    $scope.getDownline = function(sponsorId) {
      if(sponsorId !== undefined) {
        $scope.userDownline(sponsorId);
      }
    }

    $scope.getDownline($scope.sponsorId);

    $scope.updateSelectedUser = function(action, username) {
      if (action === 'add' && $scope.selected.indexOf(username) === -1) {
        $scope.selected.push(username);
      }
      if (action === 'remove' && $scope.selected.indexOf(username) !== -1) {
        $scope.selected.splice($scope.selected.indexOf(username), 1);
      }
    };

    $scope.updateSelection = function($event, username) {
      var checkbox = $event.target;
      var action = (checkbox.checked ? 'add' : 'remove');
      $scope.updateSelectedUser(action, username);
    };


    $scope.isSelected = function(username) {
      return $scope.selected.indexOf(username) >= 0;
    };

    $scope.sendMessage = function() {
      if($scope.selected.length > 0 || $scope.replyId) {
        if($scope.message) {
          $scope.messageError = false;
          $scope.sendError = false;
          var receiver = [];
          for(var i in $scope.selected) {
            var id = {"id": $scope.selected[i]};
            receiver.push(id);
          }


          if($scope.replyId && $scope.replySubject) {
            // Reply Message Parameter
            var sendData = {
               "Subject":$scope.replySubject,
               "Message":$scope.message,
               "Replyid ":$scope.replyId,
               "Receiverids":receiver
            }
          }else{
            // Send Message Parameter
            var sendData = {
               Subject:$scope.subject,
               Message:$scope.message,
               Replyid:$scope.replyId,
               Receiverids:receiver
            }
          }

          coinomiaService.sendMessage(sendData)
          .then(function(res){
            if(res.status === 200) {
              $scope.sendMessage = true;
              $window.relocation.reload();
            }else{
              $scope.sendMessage = false;
            }
          })
        }else{
          $scope.messageError = true;
          $scope.sendError = false;
        }
      }else{
        $scope.sendError = true;
      }
    }

    // Get Inbox List
    $scope.getInbox = function (currentPage, limit) {
      $scope.loadingData = true;
      coinomiaService.getInboxList(currentPage, limit)
      .then(function(res) {
        if(res.status === 200) {
          var data = res.data;
          $scope.totalInboxMessage = data.total;
          $scope.inboxData = data.rows;
          $scope.loadingData = false;
        }
      });
    }

    // Get Sent List
    $scope.getSent = function (currentPage, limit) {
      $scope.loadingData = true;
      coinomiaService.getSentList(currentPage, limit)
      .then(function(res) {
        if(res.status === 200) {
          var data = res.data;
          $scope.totalSentMessage = data.total;
          $scope.sentData = data.rows;
          $scope.loadingData = false;
        }
      });
    }

    // Search Inbox Message
    $scope.searchInboxMessage = function(filterData, currentPage, limit) {
      $scope.loadingData = true;
      coinomiaService.getInboxSearch(filterData, currentPage, limit)
      .then(function(res){
        if(res.status === 200) {
          $scope.loadingData = false;
          var data = res.data;
          $scope.totalInboxMessage = data.total;
          $scope.inboxData = data.rows;
        }
      });
    }

    // Search Sent Message
    $scope.searchSentMessage = function(filterData, currentPage, limit) {
      $scope.loadingData = true;
      coinomiaService.getSentSearch(filterData, currentPage, limit)
      .then(function(res) {
        if(res.status === 200) {
          $scope.loadingData = false;
          var data = res.data;
          $scope.totalSentMessage = data.total;
          $scope.sentData = data.rows;
        }
      });
    }

    // Search User
    $scope.searchUser =  function(page) {
      var filterType = $scope.searchType;
      var filter = $scope.searchText;
      if(filterType !== "0") {
        coinomiaService.searchUser(filterType, filter, page)
        .then(function(res) {
          if(res.status === 200) {
            var data = res.data;
            $scope.pagination.totalUsers = 0;
            $scope.teamDirectsUsers  = data.rows;
          }
        })
      }else{
        $scope.searchTypeError = true;
      }
    }

    $scope.readMessage = false;
    // View Message
    $scope.viewMessage = function(type, messageId) {
      $scope.inboxMessage = '';
      if(type === 'inbox') {
        $scope.readInboxMessage = true;
      }else{
        $scope.readSentMessage = true;
      }

      $scope.loadingData = true;
      angular.element("html, body").animate({ scrollTop: angular.element(document).height() }, 1000);
      coinomiaService.viewMessage(type, messageId)
      .then(function(res) {
        if(res.status === 200) {
          $scope.loadingData = false;
          var data = res.data;
          if(type === 'inbox') {
            $scope.inboxMessage = data;
          }else{
            $scope.sentMessage = data;
          }
        }
      });
    }


    // Reply Message
    $scope.replyMessage = function(type, reply) {
      if(type === 'inbox'){
        $scope.showReplyBox = true;
        $scope.replyId = reply.senderid;
      }else{
        $scope.sentReplyBox = true;
        $scope.replyId = reply.receiverid;
      }

      $scope.replySubject = reply.subject;
      $scope.message = reply.body;
      angular.element("html, body").animate({ scrollTop: angular.element(document).height() }, 1000);
    }


    $scope.ativatePayment = function() {
      var modalInstance = $uibModal.open({
          templateUrl: 'views/payment-mode.html',
          scope: $scope,
          size: 'md'
      });
    }

    $scope.closePopup = function() {
      $uibModalStack.dismissAll();
    }

    $scope.activeAffiliate = function(payment) {
      console.log(payment);
    }

});
