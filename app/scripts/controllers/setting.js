'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:SettingCtrl
 * @description
 * # SettingCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('SettingCtrl', function ($scope, config, coinomiaService, $state, $timeout, $window, UtilsService, $uibModal, $uibModalStack, $localStorage) {
    $scope.confirmPassError = false;
    $scope.showSaveAvatar = false;
    $scope.changeImage = true;
    $scope.otpStatus = $localStorage.otpStatus;
    $scope.user = {};

    $scope.walletHeading = config.wallet;

    $scope.confirmPass = function(callback) {
      if($scope.user.NewPassword !== $scope.user.ConfirmPassword) {
        $scope.confirmPassError = true;
        $scope.passwordError = 'Passwords do not match.';
      }else{
        $scope.confirmPassError = false;
      }
      if(typeof callback === 'function') {
        return callback($scope.confirmPassError);
      }
    }

    // $localStorage.$default({otpEnabled: true});

    // Change User Password
    $scope.changeUserPassword = function(data) {
      var info = $scope.user;
      $scope.confirmPass(function(error) {
        if(error === false) {
          coinomiaService.changePassword(info)
            .then(function(res) {
              if(res.status === 200) {
                $scope.errorMessage = '';
                $scope.successMessage = 'Password Changed Successfully';
              }else{
                $scope.successMessage = '';
                $scope.errorMessage = res.data.Message;
              }
            });
        }
      });
    }

    $scope.updateProfile = function(userData) {
      $scope.user.name = userData.name;
      $scope.name = userData.name.split(" ");

      $scope.firstName = $scope.name[0].trim();
      $scope.lastName  = $scope.user.name.replace($scope.firstName, '').trim();
      var formData = {
        'FirstName':$scope.firstName,
        'LastName':$scope.lastName,
        'Email':userData.Email,
        'Country':userData.Country,
        'State':userData.State,
        'City':userData.City,
        'Address':userData.Address,
        'Mobile':userData.Mobile,
        'Pincode':userData.Pincode,
        'avatar':userData.avatar
      };

      coinomiaService.updateProfile(formData)
        .then(function(res) {
          if(res.status === 200){
            $scope.errorMessage = '';
            $scope.successMessage = 'Profile Updated Successfully';
            $timeout($window.location.reload(), 1000, true);
          }else{
            $scope.successMessage = '';
            $scope.errorMessage = res.data.Message;
          }
        });
    }

    UtilsService.getCountryDialCode().then(function(res) {
      $scope.dialCode = res;
    });

    $scope.walletInfo = function() {
      coinomiaService.getWalletInfo()
        .then(function(res){
          if(res.status === 200){
            $scope.walletData = res.data;
          }
        });
    }

    $scope.updateWallet = function(wallet, address) {
      var walletData = {
        "wallet": wallet,
        'address': address
      }
      coinomiaService.updateWalletInfo(walletData)
        .then(function(res){
          if(res.status === 200) {
            $scope.successMessage = 'Wallet Info updated successfully.';
          }else{
            $scope.errorMessage = 'OOPS! Something went wrong. Please try again.'
          }
        });
    }

    $scope.showSaveAvatar = false;
    var handleFileSelect = function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      if(['image/jpeg', 'image/png'].indexOf(file.type) >= 0) {
        reader.onload = function (evt) {
          $scope.$apply(function($scope){
            $scope.myImage=evt.target.result;
            $scope.userInfo.avatar = $scope.myImage;
            $scope.showSaveAvatar = true;
            $scope.changeImage = false;
          });
        };
        reader.readAsDataURL(file);
      }
    };


    $scope.closePopup = function() {
      $uibModalStack.dismissAll();
    }

    $scope.changeStatus = function(getValue) {
      $scope.factorStatus = getValue;   

      coinomiaService.requestOTP().then(function(res) {
        if(res.Message === 'success') {
          $scope.modalInstance = $uibModal.open({
              templateUrl: 'views/modal/otp.html',
              scope: $scope,
              size: 'md'
          });
        }
      });

      // $scope.modalInstance = $uibModal.open({
      //         templateUrl: 'views/modal/otp.html',
      //         scope: $scope,
      //         size: 'md'
      //     });
      
    }

    $scope.changeOTPStatus = function(factorValue, otp) {
      $scope.otpErrorMessage = '';
      var otpData = {
        "TwoFactorEnabled":factorValue,
        "OTP":otp
      }
      coinomiaService.enableOTP(otpData).then(function(res) {
        var _data = res.data;
        if(_data.Message === 'success' && $scope.otpStatus === true) {
          $scope.otpStatus === false;
          $localStorage.$default({otpEnabled: false});
          $scope.closePopup();
        }else if(_data.Message === 'success' && $scope.otpStatus === false){
          $scope.otpStatus === true;
          $localStorage.$default({otpEnabled: true});
          $scope.closePopup();
        }else{
          $scope.otpErrorMessage = _data.Message;
        }
      });
    }


    angular.element('#fileInput').on('change', handleFileSelect);

    // Get User's Sponsor
    // $scope.sponsorInfo = function() {
    //   coinomiaService.getUserSponsor()
    //     .then(function(res) {
    //       console.log(res);
    //     });
    // }
  });
