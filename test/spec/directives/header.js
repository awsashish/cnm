'use strict';

describe('Directive: header', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));
  beforeEach(module('views/common/header.html'))

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $compile, $templateCache) {
    scope = $rootScope.$new();

    element = angular.element("<main-header></main-header>");
    $compile(element)(scope);
    scope.$digest();

  }));

  it('Should load template', function () {
     expect(element.find('.navbar-header').length).toEqual(1); //Test if element has loaded template properly
     expect(element.find('.top-menu-icon').attr('aria-hidden')).toEqual("true");
  });
});
