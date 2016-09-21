'use strict';

describe('Directive: comingSoon', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));
  beforeEach(module('views/directiveTemplates/comingSoon.html'));

  var element,
    controller,
    rootScope,
    ctrl,
    dscope,
    scope;

  beforeEach(inject(function ($rootScope, $compile, _$controller_) {
    scope = $rootScope.$new();
    element = angular.element("<coming-soon text-value='some-text' text-attr='some-object' />");
    $compile(element)(scope);
    scope.$digest();
    dscope = element.isolateScope();
  }));

  it('Should load template', function () {
     expect(element.find('.coming-soon-wrapper h4').html()).toContain('would be coming soon');
  });

  it('should have the scope values', function() {
    expect(scope).toBeDefined();
    expect(dscope.textValue).toBeDefined();
    expect(dscope.textAttr).toBeDefined();
  });
});
