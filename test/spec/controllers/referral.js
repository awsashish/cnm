'use strict';

describe('Controller: ReferralCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var ReferralCtrl,
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

    spyOn(coinomiaService, 'getLandingPages').and.returnValue(coinomiaServiceDeferred.promise);
    ReferralCtrl = $controller('ReferralCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should be defined and call getLandingPages', function () {
    expect(coinomiaService.getLandingPages).toHaveBeenCalled();
  });
});
