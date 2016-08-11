'use strict';



describe('service coinomiaService', function() {
    // load the service's module
    beforeEach(module('coinomiaFrontendApp'));

    var coinomiaService;
    var $httpBackend;
    var $log;
    // Login Data
    var loginData = {
      "username":"coinomia",
      "password":"coinomia",
      "grant_type":"password"
    };

    // Sign Up Data
    var signupData =   {
      "sponsor":"sponsor-name",
      "userid":"user-id",
      "FirstName":"first-name",
      "LastName":"dfsd",
      "Address":"Address",
      "Country":"country-name",
      "State":"state-name",
      "City":"city-name",
      "Pincode":"302013",
      "Mobile":"9999999999",
      "Email":"somevalue@gmail.com",
      "IPAdr":"112.11.11.22",
      "Password":"123456",
      "ConfirmPassword":"123456"
    };

    // Referral Data
    var pagination = {
      pageno:10,
      pagesize:25
    }

    // Change Password Data
    var passwordData = {
      oldPassword: 'some-value',
      newPassword: 'some-value',
      confirmPassword: 'some-value'
    }

    beforeEach(inject(function(_coinomiaService_, _$httpBackend_, _$log_) {
      coinomiaService = _coinomiaService_;
      $httpBackend = _$httpBackend_;
      $log = _$log_;
    }));

    it('should be registered', function() {
      expect(coinomiaService).not.toEqual(null);
    });

    describe('apiHost variable', function() {
      it('should exist', function() {
        expect(coinomiaService.apiHost).not.toEqual(null);
      });
    });

    // Login Test Case
    describe('login function', function() {
      it('should exist', function() {
        expect(coinomiaService.login).not.toEqual(null);
      });

      it('should have fields defined', function () {
          expect(loginData.username).toEqual("coinomia");
          expect(loginData.password).toEqual("coinomia");
      });


      it('should login user successfully', function() {
        $httpBackend
        .expect('POST', coinomiaService.apiHost + '/oauth2/token', loginData)
        .respond(200, {'access_token':'some-token',token_type:'bearer', expires:90000});
        var data;
        coinomiaService.login(loginData).then(function(fetchedData) {
          data = fetchedData;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Object));
        expect(data.access_token).toEqual('some-token');
        expect(data.token_type).toEqual('bearer');
        expect(data.expires).toEqual(90000);
      });

      it('should log login error', function() {
        $httpBackend
        .expect('POST', coinomiaService.apiHost + '/oauth2/token', loginData)
        .respond(500, 'Internal Server Error.');
        coinomiaService.login(loginData);
        $httpBackend.flush();
        expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
      });
    });

    // Sign Up Test Case
    describe('signup function', function() {
      it('should exist', function() {
        expect(coinomiaService.signup).not.toEqual(null);
      });

      it('Userid, Sponsor, Pincode, Country, FirstName, Mobile, Email, IPAdr, Password Should not be blank', function () {
          expect(signupData.userid).not.toBe('');
          expect(signupData.sponsor).not.toBe('');
          expect(signupData.Pincode).not.toBe('');
          expect(signupData.Country).not.toBe('');
          expect(signupData.FirstName).not.toBe('');
          expect(signupData.Mobile).not.toBe('');
          expect(signupData.Email).not.toBe('');
          expect(signupData.IPAdr).not.toBe('');
          expect(signupData.Password).not.toBe('');
      });

      it('Pincode, Mobile should be in number', function () {
          expect(signupData.Mobile).toBeGreaterThan(0);
      });

      it('New Password and Confirm Password do not match', function () {
          expect(signupData.Password).toBe(signupData.ConfirmPassword);
      });

      it('should signup succcessfully', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + '/user/signup', signupData)
      .respond(200, {"Message":"Success"});
      var data;
      coinomiaService.signup(signupData).then(function(fetchedData) {
        data = fetchedData;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.Message).toEqual('Success');
    });

    it('should log a signup error', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + '/user/signup', signupData)
      .respond(500, 'Internal Server Error.');
      coinomiaService.signup(signupData);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });


});
