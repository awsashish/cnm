'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:NetworksCtrl
 * @description
 * # NetworksCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('NetworksCtrl', function ($scope, $rootScope, $timeout, $location, $uibModal, $uibModalStack, $window, $filter, coinomiaService, config, UtilsService, ngXlsx) {
    $scope.currentPage = config.currentPage;
    $scope.teamCurrentPage = config.currentPage;
    $scope.directsCurrentPage = config.currentPage;
    $scope.loadingDates = true;
    $scope.sendMessageBox = false;
    $scope.pagination = {
      totalDirects: 0,
      totalTeam:0,
      perpage: config.pageLimit
    }

    $scope.replyMail = {};

    $scope.selected = [];
    $scope.options  = {
      rowSelection: true,
      multiSelect: true,
      autoSelect: true,
      decapitate: false,
      largeEditDialog: false,
      boundaryLinks: true,
      limitSelect: true,
      pageSelect: true
    };
    $scope.query   = {
      order: 'Name',
      limit: 10,
      page: 1
    };
    $scope.teamColumnHead = config.teamColumnHead;
    $scope.sponsorId = '';
    $scope.order = config.columnOrder;
    $scope.pageLimit = config.pageLimit;
    $scope.limit = config.messageLimit;

    // Toolbar Options 
    $scope.toolbarOptions = {
      height: 300,
      focus: true,
      airMode: false,
      toolbar: [
        ['edit',['undo','redo']],
        ['headline', ['style']],
        ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
        ['fontface', ['fontname']],
        ['textsize', ['fontsize']],
        ['fontclr', ['color']],
        ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
        ['height', ['height']],
        ['table', ['table']],
        ['insert', ['link','picture','video','hr']],
        ['view', ['fullscreen', 'codeview']],
      ]
    };


    // Get User Directs
    $scope.userDirects = function(currentPage, pageLimit) {
      $scope.teamDirectsData = [];
      coinomiaService.getUserDirects(currentPage, pageLimit)
        .then(function(res) {
          if(res.status === 200) {
            var data = res.data;
            $scope.pagination.totalDirects = data.total;
            $scope.teamDirectsData  = data.rows;
            // data.rows.forEach(function(info){
            //   var excelArray = [info.Name, info.Email, info.Sponsor, info.username, info.Mobile, info.country, info.TotalContract, info.TotalPurchased, info.DOJ, info.TotalDirect];
            //   $scope.arrayList.push(excelArray);
            // });
            // $scope.getExcelData($scope.arrayList);
            // $scope.getFlags(0, $scope.teamDirectsData, $scope.teamDirectsData.length);
          }
          
          if(currentPage === 1 && !$scope.arrayList && $scope.pagination.totalDirects > 0) {
            $scope.getAllUser('all', $scope.pagination.totalDirects);
          }
      });
    }

    $scope.getAllUser = function(pages, limit) {
      var currentPage = pages;
      coinomiaService.getUserDirects(currentPage, limit)
        .then(function(res) {
          if(res.status === 200) {
            var data = res.data;
            $scope.arrayList = [];

            $scope.directUsers  = data.rows;
            data.rows.forEach(function(info){
              var excelArray = {colA:info.Name, colB:info.Email, colC:info.Sponsor, colD:info.username, colE:info.Mobile, colF:info.country, colG:info.TotalContract, colH:info.TotalPurchased, colI:info.DOJ, colJ:info.TotalDirect};
              $scope.arrayList.push(excelArray);
            });

            // $scope.getFlags(0, $scope.teamDirectsData, $scope.teamDirectsData.length);
          }
      });
    }

    $scope.getUser = function(currentPage, pageLimit) {
      $scope.sendMessageBox = true;
      $scope.replyMail.message = '';
      coinomiaService.getUserDirects(currentPage, pageLimit)
        .then(function(res) {
          if(res.status === 200) {
            var data = res.data;
            $scope.pagination.totalUsers = data.total;
            $scope.teamDirectsUsers  = data.rows;
          }
      });
    }

    $scope.exportExcel = function(excelData) {
      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }

      var result = ngXlsx.writeXlsx([
      {
        sheetName: "userSheet",
        columnDefs: config.teamColumnHead,
        data: excelData
      }
      ]);
      /* the saveAs call downloads a file on the local machine */
      saveAs(new Blob([s2ab(result)],{type:"application/octet-stream"}), "direct-user.xlsx");
    }

    /*** Excel Export ***/
    $scope.getExcelData = function(excelData) {
      $scope.exportData = [{
          name: 'sheet1',
          data: excelData
      }];
    }

    // $scope.exportExcel = {
    //   down: function() {},
    // };
    /** -- Excel Export -- **/

    $scope.userDirects($scope.currentPage, $scope.pageLimit);

    // $scope.getAllUser('all');

    // Get All Referrals
    $scope.allReferral = function(page) {
      $scope.teamData = [];
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
            var treeData = res.data;
            $scope.downline  = res.data;
            for(var i in treeData) {
              if(treeData[i].ItemName !== undefined && treeData[i].ItemName.indexOf(' ') >= 0) {
                    var itemName = treeData[i].ItemName.split(' ');
                    $scope.downline[i].ItemName = itemName[0];
              }
            }
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
      coinomiaService.getTeamLeaderboard()
      .then(function(res){
        if(res.status == 200){
          var _members = res.data;
          var _length  = Math.max(Math.max(_members.Last7Days.length, _members.Last30Days.length), _members.alltime.length);
          $scope.maxTeam = [];
          for(var idx = 0; idx < length; idx++) {
            $scope.maxTeam.push({
              last7Days: _members.Last7Days[idx] ? _members.Last7Days[idx] : {},
              last30Days: _members.Last30Days[idx] ? _members.Last30Days[idx] : {},
              allTime: _members.alltime[idx] ? _members.alltime[idx] : {}
            })
          };
        }
      })
      // console.log($scope.maxTeam);
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

    $scope.sendMessage = function(replyMail) {
      if($scope.selected.length > 0 || replyMail.replyId) {
        if(replyMail.message) {
          $scope.messageError = false;
          $scope.sendError = false;
          var receiver = [];
          for(var i in $scope.selected) {
            var id = {"id": $scope.selected[i].username};
            receiver.push(id);
          }

          if(replyMail.replyId && replyMail.replySubject) {
            // Reply Message Parameter
            var sendData = {
               "Subject":replyMail.replySubject,
               "Message":replyMail.message,
               "Replyid ":replyMail.replyId,
               "Receiverids":receiver
            }
          }else{
            // Send Message Parameter
            var sendData = {
               Subject:replyMail.subject,
               Message:replyMail.message,
               Replyid:replyMail.replyId,
               Receiverids:receiver
            }
          }

          coinomiaService.sendMessage(sendData)
          .then(function(res){
            if(res.status === 200) {
              $scope.sendMessage = true;
              $window.location.reload();
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
        $scope.replyMail.replyId = reply.senderid;
      }else{
        $scope.sentReplyBox = true;
        $scope.replyMail.replyId = reply.receiverid;
      }

      $scope.replyMail.replySubject = reply.subject;
      $scope.replyMail.message = reply.body;
      angular.element("html, body").animate({ scrollTop: angular.element(document).height() }, 1000);
    }

    $scope.closePopup = function() {
      $uibModalStack.dismissAll();
      $window.location.reload();
    }

    // Activate Affiliate Account
    $scope.activeAffiliate = function(payment) {
      $scope.activePayments = true;
      var affiliateData = {
        paymode: payment.mode,
        paytype:""
      }

      // Active Affiliate Account
      coinomiaService.activeAffiliate(affiliateData)
      .then(function(res) {
        if(res.status === 200) {
          var data = res.data;

          $scope.affiliateAccount = true;
          $uibModalStack.dismissAll();
          $scope.transactionDetails = data;
          $scope.transactionDate = moment().format('YYYY-MM-DD');
          if(data.Message) {
            $scope.accountStatus = true;
          }else if(data.message && data.message !== 'success') {
            $scope.noBalance = true;
          }
          
          if(affiliateData.paymode==='WALLET' && !$scope.noBalance) {
            // Get User Info 
            coinomiaService.getUserInfo()
            .then(function(_res) {
              if(_res.status===200) {
                $scope.transactionDetails = data;
                var _info = _res.data;
                $scope.activationDate = moment(_info.affiliate_expiry_date).subtract(1, 'year').format('DD/MM/YYYY');
                $scope.expiryDate = moment(_info.affiliate_expiry_date).format('DD/MM/YYYY');
                $scope.activePayments = false;
                $scope.earningSuccess = true;
              }
            });
          }

          var modalInstance = $uibModal.open({
              templateUrl: 'views/transaction-invoice.html',
              scope: $scope,
              size: 'md'
          });
        }
      });
    }

    // Get Affiliate status
    $scope.$on('userDetails', function(events, info){
      $scope.loadingDates = false;
     if(info.affiliate_status===0) {
       $scope.affiliateStatus = false;
       $scope.activationDate = '-';
       $scope.expiryDate = '-';
     }else {
       $scope.affiliateStatus = true;
       $scope.activationDate = moment(info.affiliate_expiry_date).subtract(1, 'year').format('DD/MM/YYYY');
       $scope.expiryDate = moment(info.affiliate_expiry_date).format('DD/MM/YYYY');
     }
    })

    // Print Invoice
    $scope.printInvoice = function() {
      $window.print();
    }

    // Get Wallet Amount
    $scope.getWalletAmount = function() {
      coinomiaService.getWalletInfo()
      .then(function(res) {
        if(res.status === 200) {
          res.data.forEach(function(info) {
            if(info.Wallet === 'USD') {
              $scope.walletAmount = info.Balance;
            }
          })
        }
      });
    }

    $scope.getWalletAmount();

    // Active Payment
    $scope.ativatePayment = function(type) {
      $scope.walletEarnings = false;
      $scope.negativeBalance = false;
      if(type === 'gateway') {
        $scope.payment = {
          mode:"BTC"
        }
      }else{
        $scope.walletEarnings = true;
        $scope.affiliateFees = config.affiliateFees;
        $scope.availableBalance = $scope.walletAmount - $scope.affiliateFees;
        if($scope.availableBalance < 0) {
          $scope.negativeBalance = true;
        }
        $scope.payment = {
          mode:$filter('uppercase')(type)
        }
      }

      var modalInstance = $uibModal.open({
          templateUrl: 'views/payment-mode.html',
          scope: $scope,
          size: 'md'
      });
    }

    // Get Direct Income
    $scope.getDirectIncome = function(currentPage) {
      coinomiaService.directIncome(currentPage).then(function(res) {
        if( res.status === 200 ) {
          $scope.noDirectRecords = false;
          var data = res.data;
          $scope.directIncome = data.rows;
          $scope.totalRecords = data.total;
          if($scope.totalRecords === 0) {
            $scope.noDirectRecords = true;
          }
        }
      });
    }

    // Get Total Earning 
    $scope.getTotalEarning = function() {
      coinomiaService.totalEarning().then(function(res) {
        if(res.status === 200) {
          var data = res.data;
          if(data.hasOwnProperty('amount')) {
            $scope.totalEarning = data.amount;
          }else{
            $scope.totalEarning = 0;
          }          
        }
      });
    }

    // Get Commision Earning 
    $scope.getCommission = function() {
      coinomiaService.totalCommission().then(function(res) {
        if(res.status === 200) {
          var data = res.data;
          $scope.totalCommission = data.total;
          $scope.referralIncome = data.Referral;
          $scope.purchaseIncome = data.Purchase;
          $scope.rePurchaseIncome = data.Repurchase;
        }
      });
    }

    // Get Total Income
    $scope.getTotalIncome = function(currentPage) {      
      coinomiaService.totalIncome(currentPage).then(function(res) {
        if( res.status === 200 ) {
          $scope.noRecords = false;
          var data = res.data;
          $scope.teamIncome = data.rows;
          $scope.totalRows = data.total;
          if($scope.totalRows === 0) {
            $scope.noRecords = true;
          }
        }
      });
    }
    

    

    $scope.getTotalEarning();

    $scope.activeTab = function() {
      $scope.getUser($scope.currentPage, 10);
      angular.element( "ul.group_chat" ).find( "li" ).removeClass("active");
      angular.element( "ul.group_chat" ).find( "li.send_message" ).addClass("active");
    }

     $scope.onPaginationChange = function (page, limit) {
      $scope.getUser(page, limit);
    };

});
