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
        controller: 'LoginCtrl',
        authenticate: false
    })

    // Forogt password page
    .state('forgot-password', {
        url: '/forgot-password',
        templateUrl: 'views/forgot-password.html',
        controller: 'ForgotpasswordCtrl',
        authenticate: false
    })

    // Sign up page
    .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        authenticate: false
    })

    // Dashboard page
    .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        ncyBreadcrumb: {
          label: 'Dashboard'
        },
        authenticate:true
    })

    // Successful page
    .state('success', {
        url: '/success',
        templateUrl: 'views/success.html',
    })

    // Support page
    .state('support', {
        url: '/support',
        templateUrl: 'views/support.html',
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
    })

    // My Referral page
    .state('referral-link', {
      url: '/referral-link',
      templateUrl: 'views/referral-link.html',
      controller: 'ReferralCtrl',
      ncyBreadcrumb: {
        label: 'My Referral Link'
      },
      authenticate: true
    })

    // Payouts page
    .state('payouts', {
      url: '/payouts',
      templateUrl: 'views/coming-soon.html',
      controller: 'PayoutsCtrl',
      authenticate: true
    })

    // Networks page
    .state('networks', {
      url: '/networks',
      templateUrl: 'views/networks.html',
      authenticate: true
    })

    // Mining page
    .state('mining', {
      url: '/mining',
      templateUrl: 'views/mining.html',
      controller: 'DashboardCtrl',
      authenticate: true
    })

    // Business Plans
    .state('business-plan', {
      url: '/business-plan',
      templateUrl: 'views/coming-soon.html',
      controller: 'BusinessplanCtrl',
      authenticate: true
    })

    // My Account
    .state('my-account', {
      url: '/my-account',
      templateUrl: 'views/coming-soon.html',
      controller: 'MyaccountCtrl',
      authenticate: true
    })

    // My Account
    .state('setting', {
      url: '/setting',
      templateUrl: 'views/setting.html',
      controller: 'SettingCtrl',
      ncyBreadcrumb: {
        label: 'Setting'
      },
      authenticate: true
    })

    //
    // $locationProvider.html5Mode(true);
});
