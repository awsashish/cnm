'use strict';

describe('Directive: navigation', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<navigation></navigation>');
    element = $compile(element)(scope);
    expect(element.text()).toBeDefined();
  }));
});
