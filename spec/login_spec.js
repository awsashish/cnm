'use strict';

describe('Application Homepage', function() {
  it('should display the login page', function() {
    browser.get('http://localhost:9000');
  });

  it('should logged in users', function() {

    // Find the element with ng-model="user" and type "jacksparrow" into it
    element(by.model('username')).sendKeys('coinomia');
    element(by.model('password')).sendKeys('123zaq!');

    // Find the first (and only) button on the page and click it
    element(by.buttonText('Sign In')).click()
      .then(function() {
        browser.waitForAngular();
        browser.driver.getCurrentUrl().then(function(url) {
          return (/dashboard/).test(url);
        })
      }, 20000);

      expect(browser.driver.getCurrentUrl()).toMatch('/dashboard');

  });

});
