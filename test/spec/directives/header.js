'use strict';

describe('Directive: header', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $compile, $templateCache) {
    scope = $rootScope.$new();
    compile = $compile;

    $templateCache.put('views/common/header.html',
    '<div class="navbar-header">' +
      '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">'+
        '<i class="fa fa-align-justify top-menu-icon" aria-hidden="true"></i>'+
      '</button>'+
    '</div>');

    scope.template = {
     url: 'views/common/header.html'
    };
    element = compile(angular.element('<main-header></main-header>'));

  }));

  // it('should make hidden element visible', inject(function ($compile) {
  //   element = angular.element('<header></header>');
  //   element = $compile(element)(scope);
  //   expect(element.text()).toBe('this is the header directive');
  // }));
});
