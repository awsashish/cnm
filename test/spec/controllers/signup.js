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

    spyOn(coinomiaService, 'isAuthenticated').and.returnValue(coinomiaServiceDeferred.promise);
    spyOn(coinomiaService, 'getUserLocation').and.returnValue(coinomiaServiceDeferred.promise);
    spyOn(coinomiaService, 'signup').and.returnValue(coinomiaServiceDeferred.promise);

    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope
      // place here mocked dependencies
    });

    scope.user = {
      'name': 'Some Name',
      'NewPassword': '123456a',
      'ConfirmPassword': '123456a'
    };

    scope.name = scope.user.name.split(" ");

    signUpData = {
      'sponsor':scope.user.sponsor,
      'userid':scope.user.userid,
      'FirstName':scope.name[0],
      'LastName':scope.name[1],
      'Country':scope.user.country,
      'Email':scope.user.email,
      'IPAdr':scope.user.ipadr,
      'Password':scope.user.password,
      'ConfirmPassword':scope.user.confirmPassword,
      'Leg':''
    }
  }));

  it('should Authenticate User', function() {
    expect(coinomiaService.isAuthenticated).toHaveBeenCalled();
  });

  it('should be defined and call getUserLocation service', function() {
    expect(coinomiaService.getUserLocation).toHaveBeenCalled();
  });

  it('should be define and check password mismatch', function() {
    scope.confirmPass(scope.user);
    scope.next();
  });

  it('should be defined and call signup service', function() {
    scope.terms = true;
    scope.submit();
    expect(scope.user.name).toBeDefined();
    expect(scope.error).toEqual(false);
    expect(coinomiaService.signup).toHaveBeenCalledWith(signUpData);
  });
});
