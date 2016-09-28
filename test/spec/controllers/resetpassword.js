'use strict';

describe('Controller: ResetpasswordCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var ResetpasswordCtrl,
      $q,
      deferred,
      coinomiaService,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _coinomiaService_, _$log_, _$q_) {
    $q = _$q_;
    coinomiaService = _coinomiaService_;

    scope = $rootScope.$new();
    deferred = $q.defer();

    spyOn(coinomiaService, 'resetPassword').and.returnValue(deferred.promise);

    ResetpasswordCtrl = $controller('ResetpasswordCtrl', {
      $scope: scope
      // place here mocked dependencies
    });

    scope.user = {
      'password': '123456a',
      'confirmPassword': '123456a'
    };

    scope.resetData = {
      EmailId: 'some@gmail.com',
      UniqueCode: 'B991F56C­21AE­4E31­923 2­FDD96A354407',
      NewPassword: '123zaq!1',
      ConfirmPassword: '123zaq!1'
    }

  }));

  it('should be define and check password mismatch', function() {
    scope.confirmPass();
    expect(scope.confirmPassError).toEqual(false);
  });

  it('should be defined and call reset password service', function() {
    scope.submit();
    expect(coinomiaService.resetPassword).toHaveBeenCalledWith(scope.resetData);
  });

});
