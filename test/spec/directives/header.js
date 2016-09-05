'use strict';

describe('Directive: header', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $compile, $templateCache) {
    scope = $rootScope.$new();

    $templateCache.put('views/common/header.html',
    '<div class="navbar-header">' +
      '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">'+
        '<i class="fa fa-align-justify top-menu-icon" aria-hidden="true"></i>'+
      '</button>'+
    '</div>');

    element = angular.element("<main-header></main-header>");
    $compile(element)(scope);
    scope.$digest();

  }));

  it('Should load template', function () {
     expect(element.find('.navbar-header').length).toEqual(1); //Test if element has loaded template properly
     expect(element.find('.top-menu-icon').attr('aria-hidden')).toEqual("true");
  });
});
