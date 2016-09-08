'use strict';

describe('Controller: NavCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var NavCtrl,
      rootScope,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    spyOn(rootScope, '$on').and.callThrough();

    NavCtrl = $controller('NavCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should be define and call Log out function', function() {
    scope.logout();
  });

  it('should be define and call logout function', function() {
    expect(rootScope.$on).toHaveBeenCalledWith('logout', jasmine.any(Function));
  });
});
