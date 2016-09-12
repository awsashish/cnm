'use strict';

describe('Directive: countryFlag', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));
  beforeEach(module('views/directiveTemplates/countryFlag.html'));

  var element,
    controller,
    rootScope,
    ctrl,
    dscope,
    scope;

  beforeEach(inject(function ($rootScope, $compile, _$controller_) {
    scope = $rootScope.$new();
    element = angular.element("<country-flag country-name='country' />");
    $compile(element)(scope);
    scope.$digest();

    dscope = {
      countryName: 'some-country-name'
    }
  }));

  it('Should load template', function () {
     expect(element.attr('country-name')).toEqual('country');
     expect(element.find('img').length).toEqual(1);  //Test if element has loaded template properly
  });

  it('should have the scope values', function() {
    expect(scope).toBeDefined();
    expect(dscope.countryName).toEqual('some-country-name');
  });
});
