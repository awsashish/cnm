'use strict';

describe('Directive: navigation', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp',function($controllerProvider) {
    $controllerProvider.register('NavCtrl', function($scope) {
        // Controller Mock
    });
  }));

  beforeEach(module('views/common/navigation.html'));

  var element,
    controller,
    ctrl,
    scope;

  beforeEach(inject(function ($rootScope, $compile, _$controller_) {
    scope = $rootScope.$new();
    element = angular.element("<navigation></navigation>");
    $compile(element)(scope);
    // ctrl = _$controller_('NavCtrl', {$scope: scope});
    scope.$digest();
  }));

  it('Should load template', function () {
     expect(element.find('.leftpanel').length).toEqual(1);  //Test if element has loaded template properly
     expect(element.find('.logout').attr('ng-click')).toEqual('logout()');
  });
});
