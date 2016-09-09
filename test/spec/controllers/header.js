'use strict';

describe('Controller: HeaderCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var HeaderCtrl,
      $q,
      spy,
      coinomiaService,
      coinomiaServiceDeferred,
      rootScope,
      scope;

  var refreshTokenParams = {
    'grant_type': 'refresh_token',
    'refresh_token': undefined
  }

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _coinomiaService_, _$log_, _$q_) {
    $q = _$q_;
    coinomiaService = _coinomiaService_;
    rootScope = $rootScope;

    scope = $rootScope.$new();
    coinomiaServiceDeferred = $q.defer();

    spyOn(coinomiaService, 'getUserInfo').and.returnValue(coinomiaServiceDeferred.promise);
    spyOn(rootScope, '$on').and.callThrough();
    spyOn(rootScope, '$broadcast');
    spyOn(coinomiaService, 'getRefreshToken').and.returnValue(coinomiaServiceDeferred.promise);
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

  it('should be define and call getRefreshToken service', function() {
    expect(rootScope.$on).toHaveBeenCalled();
    expect(rootScope.$on).toHaveBeenCalledWith('getRefreshToken', jasmine.any(Function));
  });
});
