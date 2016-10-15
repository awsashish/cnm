'use strict';

describe('Controller: NetworksCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var NetworksCtrl,
      $q,
      spy,
      excelData,
      page,
      sponsorId,
      coinomiaService,
      UtilsService,
      config,
      deferred,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _coinomiaService_, _UtilsService_, _config_, _$log_, _$q_) {
    $q = _$q_;
    coinomiaService = _coinomiaService_;
    UtilsService = _UtilsService_;
    config = _config_;

    excelData = ['John Doe', 'john@gmail.com', 'coinomia', 'coinomia', 9898765647, 'USA'];
    page: 3;
    sponsorId: 'coinomia';

    scope = $rootScope.$new();
    deferred = $q.defer();

    spyOn(coinomiaService, 'getAllReferral').and.returnValue(deferred.promise);
    spyOn(coinomiaService, 'getUserDirects').and.returnValue(deferred.promise);
    spyOn(coinomiaService, 'getUserDownline').and.returnValue(deferred.promise);
    spyOn(coinomiaService, 'getDirectLeaderboard').and.returnValue(deferred.promise);

    NetworksCtrl = $controller('NetworksCtrl', {
      $scope: scope
      // place here mocked dependencies
    });

    scope.sponsorId = 'coinomia';
  }));

  it('should define the scope values', function() {
    expect(scope.currentPage).toEqual(config.currentPage);
    expect(scope.pagination.totalDirects).toEqual(0);
    expect(scope.pagination.totalTeam).toEqual(0);
    expect(scope.pagination.perpage).toEqual(config.pageLimit);
    expect(scope.teamColumnHead).toEqual(config.teamColumnHead);
    expect(scope.order).toEqual(config.columnOrder);
  });

  it('should get direct users of logged in user', function() {
    scope.userDirects(scope.currentPage);
    expect(coinomiaService.getUserDirects).toHaveBeenCalledWith(scope.currentPage);
  });

  it('should export data to excel sheet', function() {
    scope.getExcelData(excelData);
    expect(scope.exportData[0].name).toEqual('sheet1');
    expect(scope.exportData[0].data).toEqual(excelData);
    expect(scope.exportExcel).toEqual(jasmine.any(Object));
  });


  it('should get all referral', function() {
    scope.allReferral(page);
    expect(coinomiaService.getAllReferral).toHaveBeenCalledWith(page);
  });

  it('should get user downline', function() {
    scope.userDownline(scope.sponsorId);
    expect(scope.loadingData).toBe(true);
    expect(coinomiaService.getUserDownline).toHaveBeenCalledWith(scope.sponsorId);
  })

  it('should get leaderboard', function() {
    scope.getLeaderBoard();
    expect(coinomiaService.getDirectLeaderboard).toHaveBeenCalledWith();
  });

  it('should search user downline', function() {
    scope.searchDownline(scope.sponsorId);
    expect(scope.searchError).toBe(false);
    scope.userDownline(scope.sponsorId);
  });
});
