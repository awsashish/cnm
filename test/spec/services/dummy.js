'use strict';

describe('Service: Dummy', function () {

  // load the service's module
  beforeEach(module('coinomiaFrontendApp'));

  // instantiate service
  var Dummy;
  beforeEach(inject(function (_Dummy_) {
    Dummy = _Dummy_;
  }));

  it('should do something', function () {
    expect(!!Dummy).toBe(true);
  });

});
