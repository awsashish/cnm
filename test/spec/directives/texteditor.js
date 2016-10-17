'use strict';

describe('Directive: textEditor', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));

  var element,
    scope;

  beforeEach(angular.mock.inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = angular.element('<textarea text-editor id="txtEditor1" required="required" class="form-control"></textarea>');
    $compile(element)(scope);
  }));
});
