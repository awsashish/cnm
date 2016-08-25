'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var LoginCtrl,
      $q,
      scope,
      spy,
      coinomiaService,
      coinomiaServiceDeferred,
      loginData;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _coinomiaService_, _$log_, _$q_) {
    $q = _$q_;
    coinomiaService = _coinomiaService_;

    scope = $rootScope.$new();
    coinomiaServiceDeferred = $q.defer();

    spyOn(coinomiaService, 'login').and.returnValue(coinomiaServiceDeferred.promise);

    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
      // place here mocked dependencies
    });

    scope.login = {};

    scope.username = 'coinomia';
    scope.password = 'coinomia';
    scope.grant_type = 'password';

    loginData = {
      username: scope.username,
      password: scope.password,
      grant_type: scope.grant_type,
    }
  }));

  it('should start with username and password populated', function () {
    expect(scope.username).toEqual('coinomia');
    expect(scope.password).toEqual('coinomia');
    expect(scope.grant_type).toEqual('password');
  });

  it('should be defined and call Auth, Login services', function() {
    scope.login.$valid = true;
    scope.submit();
    expect(coinomiaService.login).toHaveBeenCalledWith(loginData);
  });
});
