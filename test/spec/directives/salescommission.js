'use strict';

describe('Directive: salesCommission', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));
  beforeEach(module('views/directiveTemplates/salesCommission.html'));

  var element,
    controller,
    ctrl,
    dscope,
    scope;

  beforeEach(inject(function ($rootScope, $compile, _$controller_) {
    scope = $rootScope.$new();
    element = angular.element("<div sales-commission tree-details='{object}'" +
                                                    " sales-Heading='some-value' "+
                                                    " sales-image-path='some-path' "+
                                                    " pool-details='{object}' "+
                                                    " contributor-details='{object}'" +
                                                    " rack-details='{object}'" +
                                                    " pool-contract='some-value'" +
                                                    " binary-pool-contract='some-value'" +
                                                    " contributor-contract='some-value'" +
                                                    " binary-contributor-contract='some-value'" +
                                                    " rack-contract='some-value'" +
                                                    " binary-rack-contract='some-value'" +
                                                    " pool-total='some-value'" +
                                                    " contributor-total='some-value'" +
                                                    " rack-total='some-value'"+
                                                    " binary-contributor-total='some-value'"+
                                                    " binary-pool-total='some-value'"+
                                                    " binary-rack-total='some-value'"+
                                                    " binary-details='some-value'"+
                                                    " pool-calc='some-function'"+
                                                    " contributor-calc='some-function'" +
                                                    " rack-calc='some-function'></div>");
    $compile(element)(scope);
    scope.$digest();
    dscope = element.isolateScope();
  }));

  it('should have the scope values', function() {
    expect(scope).toBeDefined();
    expect(dscope.treeDetails).toEqual(jasmine.any(Object));
    expect(dscope.poolDetails).toEqual(jasmine.any(Object));
    expect(dscope.contributorDetails).toEqual(jasmine.any(Object));
    expect(dscope.rackDetails).toEqual(jasmine.any(Object));
    expect(dscope.binaryDetails).toBeDefined();
    expect(dscope.salesHeading).toBeDefined();
    expect(dscope.salesImagePath).toBeDefined();
    expect(dscope.poolContract).toBeDefined();
    expect(dscope.poolContract).toBeDefined();
    expect(dscope.contributorContract).toBeDefined();
    expect(dscope.binaryContributorContract).toBeDefined();
    expect(dscope.rackContract).toBeDefined();
    expect(dscope.binaryRackContract).toBeDefined();
    expect(dscope.poolTotal).toBeDefined();
    expect(dscope.contributorTotal).toBeDefined();
    expect(dscope.rackTotal).toBeDefined();
    expect(dscope.binaryContributorTotal).toBeDefined();
    expect(dscope.binaryPoolTotal).toBeDefined();
    expect(dscope.binaryRackTotal).toBeDefined();
    expect(dscope.poolCalc).toBeDefined();
    expect(dscope.contributorCalc).toBeDefined();
    expect(dscope.rackCalc).toBeDefined();
  });
});
