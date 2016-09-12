'use strict';

describe('Service: UtilsService', function () {

  // load the service's module
  beforeEach(module('coinomiaFrontendApp'));

  // instantiate service
  var UtilsService;
  var $httpBackend;
  var $log;

  beforeEach(inject(function(_UtilsService_, _$httpBackend_, _$log_) {
    UtilsService = _UtilsService_;
    $httpBackend = _$httpBackend_;
    $log = _$log_;
  }));

  // Get User Country Flag
  describe('user country flag function', function() {
    it('should exist', function() {
      expect(UtilsService.getCountryFlag).not.toEqual(null);
    });

    it('should returns records succesfully', function() {
      $httpBackend
      .expect('GET', 'js/countries.json')
      .respond(200, [{'name':'country-name', 'code':'country-code'}]);
      var data;
      UtilsService.getCountryFlag().then(function(fetchedData) {
        data = fetchedData;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data[0].name).toEqual('country-name');
      expect(data[0].code).toEqual('country-code');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', 'js/countries.json')
      .respond(500, 'Internal Server Error.');
      UtilsService.getCountryFlag();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

});
