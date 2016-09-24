'use strict';

describe('Controller: PromotecoinomiaCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var PromotecoinomiaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PromotecoinomiaCtrl = $controller('PromotecoinomiaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should define scope', function () {
    expect(scope.activeTab).toEqual('grab-concept');
  });
});
