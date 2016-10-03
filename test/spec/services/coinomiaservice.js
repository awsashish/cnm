'use strict';



describe('service coinomiaService', function() {
    // load the service's module
    beforeEach(module('coinomiaFrontendApp'));

    var coinomiaService;
    var $httpBackend;
    var $log,
        config;
    // Login Data
    var loginData = {
      'username':'coinomia',
      'password':'coinomia',
      'grant_type':'password'
    };

    var resetData = {
      EmailId: 'some@gmail.com',
      UniqueCode: 'B991F56C­21AE­4E31­923 2­FDD96A354407',
      NewPassword: '123zaq!1',
      ConfirmPassword: '123zaq!1'
    }

    var walletData = {
      "wallet":"BTC",
      "address":"addresshdlkjahlkas"
    }

    var placement = JSON.stringify("A");

    var sponsorId = JSON.stringify("coinomia");
    var emailId = JSON.stringify("some@gmail.com");

    // Refresh Token Data
    var refreshToken = 'some-value';

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

    var formData =   {
      'Name':'some-name',
      'Address':'Address',
      'Country':'country-name',
      'State':'state-name',
      'City':'city-name',
      'Pincode':'302013',
      'Mobile':'9999999999',
      'Email':'somevalue@gmail.com',
    };

    // Referral Data
    var pagination = {};

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

    function verifyRefreshTokenPostData(postData) {
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
      expect(postData.grant_type).toBe(refreshToken.grant_type);
      expect(postData.refresh_token).toBe(refreshToken.refresh_token);
      return true;

    }

    function verifyRequestHeaders(headers) {
        // console.log(headers['Content-Type']);
          expect(headers['Content-Type']).toBe('application/x-www-form-urlencoded');
          return true;
    }

    beforeEach(inject(function(_coinomiaService_, _$httpBackend_, _$log_, _config_) {
      coinomiaService = _coinomiaService_;
      $httpBackend = _$httpBackend_;
      $log = _$log_;
      config = _config_;
      pagination = {
        pageno: config.pageno,
        pagesize: config.pageLimit
      }
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
        .expect('POST', coinomiaService.apiHost + 'oauth2/token',
                  verifyLoginPostData,
                  verifyRequestHeaders)
        .respond(200, {'access_token':'some-token',token_type:'bearer', expires:90000});
        var data;
        coinomiaService.login(loginData, coinomiaService.requestConfig).then(function(fetchedData) {
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
        .expect('POST', coinomiaService.apiHost + 'oauth2/token', verifyLoginPostData,verifyRequestHeaders)
        .respond(500, 'Internal Server Error.');
        coinomiaService.login(loginData, coinomiaService.requestConfig);
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
      .expect('POST', coinomiaService.apiHost + 'user/signup', signupData)
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
      .expect('POST', coinomiaService.apiHost + 'user/signup', signupData)
      .respond(500, 'Internal Server Error.');
      coinomiaService.signup(signupData);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // User Directs Test
  describe('user directs function', function() {
    it('should exist', function() {
      expect(coinomiaService.getUserDirects).not.toEqual(null);
    });

    it('should not exceed page number and pagesize', function() {
      expect(pagination.pageno).not.toBeGreaterThan(10);
      expect(pagination.pagesize).not.toBeGreaterThan(25);
    });


    it('should returns records succesfully', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/referral/'+pagination.pageno+'/'+pagination.pagesize)
      .respond(200, {'total':'some-value','rows':[{'username': 'test123', 'Name':'test', 'DOJ':'11/08/2016', 'Sponsor':'testsponsor', 'IntroName':'intro123', 'ItemName':"Registration"}]});
      var data;
      coinomiaService.getUserDirects(pagination.pageno, pagination.pagesize).then(function(fetchedData) {
        data = fetchedData.data;
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
      .expect('GET', coinomiaService.apiHost + 'user/referral/'+pagination.pageno+'/'+pagination.pagesize)
      .respond(500, 'Internal Server Error.');
      coinomiaService.getUserDirects(pagination.pageno, pagination.pagesize);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // All Referral Test
  describe('all referral function', function() {
    it('should exist', function() {
      expect(coinomiaService.getAllReferral).not.toEqual(null);
    });

    it('should not exceed page number and pagesize', function() {
      expect(pagination.pageno).not.toBeGreaterThan(10);
      expect(pagination.pagesize).not.toBeGreaterThan(25);
    });


    it('should returns records succesfully', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/all-referral/'+pagination.pageno+'/'+pagination.pagesize)
      .respond(200, {'total':'some-value','rows':[{'username': 'test123', 'Name':'test', 'DOJ':'11/08/2016', 'Sponsor':'testsponsor', 'IntroName':'intro123', 'ItemName':"Registration"}]});
      var data;
      coinomiaService.getAllReferral(pagination.pageno, pagination.pagesize).then(function(fetchedData) {
        data = fetchedData.data;
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
      .expect('GET', coinomiaService.apiHost + 'user/all-referral/'+pagination.pageno+'/'+pagination.pagesize)
      .respond(500, 'Internal Server Error.');
      coinomiaService.getAllReferral(pagination.pageno, pagination.pagesize);
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
      .expect('POST', coinomiaService.apiHost + 'user/change-password/', passwordData)
      .respond(200, {"Message":"Success"});
      var data;
      coinomiaService.changePassword(passwordData).then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.Message).toEqual('Success');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'user/change-password/', passwordData)
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
      .expect('POST', coinomiaService.apiHost + 'utilities/list-countries/')
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
      .expect('POST', coinomiaService.apiHost + 'utilities/list-countries/')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getCountries();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get User Profile Test
  describe('user profile function', function() {
    it('should exist', function() {
      expect(coinomiaService.getUserInfo).not.toEqual(null);
    });

    it('should returns records succesfully', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/me/')
      .respond(200, {'sponsor':'some-value','username':'coinomia', 'name':'Company', 'Mobile':'9595959595', 'Email':'some@email.com', 'Address':'xyz', 'Country':'India', 'State':'', 'City':'', 'Pincode':''});
      var data;
      coinomiaService.getUserInfo().then(function(fetchedData) {
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
      coinomiaService.getUserInfo();
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

  // Get Latest Transaction and Withdrawals
  describe('transaction details function', function() {
    it('should exist', function() {
      expect(coinomiaService.getTransactionDetails).not.toEqual(null);
    });

    it('should not exceed page number and pagesize', function() {
      expect(pagination.pageno).not.toBeGreaterThan(10);
      expect(pagination.pagesize).not.toBeGreaterThan(25);
    });


    it('should returns records succesfully', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/transaction/'+pagination.pageno+'/'+pagination.pagesize)
      .respond(200, {'total':'some-value','rows':[]});
      var data;
      coinomiaService.getTransactionDetails(pagination.pageno, pagination.pagesize).then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.total).toEqual('some-value');
      expect(data.rows).toEqual(jasmine.any(Object));
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/transaction/'+pagination.pageno+'/'+pagination.pagesize)
      .respond(500, 'Internal Server Error.');
      coinomiaService.getTransactionDetails(pagination.pageno, pagination.pagesize);
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
      .expect('GET', coinomiaService.apiHost + 'user/email-verify/'+token)
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
      .expect('GET', coinomiaService.apiHost + 'user/email-verify/'+token)
      .respond(500, 'Internal Server Error.');
      coinomiaService.verifyEmail(token);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get Landing Pages and Referral Link Test
  describe('landing pages function', function() {
    it('should exist', function() {
      expect(coinomiaService.getLandingPages).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/landing-pages')
      .respond(200, {'total':2, 'rows':[{'title': 'some-title', 'path':'www.some-value.com', 'description':'some-description'}]});
      var data;
      coinomiaService.getLandingPages().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.total).toEqual(2);
      expect(data.rows[0].title).toEqual('some-title');
      expect(data.rows[0].path).toEqual('www.some-value.com');
      expect(data.rows[0].description).toEqual('some-description');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/landing-pages')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getLandingPages();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get Default Sponsor
  describe('user default sponsor function', function() {
    it('should exist', function() {
      expect(coinomiaService.getDefaultSponsor).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'utilities/default-sponsor')
      .respond(200, {'MemberId':'some-id', 'MemberName':'some-name'});
      var data;
      coinomiaService.getDefaultSponsor().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.MemberId).toEqual('some-id');
      expect(data.MemberName).toEqual('some-name');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'utilities/default-sponsor')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getDefaultSponsor();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Verify Sponsor
  describe('verify sponsor function', function() {
    it('should exist', function() {
      expect(coinomiaService.verifySponsor).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'utilities/verify-sponsor', sponsorId)
      .respond(200, {'username':'sponsor-id', 'name':'some-name'});
      var data;
      coinomiaService.verifySponsor(sponsorId).then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.username).toEqual('sponsor-id');
      expect(data.name).toEqual('some-name');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'utilities/verify-sponsor', sponsorId)
      .respond(500, 'Internal Server Error.');
      coinomiaService.verifySponsor(sponsorId);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get Refresh Token Test Case
  describe('refresh token function', function() {
    it('should exist', function() {
      expect(coinomiaService.login).not.toEqual(null);
    });


    it('should return token successfully', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'oauth2/token',
                verifyRefreshTokenPostData,
                verifyRequestHeaders)
      .respond(200, {'access_token':'some-token',token_type:'bearer', expires_in:90000, refresh_token:'some-value', userid:'some-id'});
      var data;
      coinomiaService.getRefreshToken(refreshToken, coinomiaService.requestConfig).then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.access_token).toEqual('some-token');
      expect(data.token_type).toEqual('bearer');
      expect(data.refresh_token).toEqual('some-value');
      expect(data.userid).toEqual('some-id');
    });

    it('should log refresh token request error', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'oauth2/token', verifyRefreshTokenPostData,verifyRequestHeaders)
      .respond(500, 'Internal Server Error.');
      coinomiaService.getRefreshToken(refreshToken, coinomiaService.requestConfig);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get Packages
  describe('user packages function', function() {
    it('should exist', function() {
      expect(coinomiaService.getPackages).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'utilities/packages')
      .respond(200, {"total": 3,"rows": [{"PackageName": "Pool Contract","Price": "100","PV": "1",  "MiningPower": "0.5000","DirectIncome":"8.00"},{"PackageName":"Contributor","Price": "250","PV": "2","MiningPower": "1.0000","DirectIncome": "10.00"}]});
      var data;
      coinomiaService.getPackages().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.total).toEqual(3);
      expect(data.rows[0].PackageName).toEqual('Pool Contract');
      expect(data.rows[0].Price).toEqual('100');
      expect(data.rows[0].PV).toEqual('1');
      expect(data.rows[0].MiningPower).toEqual('0.5000');
      expect(data.rows[0].DirectIncome).toEqual('8.00');
    });

    it('should log packages error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'utilities/packages')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getPackages();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get User Tree Info
  describe('user virtual tree info function', function() {
    it('should exist', function() {
      expect(coinomiaService.getVirtualTree).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/virtualtree')
      .respond(200, {
       "username": "coinomia",
       "Name": "Company",
       "DOJ":  "5/17/2011 12:00:00AM",
       "Sponsor": "0",
       "ItemName": "Rack",
       "LeftPV": 101,
       "RightPV": 100,
       "LeftTotal": 28,
       "RightTotal": 20,
       "TotalDirect": 45,
       "VirtualPairs": 20
      });
      var data;
      coinomiaService.getVirtualTree().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.username).toEqual("coinomia");
      expect(data.Name).toEqual("Company");
      expect(data.DOJ).toEqual("5/17/2011 12:00:00AM");
      expect(data.Sponsor).toEqual("0");
      expect(data.ItemName).toEqual("Rack");
      expect(data.LeftPV).toEqual(101);
      expect(data.RightPV).toEqual(100);
      expect(data.LeftTotal).toEqual(28);
      expect(data.RightTotal).toEqual(20);
      expect(data.TotalDirect).toEqual(45);
      expect(data.VirtualPairs).toEqual(20);
    });

    it('should log virtual tree error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/virtualtree')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getVirtualTree();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get User Team Data
  describe('user User Team function', function() {
    it('should exist', function() {
      expect(coinomiaService.getTeamCalendar).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/team-calendar')
      .respond(200, {'day':'some-date', 'total':'some-value'});
      var data;
      coinomiaService.getTeamCalendar().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.day).toEqual('some-date');
      expect(data.total).toEqual('some-value');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/team-calendar')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getTeamCalendar();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get Coinomia Team Data
  describe('user Coinomia Team function', function() {
    it('should exist', function() {
      expect(coinomiaService.getCoinomiaTeamCalendar).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/coinomia-calendar')
      .respond(200, {'day':'some-date', 'total':'some-value'});
      var data;
      coinomiaService.getCoinomiaTeamCalendar().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.day).toEqual('some-date');
      expect(data.total).toEqual('some-value');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/coinomia-calendar')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getCoinomiaTeamCalendar();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Forgot Password
  describe('forgot password function', function() {
    it('should exist', function() {
      expect(coinomiaService.forgotPassword).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'forgot-password', emailId)
      .respond(200, {'Message':'Success'});
      var data;
      coinomiaService.forgotPassword(emailId).then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.Message).toEqual('Success');
    });

    it('should log forgot password error', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'forgot-password', emailId)
      .respond(500, 'Internal Server Error.');
      coinomiaService.forgotPassword(emailId);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Resend Verification Email
  describe('resend verification email function', function() {
    it('should exist', function() {
      expect(coinomiaService.resendEmail).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'resend-verification', emailId)
      .respond(200, {'Message':'Success'});
      var data;
      coinomiaService.resendEmail(emailId).then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.Message).toEqual('Success');
    });

    it('should log forgot password error', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'resend-verification', emailId)
      .respond(500, 'Internal Server Error.');
      coinomiaService.resendEmail(emailId);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Reset Password
  describe('reset password function', function() {
    it('should exist', function() {
      expect(coinomiaService.resetPassword).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'reset-password', resetData)
      .respond(200, {'Message':'Success'});
      var data;
      coinomiaService.resetPassword(resetData).then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.Message).toEqual('Success');
    });

    it('should log reset password error', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'reset-password', resetData)
      .respond(500, 'Internal Server Error.');
      coinomiaService.resetPassword(resetData);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Update Profile
  describe('update profile function', function() {
    it('should exist', function() {
      expect(coinomiaService.updateProfile).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'user/update-profile', formData)
      .respond(200, {'Message':'Success'});
      var data;
      coinomiaService.updateProfile(formData).then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.Message).toEqual('Success');
    });

    it('should log reset password error', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'user/update-profile', formData)
      .respond(500, 'Internal Server Error.');
      coinomiaService.updateProfile(formData);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Switch to L | R | A | W Placement
  describe('switch placement function', function() {
    it('should exist', function() {
      expect(coinomiaService.switchPlacement).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'user/auto-rotator', placement)
      .respond(200, {'Message':'Success'});
      var data;
      coinomiaService.switchPlacement(placement).then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.Message).toEqual('Success');
    });

    it('should log forgot password error', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'user/auto-rotator', placement)
      .respond(500, 'Internal Server Error.');
      coinomiaService.switchPlacement(placement);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get Banners
  describe('user banners function', function() {
    it('should exist', function() {
      expect(coinomiaService.getBanners).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/banners')
      .respond(200, {'total':12, 'rows':[{'bannerid': 'some-id', 'bannername':'No hidden Costs', 'bannerhight':125, 'bannerwidth':125, 'bannerimage':'some-path'}]});
      var data;
      coinomiaService.getBanners().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.total).toEqual(12);
      expect(data.rows[0].bannerid).toEqual('some-id');
      expect(data.rows[0].bannername).toEqual('No hidden Costs');
      expect(data.rows[0].bannerhight).toEqual(125);
      expect(data.rows[0].bannerwidth).toEqual(125);
      expect(data.rows[0].bannerimage).toEqual('some-path');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/banners')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getBanners();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get User Direct Leader Board
  describe('user direct leaderboard function', function() {
    it('should exist', function() {
      expect(coinomiaService.getDirectLeaderboard).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/leader-board-direct')
      .respond(200, {"Last7Days": [{"MemberName": "Mohammad Raza","country": "India","total": 13}]});
      var data;
      coinomiaService.getDirectLeaderboard().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.Last7Days[0].MemberName).toEqual('Mohammad Raza');
      expect(data.Last7Days[0].country).toEqual('India');
      expect(data.Last7Days[0].total).toEqual(13);
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/leader-board-direct')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getDirectLeaderboard();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get User Team Leader Board
  describe('user team leaderboard function', function() {
    it('should exist', function() {
      expect(coinomiaService.getTeamLeaderboard).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/leader-board-team')
      .respond(200, {"Last7Days": [{"MemberName": "Mohammad Raza","country": "India","total": 14}]});
      var data;
      coinomiaService.getTeamLeaderboard().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.Last7Days[0].MemberName).toEqual('Mohammad Raza');
      expect(data.Last7Days[0].country).toEqual('India');
      expect(data.Last7Days[0].total).toEqual(14);
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/leader-board-team')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getTeamLeaderboard();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get Wallet Info
  describe('user wallet info function', function() {
    it('should exist', function() {
      expect(coinomiaService.getWalletInfo).not.toEqual(null);
    });

    it('should returns records succesfully', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/wallet-status')
      .respond(200, [{'Wallet': 'test123', 'Address':'some-address', 'Balance':10}]);
      var data;
      coinomiaService.getWalletInfo().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data[0].Wallet).toEqual('test123');
      expect(data[0].Address).toEqual('some-address');
      expect(data[0].Balance).toEqual(10);
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'user/wallet-status')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getWalletInfo();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Update User Wallet Info
  describe('update wallet info', function() {
    it('should exist', function() {
      expect(coinomiaService.updateWalletInfo).not.toEqual(null);
    });

    it('should return success message', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'user/update-wallet', walletData)
      .respond(200, {'Message':'Success'});
      var data;
      coinomiaService.updateWalletInfo(walletData).then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.Message).toEqual('Success');
    });

    it('should log forgot password error', function() {
      $httpBackend
      .expect('POST', coinomiaService.apiHost + 'user/update-wallet', walletData)
      .respond(500, 'Internal Server Error.');
      coinomiaService.updateWalletInfo(walletData);
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });

  // Get Latest Signup
  describe('latest signup function', function() {
    it('should exist', function() {
      expect(coinomiaService.getLatestSignup).not.toEqual(null);
    });

    it('should returns records succesfully', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'latest-signup')
      .respond(200, {"Rank": 1, "country": "South Africa", "membername": "LINDA MKHIZE", "TotalMembers": 0, "DOJ": "2016-09-30T06:05:09.55"});
      var data;
      coinomiaService.getLatestSignup().then(function(fetchedData) {
        data = fetchedData.data;
      });
      $httpBackend.flush();
      expect(data).toEqual(jasmine.any(Object));
      expect(data.Rank).toEqual(1);
      expect(data.country).toEqual('South Africa');
      expect(data.membername).toEqual('LINDA MKHIZE');
      expect(data.TotalMembers).toEqual(0);
      expect(data.DOJ).toEqual('2016-09-30T06:05:09.55');
    });

    it('should log referral error', function() {
      $httpBackend
      .expect('GET', coinomiaService.apiHost + 'latest-signup')
      .respond(500, 'Internal Server Error.');
      coinomiaService.getLatestSignup();
      $httpBackend.flush();
      expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
    });
  });
});
