'use strict';

describe('Controller: PromotecoinomiaCtrl', function () {

  // load the controller's module
  beforeEach(module('coinomiaFrontendApp'));

  var PromotecoinomiaCtrl,
      $q,
      spy,
      coinomiaService,
      UtilsService,
      deffered,
      rootScope,
      scope;

  var bannerIndex = 1;

  // scope.banners = {
  //   bannerhight:"125",
  //   bannerid:"319e538d-4aea-48c9-a20e-73b4416c6f05",
  //   bannerimage:"~/Upload/Banner/319e538d-4aea-48c9-a20e-73b4416c6f05.png",
  //   bannername:"No hidden Costs",
  //   bannerwidth:"125",
  //   showCode:true
  // }
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _coinomiaService_, _$log_, _$q_) {
    $q = _$q_;
    coinomiaService = _coinomiaService_;
    rootScope = $rootScope;

    scope = $rootScope.$new();
    deffered = $q.defer();

    spyOn(coinomiaService, 'getBanners').and.returnValue(deffered.promise);
    PromotecoinomiaCtrl = $controller('PromotecoinomiaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should define scope', function () {
    expect(scope.activeTab).toEqual('grab-concept');
  });

  // it('should define and call getBannerCode function', function () {
  //   scope.getBannerCode(bannerIndex);
  // });

  it('should define and call getBanners service', function () {
    expect(coinomiaService.getBanners).toHaveBeenCalled();
  });



});
