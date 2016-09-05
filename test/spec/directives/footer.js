'use strict';

describe('Directive: footer', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));
  beforeEach(module('views/common/footer.html'))
  var element,
    scope;

  beforeEach(inject(function ($rootScope, $compile, $templateCache) {
    scope = $rootScope.$new();
    element = angular.element("<main-footer></main-footer>");
    $compile(element)(scope);
    scope.$digest();

  }));

  it('Should load template', function () {
     expect(element.find('.container').length).toEqual(1); //Test if element has loaded template properly
     expect(element.find('.pull-right').text()).toEqual("copyright all right reserved 2016");
  });
});
