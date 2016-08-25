'use strict';

describe('Controller: BusinessplanCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var BusinessplanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BusinessplanCtrl = $controller('BusinessplanCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BusinessplanCtrl.awesomeThings.length).toBe(3);
  });
});
