'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var SettingCtrl,
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

    spyOn(coinomiaService, 'getUserInfo').and.returnValue(coinomiaServiceDeferred.promise);
    SettingCtrl = $controller('SettingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should be defined and call getUserInfo', function () {
    scope.getUserProfile();
    expect(coinomiaService.getUserInfo).toHaveBeenCalled();
  });
});
