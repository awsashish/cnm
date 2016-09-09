'use strict';

describe('Directive: uiSlider', function () {

  // load the directive's module
  beforeEach(module('coinomiaFrontendApp'));

  var element,
    scope;

    beforeEach(angular.mock.inject(function($compile,$rootScope){

      scope = $rootScope.$new();
      element = angular.element('<div ui-slider class="btcPool" model="btcMining" min="0.5" max="{{btc.maxunit}}" step="0.1"></div>');
      $compile(element)(scope);

  }))

  it("should be defined", function(){
    expect(element.attr('ui-slider')).toBeDefined();
  })

  it('has correct values', function() {
    expect(element.slider("option","step")).toEqual(0.1);
    expect(element.slider("option","min")).toEqual(0.5);
  });
})
