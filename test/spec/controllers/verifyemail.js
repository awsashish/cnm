'use strict';

describe('Controller: VerifyemailCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var VerifyemailCtrl,
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

    spyOn(coinomiaService, 'verifyEmail').and.returnValue(coinomiaServiceDeferred.promise);

    VerifyemailCtrl = $controller('VerifyemailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should be defined and call verifyEmail service', function() {
    expect(coinomiaService.verifyEmail).toHaveBeenCalledWith(scope.getToken);
  });
});
