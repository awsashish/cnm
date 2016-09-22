'use strict';

describe('Controller: ForgotpasswordCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var ForgotpasswordCtrl,
      $q,
      scope

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _$log_, _$q_) {
    $q = _$q_;

    scope = $rootScope.$new();

    ForgotpasswordCtrl = $controller('ForgotpasswordCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should check email errors', function () {
    expect(scope.emailError).toEqual(false);
  });

  it('should call submit function', function() {
    scope.submit();
  });
});
