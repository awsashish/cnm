'use strict';

describe('Directive: newsFeeds', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));

  beforeEach(module('views/directiveTemplates/newsFeeds.html'));

  var element,
    controller,
    ctrl,
    scope;

  beforeEach(inject(function ($rootScope, $compile, _$controller_) {
    scope = $rootScope.$new();
    element = angular.element("<news-feeds></news-feeds>");
    $compile(element)(scope);
    // ctrl = _$controller_('NavCtrl', {$scope: scope});
    scope.$digest();
  }));

  it('Should load template', function () {
     expect(element.find('.news-feeds').length).toEqual(1);  //Test if element has loaded template properly
  });
});
