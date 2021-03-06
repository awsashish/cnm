'use strict';

/**
 * @ngdoc service
 * @name coinomiaFrontendApp.coinomiaService
 * @description
 * # coinomiaService
 * Service in the coinomiaFrontendApp.
 */
angular.module('coinomiaFrontendApp')
  .service('coinomiaService', function ($http, $log, $state, $window, $cookies, $localStorage, $location, config) {

    var pageLimit = config.pageLimit;
    // this.apiHost = 'https://api.coinomia.com/';

    if($location.host() === 'login.coinomia.com') {
      this.apiHost = 'https://api.coinomia.com/';
      this.devHost = 'https://api.coinomia.com/';
    }else{
      this.apiHost = 'http://coinomiadevapi.azurewebsites.net/';
      this.devHost = 'http://coinomiadevapi.azurewebsites.net/';
    }

    this.requestConfig = {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj) {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
          }
    };    

    this.requestFailed = function (error) {
      return error;
      $log.error('XHR Failed for User location.\n' + angular.toJson(error.data, true));
    };

    // Login Process
    this.login = function(formData) {
      var data = formData;

      function loginComplete(response) {
        return response;
      }

      function loginFailed(error) {
        $log.error('XHR Failed for login.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost + 'oauth2/token', data, this.requestConfig)
        .then(loginComplete)
        .catch(loginFailed);
    };

    this.checkLoginCredentials =  function(formData) {
      var data = formData;

      function checkCredentialsComplete(response) {
        return response;
      }

      function checkCredentialsFailed(error) {
        $log.error('XHR Failed for login.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost + 'user/login', data, this.requestConfig)
        .then(checkCredentialsComplete)
        .catch(checkCredentialsFailed);
    }

    this.otpLogin = function(formData, otp) {
      var data = formData;
      var otpRequestHeader = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'otp': otp
        },
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        }
      }

      function otpLoginComplete(response) {
        return response;
      }

      function otpLoginFailed(error) {
        $log.error('XHR Failed for login.\n' + angular.toJson(error.data, true));
        return error;
      }
  
      return $http.post(this.apiHost + 'oauth2/token', data, otpRequestHeader)
        .then(otpLoginComplete)
        .catch(otpLoginFailed);
    }

    // Sign Up process
    this.signup = function(formData) {
      var data = formData;

      function signupComplete(response) {
        return response;
      }

      function signupFailed(error, status) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(status, true));
        return error;
      }

      return $http.post(this.apiHost + 'user/signup', data)
        .then(signupComplete)
        .catch(signupFailed);
    };

    // Get User Referrals
    this.getUserDirects = function(currentPage, limit) {
      function userDirectsComplete(response) {
        return response;
      }

      function userDirectsFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }
      if(currentPage === 'all') {
        return $http.get(this.apiHost +'user/referral/1/'+limit)
          .then(userDirectsComplete)
          .catch(userDirectsFailed);
      }else{
        return $http.get(this.apiHost +'user/referral/'+currentPage+'/'+limit)
          .then(userDirectsComplete)
          .catch(userDirectsFailed);
      }

    };


    // All Referrals
    this.getAllReferral = function(currentPage) {

      function getAllReferralComplete(response) {
        return response;
      }

      function getAllReferralFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.get(this.apiHost +'user/all-referral/'+currentPage+'/'+pageLimit)
        .then(getAllReferralComplete)
        .catch(getAllReferralFailed);

    };

    // Change password process
    this.changePassword = function(formData) {
      var data = formData;

      function changePasswordComplete(response) {
        return response;
      }

      function changePasswordFailed(error) {
        $log.error('XHR Failed for change password.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/change-password/', data)
        .then(changePasswordComplete)
        .catch(changePasswordFailed);
    };

    // Get All Countries
    this.getCountries = function() {

      function getCountriesComplete(response) {
        return response.data;
      }

      function getCountriesFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
      }

      return $http.post(this.apiHost +'utilities/list-countries/')
        .then(getCountriesComplete)
        .catch(getCountriesFailed);
    };

    // Get User Profile
    this.getUserInfo = function() {

      function getInfoComplete(response) {
        return response;
      }

      function getInfoFailed(error) {
        $log.error('XHR Failed for User Profile.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/me/')
        .then(getInfoComplete)
        .catch(getInfoFailed);
    };

    // Get Purchased Power
    this.getPurchasePower = function() {

      function getPurchasePowerComplete(response) {
        return response;
      }

      function getPurchasePowerFailed(error) {
        $log.error('XHR Failed for purchase power.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/purchased-power/')
        .then(getPurchasePowerComplete)
        .catch(getPurchasePowerFailed);
    };

    // Current Mining
    this.currentMining = function() {

      function currentMiningComplete(response) {
        return response;
      }

      function currentMiningFailed(error) {
        $log.error('XHR Failed for current mining.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/products/')
        .then(currentMiningComplete)
        .catch(currentMiningFailed);
    };

    // Get Total Income
    this.getTotalIncome = function() {

      function getTotalIncomeComplete(response) {
        return response;
      }

      function getTotalIncomeFailed(error) {
        $log.error('XHR Failed for total income.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/total-income/')
        .then(getTotalIncomeComplete)
        .catch(getTotalIncomeFailed);
    };

    // Get Latest Transaction and Withdrawals
    this.getTransactionDetails = function(currentPage) {

      function transactionComplete(response) {
        return response;
      }

      function transactionFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/latest-transaction/'+currentPage)
        .then(transactionComplete)
        .catch(transactionFailed);
    };

    // Get Products
    this.getProducts = function() {

      function getProductsComplete(response) {
        return response;
      }

      function getProductsFailed(error) {
        $log.error('XHR Failed for signup.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/products/')
        .then(getProductsComplete)
        .catch(getProductsFailed);
    };

    // Get User Location

    this.getUserLocation = function() {
      return $http.get('https://freegeoip.net/json/')
      .catch(this.requestFailed);
    };

    // Authentication
    this.isAuthenticated = function() {
      if ($cookies.get('token') || $localStorage.token) {
        return true;
      }else{
        return false;
      }
    };

    // Verfying User Email
    this.verifyEmail = function(token) {

      function verificationComplete(response) {
        return response;
      }

      function verificationFailed(error) {
        $log.error('XHR Failed for verification email.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/email-verify/'+token)
        .then(verificationComplete)
        .catch(verificationFailed);
    }

    // Get Landing Pages & Referral Links
    this.getLandingPages = function() {
      // On Success
      function landingRequestComplete(response) {
        return response;
      }

      // On Failed
      function landingRequestFailed(error) {
        $log.error('XHR Failed for landing pages.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/landing-pages')
        .then(landingRequestComplete)
        .catch(landingRequestFailed);
    }

    // Get Default Sponsor
    this.getDefaultSponsor = function() {
      // On Success
      function defaultSponsorRequestComplete(response) {
        return response;
      }

      // On Failed
      function defaultSponsorRequestFailed(error) {
        $log.error('XHR Failed for Deafult Sponsor.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'utilities/default-sponsor')
        .then(defaultSponsorRequestComplete)
        .catch(defaultSponsorRequestFailed);
    }

    // Verify Sponsor
    this.verifySponsor = function(sponsorId) {
      // On Success
      function verfiySponsorRequestComplete(response) {
        return response;
      }

      // On Failed
      function verfiySponsorRequestFailed(error) {
        $log.error('XHR Failed for Verify Sponsor.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'utilities/verify-sponsor', sponsorId)
        .then(verfiySponsorRequestComplete)
        .catch(verfiySponsorRequestFailed);
    }

    // Update Landing Pages
    this.updateLandingPage = function(landingPage) {
      // On Success
      function updateLandingPageRequestComplete(response) {
        return response;
      }

      // On Failed
      function updateLandingPageRequestFailed(error) {
        $log.error('XHR Failed for Verify Sponsor.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/update-landing-page', landingPage)
        .then(updateLandingPageRequestComplete)
        .catch(updateLandingPageRequestFailed);
    }

    // Refresh Token Process
    this.getRefreshToken = function(data) {

      function tokenRequestComplete(response) {
        return response;
      }

      function tokenRequestFailed(error) {
        $log.error('XHR Failed for refresh token.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost + 'oauth2/token', data, this.requestConfig)
        .then(tokenRequestComplete)
        .catch(tokenRequestFailed);
    };

    // Get Packages
    this.getPackages = function() {
      // On Success
      function getPackagesRequestComplete(response) {
        return response;
      }

      // On Failed
      function getPackagesRequestFailed(error) {
        $log.error('XHR Failed for Packages.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'utilities/packages')
        .then(getPackagesRequestComplete)
        .catch(getPackagesRequestFailed);
    }

    // Add Coinomia Academy User
    this.addAcademyUser= function(academyUser) {

      function userAdded(response) {
        return response;
      }

      function userAddFailed(error) {
        $log.error('XHR Failed to Add Coinomia Academy User.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.devHost +'user/add-academy-user', academyUser)
        .then(userAdded)
        .catch(userAddFailed);
    };

    // Get User Virtual Tree Info
    this.getVirtualTree = function() {
      // On Success
      function getVirtualTreeRequestComplete(response) {
        return response;
      }

      // On Failed
      function getVirtualTreeRequestFailed(error) {
        $log.error('XHR Failed for Packages.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/virtualtree')
        .then(getVirtualTreeRequestComplete)
        .catch(getVirtualTreeRequestFailed);
    }

    // Get User Downline Info
    this.getUserDownline = function(sponsorId) {
      // On Success
      function getUserDownlineRequestComplete(response) {
        return response;
      }

      // On Failed
      function getUserDownlineRequestFailed(error) {
        $log.error('XHR Failed for Packages.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/tree/'+sponsorId)
        .then(getUserDownlineRequestComplete)
        .catch(getUserDownlineRequestFailed);
    }

    // Get User Team
    this.getTeamCalendar = function() {
      // On Success
      function getTeamRequestComplete(response) {
        return response;
      }

      // On Failed
      function getTeamRequestFailed(error) {
        $log.error('XHR Failed for User Team.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/team-calendar')
        .then(getTeamRequestComplete)
        .catch(getTeamRequestFailed);
    }

    // Get Coinomia Team
    this.getCoinomiaTeamCalendar = function() {
      // On Success
      function getCoinomiaTeamRequestComplete(response) {
        return response;
      }

      // On Failed
      function getCoinomiaTeamRequestFailed(error) {
        $log.error('XHR Failed for User Team.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/coinomia-calendar')
        .then(getCoinomiaTeamRequestComplete)
        .catch(getCoinomiaTeamRequestFailed);
    }

    // Forgot Password
    this.forgotPassword = function(emailId) {
      // On Success
      function forgotPasswordRequestComplete(response) {
        return response;
      }

      // On Failed
      function forgotPasswordRequestFailed(error) {
        $log.error('XHR Failed for Forgot Password.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'forgot-password', emailId)
        .then(forgotPasswordRequestComplete)
        .catch(forgotPasswordRequestFailed);
    }

    // Resend Verification Email
    this.resendEmail = function(emailId) {
      // On Success
      function resendEmailRequestComplete(response) {
        return response;
      }

      // On Failed
      function resendEmailRequestFailed(error) {
        $log.error('XHR Failed for Resend Verification Email.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'resend-verification', emailId)
        .then(resendEmailRequestComplete)
        .catch(resendEmailRequestFailed);
    }

    // Reset Password
    this.resetPassword = function(resetData) {
      // On Success
      function resetPasswordRequestComplete(response) {
        return response;
      }

      // On Failed
      function resetPasswordRequestFailed(error) {
        $log.error('XHR Failed for Reset Password.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'reset-password', resetData)
        .then(resetPasswordRequestComplete)
        .catch(resetPasswordRequestFailed);
    }

    // Switch to L | R | A | W Placement
    this.switchPlacement = function(placement) {
      // On Success
      function switchPlacementRequestComplete(response) {
        return response;
      }

      // On Failed
      function switchPlacementRequestFailed(error) {
        $log.error('XHR Failed for Switch Placement.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/auto-rotator', placement)
        .then(switchPlacementRequestComplete)
        .catch(switchPlacementRequestFailed);
    }

    // Get User Banners
    this.getBanners = function() {
      // On Success
      function getBannerRequestComplete(response) {
        return response;
      }

      // On Failed
      function getBannerRequestFailed(error) {
        $log.error('XHR Failed for Switch Placement.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/banners')
        .then(getBannerRequestComplete)
        .catch(getBannerRequestFailed);
    }

    // Get User Direct leader Board
    this.getDirectLeaderboard = function() {
      // On Success
      function getLeaderboardRequestComplete(response) {
        return response;
      }

      // On Failed
      function getLeaderboardRequestFailed(error) {
        $log.error('XHR Failed for Switch Placement.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/leader-board-direct')
        .then(getLeaderboardRequestComplete)
        .catch(getLeaderboardRequestFailed);
    }

    // Get User Team leader Board
    this.getTeamLeaderboard = function() {
      // On Success
      function getTeamLeaderboardRequestComplete(response) {
        return response;
      }

      // On Failed
      function getTeamLeaderboardRequestFailed(error) {
        $log.error('XHR Failed for Switch Placement.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/leader-board-team')
        .then(getTeamLeaderboardRequestComplete)
        .catch(getTeamLeaderboardRequestFailed);
    }

    // Update Profile
    this.updateProfile = function(formData) {
      // On Success
      function updateProfileRequestComplete(response) {
        return response;
      }

      // On Failed
      function updateProfileRequestFailed(error) {
        $log.error('XHR Failed for Update Profile.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/update-profile', formData)
        .then(updateProfileRequestComplete)
        .catch(updateProfileRequestFailed);
    }

    // Get User Wallet Info
    this.getWalletInfo = function() {
      // On Success
      function getWalletInfoRequestComplete(response) {
        return response;
      }

      // On Failed
      function getWalletInfoRequestFailed(error) {
        $log.error('XHR Failed for Wallet Info.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/wallet-status')
        .then(getWalletInfoRequestComplete)
        .catch(getWalletInfoRequestFailed);
    }

    // Update Profile
    this.updateWalletInfo = function(formData) {
      // On Success
      function updateWalletInfoRequestComplete(response) {
        return response;
      }

      // On Failed
      function updateWalletInfoRequestFailed(error) {
        $log.error('XHR Failed for Update Profile.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/update-wallet', formData)
        .then(updateWalletInfoRequestComplete)
        .catch(updateWalletInfoRequestFailed);
    }

    // Get Total Sign Ups
    this.getLatestSignup = function() {
      // On Success
      function getLatestSignupRequestComplete(response) {
        return response;
      }

      // On Failed
      function getLatestSignupRequestFailed(error) {
        $log.error('XHR Failed for Wallet Info.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'latest-signup')
        .then(getLatestSignupRequestComplete)
        .catch(getLatestSignupRequestFailed);
    }

    // Create Referral Campaign and Banner Campaign
    this.createCampaign = function(campaignData) {
      //  On Success
      function createCampaignRequestComplete(response) {
        return response;
      }

      // On Failed
      function createCampaignRequestFailed(error) {
        $log.error('XHR Failed for Create Campaign.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'affiliate/create-campaign', campaignData)
        .then(createCampaignRequestComplete)
        .catch(createCampaignRequestFailed);
    }

    // Get Referral and Banner Reports
    this.getReports = function(type) {
      // On Success
      function getReportsRequestComplete(response) {
        return response;
      }

      // On Failed
      function getReportsRequestFailed(error) {
        $log.error('XHR Failed for Referral Reports.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'affiliate/campaign-report/'+type)
        .then(getReportsRequestComplete)
        .catch(getReportsRequestFailed);
    }

    // Get Banner Reports
    // this.getBannerReports = function() {
    //   // On Success
    //   function bannerReportsRequestComplete(response) {
    //     return response;
    //   }
    //
    //   // On Failed
    //   function bannerReportsRequestFailed(error) {
    //     $log.error('XHR Failed for Banner Reports.\n' + angular.toJson(error.data, true));
    //     return error;
    //   }
    //
    //   return $http.get(this.apiHost +'affiliate/banner-report')
    //     .then(bannerReportsRequestComplete)
    //     .catch(bannerReportsRequestFailed);
    // }

    // Send Message
    this.sendMessage =  function(messageData) {
      // On Success
      function sendMessageRequestComplete(response) {
        return response;
      }

      // On Failed
      function sendMessageRequestFailed(error) {
        $log.error('XHR Failed for Send Message Reports.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/compose', messageData)
        .then(sendMessageRequestComplete)
        .catch(sendMessageRequestFailed);
    }

    // Get Inbox List
    this.getInboxList = function(page, limit) {
      // On Success
      function getInboxListRequestComplete(response) {
        return response;
      }

      // On Failed
      function getInboxListRequestFailed(error) {
        $log.error('XHR Failed for Inbox List.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/inbox-item/'+page+'/'+limit)
        .then(getInboxListRequestComplete)
        .catch(getInboxListRequestFailed);
    }

    // Get Inbox Search Results
    this.getInboxSearch = function(filter, page, limit) {
      // On Success
      function getInboxSearchRequestComplete(response) {
        return response;
      }

      // On Failed
      function getInboxSearchRequestFailed(error) {
        $log.error('XHR Failed for Inbox List.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/inbox-item/'+filter+'/'+page+'/'+limit)
        .then(getInboxSearchRequestComplete)
        .catch(getInboxSearchRequestFailed);
    }

    // Get Inbox Search Results
    this.getSentSearch = function(filter, page, limit) {
      // On Success
      function getSentSearchRequestComplete(response) {
        return response;
      }

      // On Failed
      function getSentSearchRequestFailed(error) {
        $log.error('XHR Failed for Inbox List.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/sent-item/'+filter+'/'+page+'/'+limit)
        .then(getSentSearchRequestComplete)
        .catch(getSentSearchRequestFailed);
    }


    // Get Search User Results
    this.searchUser = function(filterType, filter, page) {
      // On Success
      function searchUserRequestComplete(response) {
        return response;
      }

      // On Failed
      function searchUserRequestFailed(error) {
        $log.error('XHR Failed for Inbox List.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/all-group/'+filterType+'/'+filter+'/'+page)
        .then(searchUserRequestComplete)
        .catch(searchUserRequestFailed);
    }

    // Get Sent List
    this.getSentList = function(page, limit) {
      // On Success
      function getSentListRequestComplete(response) {
        return response;
      }

      // On Failed
      function getSentListRequestFailed(error) {
        $log.error('XHR Failed for Sent List.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/sent-item/'+page+'/'+limit)
        .then(getSentListRequestComplete)
        .catch(getSentListRequestFailed);
    }

    // View Message
    this.viewMessage = function(type, messageId) {
      function viewMessageRequestComplete(response) {
        return response;
      }

      // On Failed
      function viewMessageRequestFailed(error) {
        $log.error('XHR Failed for View Message.\n' + angular.toJson(error.data, true));
        return error;
      }

      if(type == 'inbox') {
        return $http.get(this.apiHost +'user/inbox/'+messageId)
          .then(viewMessageRequestComplete)
          .catch(viewMessageRequestFailed);
      }else if(type == 'sent') {
        return $http.get(this.apiHost +'user/sentbox/'+messageId)
          .then(viewMessageRequestComplete)
          .catch(viewMessageRequestFailed);
      }
    }

    // Active affiliate
    this.activeAffiliate = function(affiliateData) {
      // On Success
      function activeAffiliateRequestComplete(response) {
        return response;
      }

      // On Failed
      function activeAffiliateRequestFailed(error) {
        $log.error('XHR Failed for Active Affiliate.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/active-affiliate', affiliateData)
        .then(activeAffiliateRequestComplete)
        .catch(activeAffiliateRequestFailed);
    }

    // Update Profile
    this.addUsdFund = function(amount) {
      // On Success
      function addUsdFundRequestComplete(response) {
        return response;
      }

      // On Failed
      function addUsdFundRequestFailed(error) {
        $log.error('XHR Failed for Add Fund.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/add-fund', amount)
        .then(addUsdFundRequestComplete)
        .catch(addUsdFundRequestFailed);
    }

    // Update Profile
    this.addAcademyFund = function(amount) {
      // On Success
      function addAcademyFundRequestComplete(response) {
        return response;
      }

      // On Failed
      function addAcademyFundRequestFailed(error) {
        $log.error('XHR Failed for Add Fund.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/add-fund-academy', amount)
        .then(addAcademyFundRequestComplete)
        .catch(addAcademyFundRequestFailed);
    }
    // Update Profile
    this.fundStatus = function(btcAddress) {
      // On Success
      function fundStatusRequestComplete(response) {
        return response;
      }

      // On Failed
      function fundStatusRequestFailed(error) {
        $log.error('XHR Failed for Fund Status.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/btc-transaction', btcAddress)
        .then(fundStatusRequestComplete)
        .catch(fundStatusRequestFailed);
    }


    // Change Date format
    this.changeDateFormat = function(user) {
      var changeFormat = user.day.split('-').reverse().join('-');
      var date = moment(changeFormat);
      var day = date.format('ddd');
      var dayNumber = date.date();
      var myTeamData = {
        date:date.format('YYYY-MM-DD'),
        day: day,
        dayNumber: dayNumber,
        total: user.total
      }

      return myTeamData;
    }

    // Get All Dates Between Two Dates
    this.getAllDates = function(team) {
      var getLastRow = _.last(team);
      // Get All Dates Between Two Dates
      var lastDate = getLastRow.date;
      var futureDate = new moment(lastDate).add(18, 'day').format('YYYY-MM-DD');

      var getFutureDates = [];
      while(lastDate <= futureDate) {
        lastDate = moment(lastDate).add(1, 'day').format('YYYY-MM-DD');
        var _date = moment(lastDate);
        var _day = _date.format('ddd');
        var _dayNumber = _date.date();
        var _myTeamData = {
          date: _date.format('YYYY-MM-DD'),
          day: _day,
          dayNumber: _dayNumber
        }
        getFutureDates.push(_myTeamData);
      }
      return getFutureDates;
    }

    // Hit Campaign Id on Sign Up
    this.hitCampaign = function(campaignData) {
      // On Success
      function hitCampignRequestComplete(response) {
        return response;
      }

      // On Failed
      function hitCampignRequestFailed(error) {
        $log.error('XHR Failed for Hit Campaign.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'affiliate/hit-campaign', campaignData)
        .then(hitCampignRequestComplete)
        .catch(hitCampignRequestFailed);
    }

    // Get Direct Referral Income
    this.directIncome = function(currentPage) {
      // On Success
      function directIncomeRequestComplete(response) {
        return response;
      }

      // On Failed
      function directIncomeRequestFailed(error) {
        $log.error('XHR Failed for Referral Income.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/referral-income/'+currentPage+'/'+pageLimit)
        .then(directIncomeRequestComplete)
        .catch(directIncomeRequestComplete);
    }

    // Get Total Earning
    this.totalEarning = function() {
      // On Success
      function totalEarningRequestComplete(response) {
        return response;
      }

      // On Failed
      function totalEarningRequestFailed(error) {
        $log.error('XHR Failed for Total Earning.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/total-earning')
        .then(totalEarningRequestComplete)
        .catch(totalEarningRequestFailed);
    }

    // Get User Commission
    this.totalCommission = function() {
      // On Success
      function totalCommissionRequestComplete(response) {
        return response;
      }

      // On Failed
      function totalCommissionRequestFailed(error) {
        $log.error('XHR Failed for Total Commission.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/total-commission')
        .then(totalCommissionRequestComplete)
        .catch(totalCommissionRequestFailed);
    }

    // Get Total Income
    this.totalIncome = function(currentPage) {
      // On Success
      function totalIncomeRequestComplete(response) {
        return response;
      }

      // On Failed
      function totalIncomeRequestFailed(error) {
        $log.error('XHR Failed for Total Income.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/team-income/'+currentPage+'/'+pageLimit)
        .then(totalIncomeRequestComplete)
        .catch(totalIncomeRequestComplete);
    }

    // Book Order
    this.bookOrder = function(orderData) {
      // On Success
      function bookOrderRequestComplete(response) {
        return response;
      }

      // On Failed
      function bookOrderRequestFailed(error) {
        $log.error('XHR Failed for Book Order.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/order', orderData)
        .then(bookOrderRequestComplete)
        .catch(bookOrderRequestFailed);
    }

    // Order History
    this.orderHistory = function(type, product) {
       // On Success
      function orderHistoryRequestComplete(response) {
        return response;
      }

      // On Failed
      function orderHistoryRequestFailed(error) {
        $log.error('XHR Failed for Order History.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/order-history/'+type+'/?package='+product)
        .then(orderHistoryRequestComplete)
        .catch(orderHistoryRequestFailed);
    }

    // Transfer Fund
    this.transferFund = function(transferData) {
      // On Success
      function transferFundRequestComplete(response) {
        return response;
      }

      // On Failed
      function transferFundRequestFailed(error) {
        $log.error('XHR Failed for Transfer Fund.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/fund-transfer', transferData)
        .then(transferFundRequestComplete)
        .catch(transferFundRequestFailed);
    }

    // Transfer Fund
    this.transferAcademyFund = function(transferData) {
      // On Success
      function transferAcademyFundRequestComplete(response) {
        return response;
      }

      // On Failed
      function transferAcademyFundRequestFailed(error) {
        $log.error('XHR Failed for Transfer Fund.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/academy-fund-transfer', transferData)
        .then(transferAcademyFundRequestComplete)
        .catch(transferAcademyFundRequestFailed);
    }

    // Withdrawal Amount
    this.withdrawalAmount = function(data, type) {
      // On Success
      function withdrawalAmountRequestComplete(response) {
        return response;
      }

      // On Failed
      function withdrawalAmountRequestFailed(error) {
        $log.error('XHR Failed for Withdrawal Amount.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/withdrawal-'+type, data)
        .then(withdrawalAmountRequestComplete)
        .catch(withdrawalAmountRequestFailed);
    }

    // Convert Amount to USD
    this.convertUSD = function(data, type) {
      // On Success
      function convertUSDRequestComplete(response) {
        return response;
      }

      // On Failed
      function convertUSDRequestFailed(error) {
        $log.error('XHR Failed for Convert Amount.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/convert-'+type, data)
        .then(convertUSDRequestComplete)
        .catch(convertUSDRequestFailed);
    }

    // Get Mining Payouts
    this.getPayouts = function(currentPage) {
       // On Success
      function getPayoutsRequestComplete(response) {
        return response;
      }

      // On Failed
      function getPayoutsRequestFailed(error) {
        $log.error('XHR Failed for Mining Payout.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/mining-payout/'+currentPage+'/'+pageLimit)
        .then(getPayoutsRequestComplete)
        .catch(getPayoutsRequestFailed);
    }

    // Get Available Stock
    this.getPackageStock = function() {

       // On Success
      function getStockRequestComplete(response) {
        return response;
      }

      // On Failed
      function getStockRequestFailed(error) {
        return error;
      }

      return $http.get(this.apiHost + 'user/available-stock')
        .then(getStockRequestComplete)
        .catch(getStockRequestFailed);

    }

    // Get All Time Rewards
    this.getAllRewards = function() {
      
      // On Success
      function getAllRewardsRequestComplete(response) {
        return response;
      }

      // On Failed
      function getAllRewardsRequestFailed(error) {
        $log.error('XHR Failed for Rewards.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/rewardalldays')
        .then(getAllRewardsRequestComplete)
        .catch(getAllRewardsRequestFailed);
    }

    // Get 7 Days Rewards
    this.get7daysRewards = function() {
      
      // On Success
      function get7daysRewardsRequestComplete(response) {
        return response;
      }

      // On Failed
      function get7daysRewardsRequestFailed(error) {
        $log.error('XHR Failed for Rewards.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/reward7days')
        .then(get7daysRewardsRequestComplete)
        .catch(get7daysRewardsRequestFailed);
    }

    // Get Packages
    this.academyPackages = function() {

      function packagesRetrieved(response) {
        return response;
      }

      function packageRetrieveFailed(error) {
        $log.error('XHR Failed to Retrieve Package Information.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.devHost +'utilities/academy-packages')
        .then(packagesRetrieved)
        .catch(packageRetrieveFailed);

    };

    //Buy Packages
    this.buyPackages = function(data) {

      function packagesBought(response) {
        return response;
      }

      function packageBuyFailed(error) {
        $log.error('XHR Failed to Buy Packages.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.devHost +'user/academy-order', data)
        .then(packagesBought)
        .catch(packageBuyFailed);
    };

    //Package Purchase History
    this.packagePurchaseHistory = function() {

      function packageHistorySuccess(response) {
        return response;
      }

      function packageHistoryFailed(error) {
        $log.error('XHR Failed to Retrieve Package Purchase History.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.devHost +'user/academy-order-history')
        .then(packageHistorySuccess)
        .catch(packageHistoryFailed);
    };

    // Get Achievement Rewards
    this.getAchievements = function() {
      
      // On Success
      function getAchievementsRequestComplete(response) {
        return response;
      }

      function getAchievementsRequestFailed(error) {
        $log.error('XHR Failed for Rewards.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/reward')
        .then(getAchievementsRequestComplete)
        .catch(getAchievementsRequestFailed);
    }

    // Get Achievement Rewards
    this.getAllTimeAchiever = function() {
      
      // On Success
      function getAllTimeAchieverRequestComplete(response) {
        return response;
      }

      function getAllTimeAchieverRequestFailed(error) {
        $log.error('XHR Failed for Rewards Achiever.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.get(this.apiHost +'user/rewardachiever')
        .then(getAllTimeAchieverRequestComplete)
        .catch(getAllTimeAchieverRequestFailed);
    }

    // Request OTP
    this.requestOTP = function() {

      function requestOTPComplete(response) {
        return response;
      }

      function requestOTPFailed(error) {
        $log.error('XHR Failed for Request OTP .\n' + angular.toJson(error.data, true));
      }

      return $http.get(this.apiHost +'user/TwoFactorOTP')
        .then(requestOTPComplete)
        .catch(requestOTPFailed);

    };

    // Enable OTP
    this.enableOTP = function(data) {
      // On Success
      function enableOTPComplete(response) {
        return response;
      }

      // On Failed
      function enableOTPtFailed(error) {
        $log.error('XHR Failed for Enable OTP.\n' + angular.toJson(error.data, true));
        return error;
      }

      return $http.post(this.apiHost +'user/TwoFactorStatusChange', data)
        .then(enableOTPComplete)
        .catch(enableOTPtFailed);
    }

  });
