'use strict';

describe('Directive: uiCalendar', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));
  beforeEach(module('views/directiveTemplates/calendar.html'));

  var element,
    controller,
    rootScope,
    ctrl,
    dscope,
    scope;

  beforeEach(angular.mock.inject(function ($rootScope, $compile, _$controller_) {
    scope = $rootScope.$new();
    element = angular.element("<ui-calendar data='some-object'></ui-calendar>");
    $compile(element)(scope);
  }));

  it('Should load template', function () {
     expect(element.attr('data')).toBeDefined();
  });

  it('should have the scope values', function() {
    expect(scope).toBeDefined();
  });
});
