'use strict';

describe('Controller: ResendverificationemailCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var ResendverificationemailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResendverificationemailCtrl = $controller('ResendverificationemailCtrl', {
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
