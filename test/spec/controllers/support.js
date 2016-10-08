'use strict';

describe('Controller: SupportCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var SupportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SupportCtrl = $controller('SupportCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SupportCtrl.awesomeThings.length).toBe(3);
  });
});
