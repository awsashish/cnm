'use strict';

describe('Directive: purchaseTotal', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));
  beforeEach(module('views/purchaseTotal.html'));

  var element,
    controller,
    ctrl,
    dscope,
    scope;

  beforeEach(inject(function ($rootScope, $compile, _$controller_) {
    scope = $rootScope.$new();
    element = angular.element("<div purchase-total purchased-attr='{object}' purchased-params='{object}' total-attr='{object}' total-params='{object}'></div>");
    $compile(element)(scope);
    scope.$digest();
    dscope = element.isolateScope();
  }));

  it('Should load template', function () {
     expect(element.find('.f-block-transparent-bg').length).toEqual(1);  //Test if element has loaded template properly
  });

  it('should have the scope values', function() {
    expect(scope).toBeDefined();
    expect(dscope.purchasedAttr).toEqual(jasmine.any(Object));
    expect(dscope.purchasedParams).toEqual(jasmine.any(Object));
    expect(dscope.totalAttr).toEqual(jasmine.any(Object));
    expect(dscope.totalParams).toEqual(jasmine.any(Object));
  });
});
