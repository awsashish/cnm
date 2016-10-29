'use strict';

describe('Controller: WalletCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var WalletCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WalletCtrl = $controller('WalletCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WalletCtrl.awesomeThings.length).toBe(3);
  });
});
