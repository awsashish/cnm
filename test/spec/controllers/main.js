'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var MainCtrl,
    $q,
    scope,
    spy,
    coinomiaService,
    coinomiaServiceDeferred

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _coinomiaService_, _$q_) {
    $q = _$q_;
    coinomiaService = _coinomiaService_;

    scope = $rootScope.$new();
    coinomiaServiceDeferred = $q.defer();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  // it('should be defined and call Auth service', function() {
  //   expect(coinomiaService.Auth).toHaveBeenCalled();
  // });
});
