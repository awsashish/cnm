'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var DashboardCtrl,
      $q,
      spy,
      coinomiaService,
      coinomiaServiceDeferred,
      config,
      scope;

  var tree = {
    TotalDirect: 5,
    VirtualPairs: 20
  }

  var currentMining = {
    'btcMining':0.0675,
    'ethMining':0.0875,
    'btcUsd':10,
    'ethUsd':10
  };

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
  beforeEach(inject(function ($controller, $rootScope, _$state_, _coinomiaService_, _$log_, _$q_, _config_) {
    $q = _$q_;
    coinomiaService = _coinomiaService_;
    config = _config_;

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

  it('should be defined constant value', function() {
    expect(scope.poolContract).toEqual(config.poolValue);
    expect(scope.contributorContract).toEqual(config.contributorValue);
    expect(scope.rackContract).toEqual(config.rackValue);
    expect(scope.btcPoolContract).toEqual(config.poolValue);
    expect(scope.btcContributorContract).toEqual(config.contributorValue);
    expect(scope.btcRackContract).toEqual(config.rackValue);
    expect(scope.ethPoolContract).toEqual(config.poolValue);
    expect(scope.ethContributorContract).toEqual(config.contributorValue);
    expect(scope.ethRackContract).toEqual(config.rackValue);
  })

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

  it('should be defined and calculate BTC pool mining, contributor mining, rack mining', function () {
    scope.btcPoolMining(poolContract, poolDetails, currentMining);
    expect(scope.totalBtcPool).toBeDefined();
    scope.btcContributorMining(contributorContract, contributorDetails, currentMining);
    expect(scope.totalBtcContributor).toBeDefined();
    scope.btcRackMining(rackContract, rackDetails, currentMining);
    expect(scope.totalBtcRack).toBeDefined();
    scope.totalBtc();
  });

  it('should be defined and calculate Eth pool mining, contributor mining, rack mining', function () {
    scope.ethPoolMining(poolContract, poolDetails, currentMining);
    expect(scope.totalEthPool).toBeDefined();
    scope.ethContributorMining(contributorContract, contributorDetails, currentMining);
    expect(scope.totalEthContributor).toBeDefined();
    scope.ethRackMining(rackContract, rackDetails, currentMining);
    expect(scope.totalEthRack).toBeDefined();
    scope.totalEth();
  });

  it('should be defined and calculate total BTC value and BTC USD', function() {
    scope.totalBtc();
    expect(scope.finalBtc).toBeDefined();
    expect(scope.finalBtcUsd).toBeDefined();
  });

  it('should be defined and calculate total ETH value and ETH USD', function() {
    scope.totalEth();
    expect(scope.finalEth).toBeDefined();
    expect(scope.finalEthUsd).toBeDefined();
  });

  it('should be defined and calculate total estimated income', function() {
    scope.miningCalculate(scope.finalBtc, scope.finalBtcUsd, scope.finalEth, scope.finalEthUsd);
    expect(scope.estIncome).toEqual(jasmine.any(Object));
  });
});
