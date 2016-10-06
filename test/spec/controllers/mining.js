'use strict';

describe('Controller: MiningCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var MiningCtrl,
      $q,
      spy,
      coinomiaService,
      defer,
      config,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _coinomiaService_, _$log_, _$q_, _config_) {
    $q = _$q_;
    coinomiaService = _coinomiaService_;
    config = _config_;

    scope = $rootScope.$new();
    defer = $q.defer();

    spyOn(coinomiaService, 'getProducts').and.returnValue(defer.promise);

    MiningCtrl = $controller('MiningCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should be defined constant value', function() {
    expect(scope.productMaxUnit).toEqual(config.productMaxUnit);
  })

  it('should be defined and call getProducts', function () {
    expect(coinomiaService.getProducts).toHaveBeenCalled();
  });
});
