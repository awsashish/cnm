'use strict';



describe('service coinomiaService', function() {
    // load the service's module
    beforeEach(module('coinomiaFrontendApp'));

    var coinomiaService;
    var $httpBackend;
    var $log;
    // Login Data
    var loginData = {
      'username':'coinomia',
      'password':'coinomia',
      'grant_type':'password'
    };

    var token = 'f1608500-­c62f-­489a-­a3a9-­60c5bd2e4eec';

    // Sign Up Data
    var signupData =   {
      'sponsor':'sponsor-name',
      'userid':'user-id',
      'FirstName':'first-name',
      'LastName':'dfsd',
      'Address':'Address',
      'Country':'country-name',
      'State':'state-name',
      'City':'city-name',
      'Pincode':'302013',
      'Mobile':'9999999999',
      'Email':'somevalue@gmail.com',
      'IPAdr':'112.11.11.22',
      'Password':'123456',
      'ConfirmPassword':'123456'
    };

    // Referral Data
    var pagination = {
      pageno:10,
      pagesize:25
    };

    // Change Password Data
    var passwordData = {
      oldPassword: 'some-value',
      newPassword: 'some-value',
      confirmPassword: 'some-value'
    };

    function verifyLoginPostData(postData) {
        // Remove the '?' at the start of the string and split out each assignment
        postData = _.chain( postData.split('&') )
                      // Split each array item into [key, value]
                      // ignore empty string if search is empty
                      .map(function(item) { if (item) return item.split('='); })
                      // Remove undefined in the case the search is empty
                      .compact()
                      // Turn [key, value] arrays into object parameters
                      .object()
                      // Return the value of the chain operation
                      .value();
      expect(postData.username).toBe(loginData.username);
      expect(postData.password).toBe(loginData.password);
      expect(postData.grant_type).toBe(loginData.grant_type);
      return true;

    }

    function verifyLoginRequestHeaders(headers) {
        // console.log(headers['Content-Type']);
          expect(headers['Content-Type']).toBe('application/x-www-form-urlencoded');
          return true;
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
        .expect('POST', coinomiaService.apiHost + '/oauth2/token',
                  verifyLoginPostData,
                  verifyLoginRequestHeaders)
        .respond(200, {'access_token':'some-token',token_type:'bearer', expires:90000});
        var data;
        coinomiaService.login(loginData, coinomiaService.loginRequestConfig).then(function(fetchedData) {
          data = fetchedData.data;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Object));
        expect(data.access_token).toEqual('some-token');
        expect(data.token_type).toEqual('bearer');
        expect(data.expires).toEqual(90000);
      });

      it('should log login error', function() {
        $httpBackend
        .expect('POST', coinomiaService.apiHost + '/oauth2/token', verifyLoginPostData,verifyLoginRequestHeaders)
        .respond(500, 'Internal Server Error.');
        coinomiaService.login(loginData, coinomiaService.loginRequestConfig);
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
        data = fetchedData.data;
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

  // User Referral Test
  describe('user referral function', function() {
    it('should exist', function() {
      expect(coinomiaService.getUserReferral).not.toEqual(null);
    });

    it('should not exceed page number and pagesize', function() {
      expect(pagination.pageno).not.toBeGreaterThan(10);
      expect(pagination.pagesize).not.toBeGreaterThan(25);
    });


    it('should returns records succesfully', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + '/user/referral/'+pagination.pageno+'/'+pagination.pagesize)
      .respond(200, {'total':'some-value','rows':[{'username': 'test123', 'Name':'test', 'DOJ':'11/08/2016', 'Sponsor':'testsponsor', 'IntroName':'intro123', 'ItemName':"Registration"}]});
      var data;
      coinomiaService.getUserReferral(pagination.pageno, pagination.pagesize).then(function(fetchedData) {
        data = fetchedData;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.total).toEqual('some-value');
      expect(data.rows[0].username).toEqual('test123');
      expect(data.rows[0].Name).toEqual('test');
      expect(data.rows[0].DOJ).toEqual('11/08/2016');
      expect(data.rows[0].Sponsor).toEqual('testsponsor');
      expect(data.rows[0].IntroName).toEqual('intro123');
      expect(data.rows[0].ItemName).toEqual('Registration');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + '/user/referral/'+pagination.pageno+'/'+pagination.pagesize)
      .respond(500, 'Internal Server Error.');
      coinomiaService.getUserReferral(pagination.pageno, pagination.pagesize);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // All Referral Test
  describe('all referral function', function() {
    it('should exist', function() {
      expect(coinomiaService.getReferral).not.toEqual(null);
    });

    it('should not exceed page number and pagesize', function() {
      expect(pagination.pageno).not.toBeGreaterThan(10);
      expect(pagination.pagesize).not.toBeGreaterThan(25);
    });


    it('should returns records succesfully', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + '/user/all-referral/'+pagination.pageno+'/'+pagination.pagesize)
      .respond(200, {'total':'some-value','rows':[{'username': 'test123', 'Name':'test', 'DOJ':'11/08/2016', 'Sponsor':'testsponsor', 'IntroName':'intro123', 'ItemName':"Registration"}]});
      var data;
      coinomiaService.getReferral(pagination.pageno, pagination.pagesize).then(function(fetchedData) {
        data = fetchedData;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.total).toEqual('some-value');
      expect(data.rows[0].username).toEqual('test123');
      expect(data.rows[0].Name).toEqual('test');
      expect(data.rows[0].DOJ).toEqual('11/08/2016');
      expect(data.rows[0].Sponsor).toEqual('testsponsor');
      expect(data.rows[0].IntroName).toEqual('intro123');
      expect(data.rows[0].ItemName).toEqual('Registration');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + '/user/all-referral/'+pagination.pageno+'/'+pagination.pagesize)
      .respond(500, 'Internal Server Error.');
      coinomiaService.getReferral(pagination.pageno, pagination.pagesize);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Change Password Test
  describe('change password function', function() {
    it('should exist', function() {
      expect(coinomiaService.changePassword).not.toEqual(null);
    });

    it('Current Password and New Password should not be blank', function () {
        expect(passwordData.oldPassword).not.toBe('');
        expect(passwordData.newPassword).not.toBe('');
    });

    it('New Password and Confirm Password do not match', function () {
        expect(passwordData.newPassword).toEqual(passwordData.confirmPassword);
    });


    it('Password changed succesfully', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + '/user/change-password/', passwordData)
      .respond(200, {"Message":"Success"});
      var data;
      coinomiaService.changePassword(passwordData).then(function(fetchedData) {
        data = fetchedData;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.Message).toEqual('Success');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + '/user/change-password/', passwordData)
      .respond(500, 'Internal Server Error.');
      coinomiaService.changePassword(passwordData);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get All Countries Test
  describe('countries function', function() {
    it('should exist', function() {
      expect(coinomiaService.getCountries).not.toEqual(null);
    });

    it('should returns records succesfully', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + '/utilities/list-countries/')
      .respond(200, [{'name':'some-country', 'code':'some-code', 'dial_code':'+91'}, {'name':'India', 'code':'IN', 'dial_code':'+91'}]);
      var data;
      coinomiaService.getCountries().then(function(fetchedData) {
        data = fetchedData;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data[0].name).toEqual('some-country');
      expect(data[0].code).toEqual('some-code');
      expect(data[0].dial_code).toEqual('+91');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + '/utilities/list-countries/')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getCountries();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get User Profile Test
  describe('user profile function', function() {
    it('should exist', function() {
      expect(coinomiaService.userInfo).not.toEqual(null);
    });

    it('should returns records succesfully', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/me/')
      .respond(200, {'sponsor':'some-value','username':'coinomia', 'name':'Company', 'Mobile':'9595959595', 'Email':'some@email.com', 'Address':'xyz', 'Country':'India', 'State':'', 'City':'', 'Pincode':''});
      var data;
      coinomiaService.userInfo().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.sponsor).toEqual('some-value');
      expect(data.username).toEqual('coinomia');
      expect(data.name).toEqual('Company');
      expect(data.Mobile).toEqual('9595959595');
      expect(data.Email).toEqual('some@email.com');
      expect(data.Address).toEqual('xyz');
      expect(data.Country).toEqual('India');
      expect(data.State).toEqual('');
      expect(data.City).toEqual('');
      expect(data.Pincode).toEqual('');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/me/')
      .respond(500, 'Internal Server Error.');
      coinomiaService.userInfo();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get Purchased Power Test
  describe('purchased power function', function() {
    it('should exist', function() {
      expect(coinomiaService.getPurchasePower).not.toEqual(null);
    });

    it('should returns records succesfully', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/purchased-power/')
      .respond(200, [{'coin':'BTC','miningpower':'some-value'}, {'coin':'ETH','miningpower':'some-value'}]);
      var data;
      coinomiaService.getPurchasePower().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data[0].coin).toEqual('BTC');
      expect(data[0].miningpower).toEqual('some-value');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/purchased-power/')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getPurchasePower();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Current Mining Test
  describe('current mining function', function() {
    it('should exist', function() {
      expect(coinomiaService.currentMining).not.toEqual(null);
    });

    it('should returns records succesfully', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/current-mining/')
      .respond(200, [{'coin':'BTC','current_mining':512}, {'coin':'ETH','current_mining':512}]);
      var data;
      coinomiaService.currentMining().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data[0].coin).toEqual('BTC');
      expect(data[0].current_mining).toEqual(512);
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/current-mining/')
      .respond(500, 'Internal Server Error.');
      coinomiaService.currentMining();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Total Income Test
  describe('total income function', function() {
    it('should exist', function() {
      expect(coinomiaService.getTotalIncome).not.toEqual(null);
    });

    it('should returns records succesfully', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/total-income/')
      .respond(200, [{'coin':'BTC','current_mining':512}, {'coin':'ETH','current_mining':512}]);
      var data;
      coinomiaService.getTotalIncome().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data[0].coin).toEqual('BTC');
      expect(data[0].current_mining).toEqual(512);
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/total-income/')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getTotalIncome();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Wallet Transaction Test
  describe('wallet transaction function', function() {
    it('should exist', function() {
      expect(coinomiaService.wallletInfo).not.toEqual(null);
    });

    it('should not exceed page number and pagesize', function() {
      expect(pagination.pageno).not.toBeGreaterThan(10);
      expect(pagination.pagesize).not.toBeGreaterThan(25);
    });


    it('should returns records succesfully', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + '/user/transaction/'+pagination.pageno+'/'+pagination.pagesize)
      .respond(200, {'total':'some-value','rows':[]});
      var data;
      coinomiaService.walletInfo(pagination.pageno, pagination.pagesize).then(function(fetchedData) {
        data = fetchedData;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.total).toEqual('some-value');
      expect(data.rows).toEqual(jasmine.any(Object));
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + '/user/transaction/'+pagination.pageno+'/'+pagination.pagesize)
      .respond(500, 'Internal Server Error.');
      coinomiaService.walletInfo(pagination.pageno, pagination.pagesize);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get Products Test
  describe('products function', function() {
    it('should exist', function() {
      expect(coinomiaService.getProducts).not.toEqual(null);
    });

    it('should returns records succesfully', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/products/')
      .respond(200, [{'coin':'BTC','productname':'some-product', 'miningpower':0.5, 'unit':'TH/s', 'amount':100, 'maxunit':10}]);
      var data;
      coinomiaService.getProducts().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data[0].coin).toEqual('BTC');
      expect(data[0].productname).toEqual('some-product');
      expect(data[0].miningpower).toEqual(0.5);
      expect(data[0].unit).toEqual('TH/s');
      expect(data[0].amount).toEqual(100);
      expect(data[0].maxunit).toEqual(10);
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/products/')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getProducts();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Verification Email Test
  describe('verification email function', function() {
    it('should exist', function() {
      expect(coinomiaService.verifyEmail).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + '/user/email-verify/'+token)
      .respond(200, {'Message':'Success'});
      var data;
      coinomiaService.verifyEmail(token).then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.Message).toEqual('Success');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + '/user/email-verify/'+token)
      .respond(500, 'Internal Server Error.');
      coinomiaService.verifyEmail(token);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });
});
