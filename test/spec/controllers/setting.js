'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var SettingCtrl,
      $q,
      spy,
      coinomiaService,
      coinomiaServiceDeferred,
      scope;

  var postData = {
    'password': '123456a',
    'confirmPassword': '123456a'
  }

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _coinomiaService_, _$log_, _$q_) {
    $q = _$q_;
    coinomiaService = _coinomiaService_;

    scope = $rootScope.$new();
    coinomiaServiceDeferred = $q.defer();

    spyOn(coinomiaService, 'changePassword').and.returnValue(coinomiaServiceDeferred.promise);
    SettingCtrl = $controller('SettingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
    scope.user = {
      'NewPassword': '123456a',
      'ConfirmPassword': '123456a'
    };
  }));

  it('should be define and check password mismatch', function() {
    scope.confirmPass();
    expect(scope.confirmPassError).toEqual(false);
  });

  it('should be define and call change password service', function() {
    scope.changeUserPassword(scope.user);
    expect(coinomiaService.changePassword).toHaveBeenCalledWith(scope.user);
  });
});
