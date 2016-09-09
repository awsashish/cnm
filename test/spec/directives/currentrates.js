'use strict';

describe('Directive: currentRates', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));

  beforeEach(module('views/directiveTemplates/currentRates.html'));

  var element,
    controller,
    ctrl,
    dscope,
    scope;

  beforeEach(inject(function ($rootScope, $compile, _$controller_) {
    scope = $rootScope.$new();
    element = angular.element("<div current-rates current-mining='{object}' mining-params='{object}'></div>");
    $compile(element)(scope);
    scope.$digest();
    dscope = element.isolateScope();
  }));

  it('Should load template', function () {
     expect(element.find('.s-block-transparent-bg').length).toEqual(1);  //Test if element has loaded template properly
  });

  it('should have the scope values', function() {
    expect(scope).toBeDefined();
    expect(dscope.currentMining).toEqual(jasmine.any(Object));
    expect(dscope.miningParams).toEqual(jasmine.any(Object));
  });
});
