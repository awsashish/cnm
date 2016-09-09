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

  var tree = {
    TotalDirect: 5,
    VirtualPairs: 20
  }

  var poolContract = 10;
  var contributorContract = 10;
  var rackContract = 10;
  var poolDetails = {
    Price: 100,
    PV: 2
  }

  var contributorDetails = {
    Price: 100,
    PV: 2
  }

  var rackDetails = {
    Price: 100,
    PV: 2
  }

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _coinomiaService_, _$log_, _$q_) {
    $q = _$q_;
    coinomiaService = _coinomiaService_;

    scope = $rootScope.$new();
    coinomiaServiceDeferred = $q.defer();
    coinomiaServiceDeferred.resolve('resolveData');
    spyOn(coinomiaService, 'getPurchasePower').and.returnValue(coinomiaServiceDeferred.promise);
    spyOn(coinomiaService, 'currentMining').and.returnValue(coinomiaServiceDeferred.promise);
    spyOn(coinomiaService, 'getTotalIncome').and.returnValue(coinomiaServiceDeferred.promise);
    spyOn(coinomiaService, 'getProducts').and.returnValue(coinomiaServiceDeferred.promise);
    spyOn(coinomiaService, 'getPackages').and.returnValue(coinomiaServiceDeferred.promise);
    spyOn(coinomiaService, 'getVirtualTree').and.returnValue(coinomiaServiceDeferred.promise);
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should be defined and call getPurchasePower', function () {
    expect(coinomiaService.getPurchasePower).toHaveBeenCalled();
  });

  it('should be defined and call currentMining', function () {
    expect(coinomiaService.currentMining).toHaveBeenCalled();
  });

  it('should be defined and call getTotalIncome', function () {
    expect(coinomiaService.getTotalIncome).toHaveBeenCalled();
  });

  it('should be defined and call getProducts', function () {
    expect(coinomiaService.getProducts).toHaveBeenCalled();
  });

  it('should be defined and call getVirtualTree, getPackages', function () {
    expect(coinomiaService.getVirtualTree).toHaveBeenCalled();
    scope.userPackages();
    expect(coinomiaService.getPackages).toHaveBeenCalled();
  });

  it('should be defined and calculate pool commission and binary pool commission', function () {
    scope.poolCalc(tree, poolContract, poolDetails);
    scope.paycheck();
  });

  it('should be defined and calculate contributor commission and binary contributor commission', function () {
    scope.contributorCalc(tree, contributorContract, contributorDetails);
    scope.paycheck();
  });

  it('should be defined and calculate rack commission and binary rack commission', function () {
    scope.rackCalc(tree, rackContract, rackDetails);
    scope.paycheck();
  });
});
