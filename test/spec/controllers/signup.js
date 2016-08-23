'use strict';

describe('Controller: SignupCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var SignupCtrl,
      $q,
      scope,
      $state,
      $log,
      spy,
      coinomiaService,
      coinomiaServiceDeferred,
      signUpData;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _coinomiaService_, _$log_, _$q_) {
    $state = _$state_;
    $log = _$log_;
    $q = _$q_
    coinomiaService = _coinomiaService_;

    scope = $rootScope.$new();
    coinomiaServiceDeferred = $q.defer();

    spyOn(coinomiaService, 'getUserLocation').and.returnValue(coinomiaServiceDeferred.promise);
    spyOn(coinomiaService, 'signup').and.returnValue(coinomiaServiceDeferred.promise);

    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope
      // place here mocked dependencies
    });

    signUpData = {
      'sponsor':scope.sponsor,
      'userid':scope.userid,
      'FirstName':scope.FirstName,
      'LastName':scope.LastName,
      'Address':scope.Address,
      'Country':scope.Country,
      'State':scope.State,
      'City':scope.City,
      'Pincode':scope.Pincode,
      'Mobile':scope.Mobile,
      'Email':scope.Email,
      'IPAdr':scope.IPAdr,
      'Password':scope.Password,
      'ConfirmPassword':scope.ConfirmPassword
    }
  }));

  it('should be defined and call getUserLocation service', function() {
    expect(coinomiaService.getUserLocation).toHaveBeenCalled();
  });

  it('should be defined and call signup service', function() {
    scope.submit();
    expect(coinomiaService.signup).toHaveBeenCalledWith(signUpData);
  });

});
