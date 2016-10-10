'use strict';

describe('Controller: TotalsignupCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var TotalsignupCtrl,
      $q,
      spy,
      coinomiaService,
      UtilsService,
      deferred,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _coinomiaService_, _UtilsService_, _$log_, _$q_) {
    $q = _$q_;
    coinomiaService = _coinomiaService_;
    UtilsService = _UtilsService_;

    scope = $rootScope.$new();
    deferred = $q.defer();

    spyOn(UtilsService, 'getCountryCode').and.returnValue(deferred.promise);
    spyOn(coinomiaService, 'getLatestSignup').and.returnValue(deferred.promise);

    TotalsignupCtrl = $controller('TotalsignupCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should get all country codes', function() {
    expect(UtilsService.getCountryCode).toHaveBeenCalled();
  });

  it('should get total signups', function() {
    expect(coinomiaService.getLatestSignup).toHaveBeenCalled();
  });
});
