'use strict';

describe('Directive: walletInfo', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));
  beforeEach(module('views/directiveTemplates/walletInfo.html'));

  var element,
    controller,
    rootScope,
    ctrl,
    dscope,
    config,
    scope;

  beforeEach(angular.mock.inject(function ($rootScope, $compile, _$controller_, _config_) {
    config = _config_;
    scope = $rootScope.$new();
    element = angular.element('<wallet-info wallet-data="walletData" wallet-type="BTC" success-message="successMessage" error-message="errorMessage" wallet-heading="walletHeading" type="withdrawal"></wallet-info>');
    $compile(element)(scope);
    scope.$digest();
    dscope = element.isolateScope();
  }));

  it('should have the scope values', function() {
    expect(scope).toBeDefined();
    expect(dscope.walletType).toBeDefined();
    expect(dscope.type).toBeDefined();
  });
});
