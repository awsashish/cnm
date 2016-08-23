'use strict';

angular.module('coinomiaFrontendApp')
.config(function($stateProvider, $locationProvider) {
  $stateProvider

  // Login page
  .state('main', {
      url: '/',
      //templateUrl: 'views/index.html',
      controller: 'MainCtrl'
  })
    // Login page
    .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })

    // Sign up page
    .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
    })

    // Dashboard page
    .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/coming-soon.html',
        controller: 'DashboardCtrl'
    })

    // Successful page
    .state('success', {
        url: '/success',
        templateUrl: 'views/success.html',
    })

    // Terms & Conditions page
    .state('terms-and-conditions', {
        url: '/terms-and-conditions',
        templateUrl: 'views/terms.html',
    })

    // Verify Email page
    .state('verify-email', {
      url: '/verify-email/:id',
      templateUrl: 'views/verifyemail.html',
      controller: 'VerifyemailCtrl'
    });
    //
    // $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('!');
});
