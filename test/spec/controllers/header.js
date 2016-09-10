'use strict';

describe('Controller: HeaderCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var HeaderCtrl,
      $q,
      spy,
      coinomiaService,
      UtilsService,
      deffered,
      rootScope,
      scope;

  var refreshTokenParams = {
    'grant_type': 'refresh_token',
    'refresh_token': undefined
  }
  var countryName = 'some-country';

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _coinomiaService_, _UtilsService_, _$log_, _$q_) {
    $q = _$q_;
    coinomiaService = _coinomiaService_;
    UtilsService = _UtilsService_;
    rootScope = $rootScope;

    scope = $rootScope.$new();
    deffered = $q.defer();

    spyOn(coinomiaService, 'getUserInfo').and.returnValue(deffered.promise);
    spyOn(rootScope, '$on').and.callThrough();
    spyOn(rootScope, '$broadcast');
    spyOn(coinomiaService, 'getRefreshToken').and.returnValue(deffered.promise);
    spyOn(UtilsService, 'getCountryFlag').and.returnValue(deffered.promise);
    // spyOn(coinomiaService, 'changePassword').and.returnValue(coinomiaServiceDeferred.promise);
    HeaderCtrl = $controller('HeaderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should expect to rootScope value', function() {
    expect(scope.tokenRequestProgress).toEqual(false);
  });

  it('should be defined and call getUserDetails', function () {
    scope.getUserDetails();
    expect(coinomiaService.getUserInfo).toHaveBeenCalled();
  });

  it('should be defined and call getCountryFlag service', function () {
    scope.getFlag(countryName);
    expect(UtilsService.getCountryFlag).toHaveBeenCalledWith(countryName);
  });

  it('should be define and call getRefreshToken service', function() {
    expect(rootScope.$on).toHaveBeenCalled();
    expect(rootScope.$on).toHaveBeenCalledWith('getRefreshToken', jasmine.any(Function));
  });
});
