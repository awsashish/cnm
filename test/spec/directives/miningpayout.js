'use strict';

describe('Directive: miningPayout', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));
  beforeEach(module('views/directiveTemplates/miningPayouts.html'));

  var element,
    controller,
    ctrl,
    dscope,
    scope;

  beforeEach(inject(function ($rootScope, $compile, _$controller_) {
    scope = $rootScope.$new();
    element = angular.element("<div mining-payout tree-details='{object}'" +
                                                    " pool-details='{object}' "+
                                                    " contributor-details='{object}'" +
                                                    " rack-details='{object}'" +
                                                    " current-mining='{object}'" +
                                                    " pool-contract='some-value'" +
                                                    " btc-pool-contract='some-value'" +
                                                    " eth-pool-contract='some-value'" +
                                                    " contributor-contract='some-value'" +
                                                    " btc-contributor-contract='some-value'" +
                                                    " eth-contributor-contract='some-value'" +
                                                    " rack-contract='some-value'" +
                                                    " btc-rack-contract='some-value'" +
                                                    " eth-rack-contract='some-value'" +
                                                    " btc-pool-price='some-value'" +
                                                    " btc-contributor-price='some-value'" +
                                                    " btc-rack-price='some-value'"+
                                                    " eth-pool-price='some-value'" +
                                                    " eth-contributor-price='some-value'" +
                                                    " eth-rack-price='some-value'"+
                                                    " btc-pool-calc='some-function'"+
                                                    " eth-pool-calc='some-function'"+
                                                    " btc-contributor-calc='some-function'" +
                                                    " eth-contributor-calc='some-function'" +
                                                    " btc-rack-calc='some-function'"+
                                                    " eth-rack-calc='some-function'></div>");
    $compile(element)(scope);
    scope.$digest();
    dscope = element.isolateScope();
  }));

  it('Should load template', function () {
     expect(element.find('.table th').html()).toContain('Choose Mining <br>Contracts');  //Test if element has loaded template properly
  });

  it('should have the scope values', function() {
    expect(scope).toBeDefined();
    expect(dscope.poolDetails).toEqual(jasmine.any(Object));
    expect(dscope.contributorDetails).toEqual(jasmine.any(Object));
    expect(dscope.rackDetails).toEqual(jasmine.any(Object));
    expect(dscope.currentMining).toEqual(jasmine.any(Object));
    expect(dscope.btcPoolContract).toBeDefined();
    expect(dscope.btcContributorContract).toBeDefined();
    expect(dscope.btcRackContract).toBeDefined();
    expect(dscope.ethPoolContract).toBeDefined();
    expect(dscope.ethContributorContract).toBeDefined();
    expect(dscope.ethRackContract).toBeDefined();
    expect(dscope.btcPoolPrice).toBeDefined();
    expect(dscope.btcContributorPrice).toBeDefined();
    expect(dscope.btcRackPrice).toBeDefined();
    expect(dscope.ethPoolPrice).toBeDefined();
    expect(dscope.ethContributorPrice).toBeDefined();
    expect(dscope.ethRackPrice).toBeDefined();
    expect(dscope.btcPoolCalc).toBeDefined();
    expect(dscope.btcContributorCalc).toBeDefined();
    expect(dscope.btcRackCalc).toBeDefined();
    expect(dscope.ethPoolCalc).toBeDefined();
    expect(dscope.ethContributorCalc).toBeDefined();
    expect(dscope.ethRackCalc).toBeDefined();
  });
});
