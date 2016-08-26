'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var DashboardCtrl,
      $q,
      spy,
      coinomiaService,
      coinomiaServiceDeferred,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _coinomiaService_, _$log_, _$q_) {
    $q = _$q_;
    coinomiaService = _coinomiaService_;

    scope = $rootScope.$new();
    coinomiaServiceDeferred = $q.defer();

    spyOn(coinomiaService, 'getPurchasePower').and.returnValue(coinomiaServiceDeferred.promise);
    spyOn(coinomiaService, 'currentMining').and.returnValue(coinomiaServiceDeferred.promise);
    spyOn(coinomiaService, 'getTotalIncome').and.returnValue(coinomiaServiceDeferred.promise);
    spyOn(coinomiaService, 'getProducts').and.returnValue(coinomiaServiceDeferred.promise);
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should be defined and call getPurchasePower, currentMining, getTotalIncome, getProducts', function () {
    expect(coinomiaService.getPurchasePower).toHaveBeenCalled();
    expect(coinomiaService.currentMining).toHaveBeenCalled();
    expect(coinomiaService.getTotalIncome).toHaveBeenCalled();
    expect(coinomiaService.getProducts).toHaveBeenCalled();
  });
});
