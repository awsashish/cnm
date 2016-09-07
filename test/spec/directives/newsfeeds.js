'use strict';

describe('Directive: newsFeeds', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<news-feeds></news-feeds>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the newsFeeds directive');
  }));
});
