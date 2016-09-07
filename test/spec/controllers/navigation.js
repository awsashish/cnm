'use strict';

describe('Controller: NavCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var NavCtrl,
      scope;
      
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

    scope = $rootScope.$new();
    // spyOn(coinomiaService, 'changePassword').and.returnValue(coinomiaServiceDeferred.promise);
    NavCtrl = $controller('NavCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should be define and call Log out function', function() {
    scope.logout();
  });
});
