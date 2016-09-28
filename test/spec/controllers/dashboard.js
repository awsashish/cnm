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
    spyOn(coinomiaService, 'getTeamCalendar').and.returnValue(coinomiaServiceDeferred.promise);
    spyOn(coinomiaService, 'getCoinomiaTeamCalendar').and.returnValue(coinomiaServiceDeferred.promise);
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should be defined constant value', function() {
    expect(scope.poolContract).toEqual(config.poolSelectedValue);
    expect(scope.contributorContract).toEqual(config.machineSelectedValue);
    expect(scope.rackContract).toEqual(config.rackSelectedValue);
    expect(scope.btcPoolContract).toEqual(config.poolSelectedValue);
    expect(scope.btcContributorContract).toEqual(config.machineSelectedValue);
    expect(scope.btcRackContract).toEqual(config.rackSelectedValue);
    expect(scope.ethPoolContract).toBeDefined();
    expect(scope.ethContributorContract).toBeDefined();
    expect(scope.ethRackContract).toBeDefined();
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

  it('should be defined and call getTeamCalendar', function () {
    expect(coinomiaService.getTeamCalendar).toHaveBeenCalled();
  });

  it('should be defined and call getCoinomiaTeamCalendar', function () {
    expect(coinomiaService.getCoinomiaTeamCalendar).toHaveBeenCalled();
  });

  it('should be defined and calculate pool commission and binary pool commission', function () {
    scope.poolCalc(tree, poolContract, poolDetails);
    scope.paycheck();
  });

  it('should be defined and calculate binary pool commission', function () {
    scope.binaryPoolCalc(tree, poolContract, poolDetails);
    scope.paycheck();
  });

  it('should be defined and calculate contributor commission and binary contributor commission', function () {
    scope.contributorCalc(tree, contributorContract, contributorDetails);
    scope.paycheck();
  });

  it('should be defined and calculate binary contributor commission', function () {
    scope.binaryContributorCalc(tree, contributorContract, contributorDetails);
    scope.paycheck();
  });

  it('should be defined and calculate rack commission and binary rack commission', function () {
    scope.rackCalc(tree, rackContract, rackDetails);
    scope.paycheck();
  });

  it('should be defined and calculate binary rack commission', function () {
    scope.binaryRackCalc(tree, rackContract, rackDetails);
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

  it('should be switch to particular currency(BTC or ETH) on click', function() {
    // Pool Mining Switch
    expect(scope.btcPoolContract).toEqual(config.poolSelectedValue);
    scope.btcPoolClick(poolContract, poolDetails, currentMining);
    scope.ethPoolClick(poolContract, poolDetails, currentMining);
    expect(scope.ethPoolContract).toEqual(config.poolSelectedValue);
    scope.ethPoolMining(poolContract, poolDetails, currentMining);
    scope.btcPoolMining(poolContract, poolDetails, currentMining);



    // Machine Mining Switch
    expect(scope.btcContributorContract).toEqual(config.machineSelectedValue);
    scope.btcMachineClick(contributorContract, poolDetails, currentMining);
    scope.ethMachineClick(contributorContract, poolDetails, currentMining);
    expect(scope.ethContributorContract).toEqual(config.machineSelectedValue);
    scope.ethContributorMining(contributorContract, poolDetails, currentMining);
    scope.btcContributorMining(contributorContract, poolDetails, currentMining);

    // Ether Mining Switch
    expect(scope.btcRackContract).toEqual(config.rackSelectedValue);
    scope.btcRackClick(rackContract, contributorDetails, currentMining);
    scope.ethRackClick(rackContract, contributorDetails, currentMining);
    expect(scope.ethRackContract).toEqual(config.rackSelectedValue);
    scope.ethRackMining(rackContract, rackDetails, currentMining);
    scope.btcRackMining(rackContract, rackDetails, currentMining);
  })

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
