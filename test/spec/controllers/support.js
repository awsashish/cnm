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
      $scope: scope,
      $localStorage: localStorage
      // place here mocked dependencies
    });

  }));

  it('should redirect to Os Ticket panel', function() {
    scope.osLogin();
  });

  it('should logged in to Os Ticket', function() {
    localStorage.token = 'some-token';
    scope.token = localStorage.token;
    scope.osLogin();
  });
});
