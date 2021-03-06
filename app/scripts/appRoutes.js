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
    // // Login page
    // .state('login', {
    //     url: '/login',
    //     templateUrl: 'views/login.html',
    //     controller: 'LoginCtrl',
    //     authenticate: false
    // })

    // Login rediect
    .state('login', {
        url: '/login?return_url',
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
    // Coinomia Academy Page
    .state('coinomia-academy', {
        url: '/coinomia-academy',
        templateUrl: 'views/coinomia-academy.html',
        controller: 'CoinomiaAcademyCtrl',
        authenticate: false
    })
    .state('coinomia-academy-cart', {
        url: '/coinomia-academy-cart/:id',
        templateUrl: 'views/coinomia-academy-cart.html',
        controller: 'CoinomiaAcademyCartCtrl',
        authenticate: false
    })

    // Resend Verification Email
    .state('resend-verification', {
        url: '/resend-verification',
        templateUrl: 'views/resend-verification.html',
        controller: 'ResendverificationemailCtrl',
        authenticate: false
    })

    // Reset password page
    .state('reset-password', {
        url: '/reset-password',
        templateUrl: 'views/reset-password.html',
        controller: 'ResetpasswordCtrl',
        authenticate: false
    })

    // Sign up page
    .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        authenticate: false
    })

    // Total Sign up
    .state('total-signups', {
        url: '/total-signups',
        templateUrl: 'views/total-signup.html',
        controller: 'TotalsignupCtrl',
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

    // Reward page
    .state('reward', {
        url: '/reward',
        templateUrl: 'views/reward.html',
        controller: 'RewardCtrl',
        authenticate:true
    })

    // Successful page
    .state('success', {
        url: '/success',
        templateUrl: 'views/success.html',
        controller: 'SuccessCtrl'
    })

    .state('invoice', {
        url: '/invoice',
        templateUrl: 'views/transaction-invoice.html'
    })

    // Support page
    // .state('support', {
    //     url: '/support?return_url',
    //     templateUrl: 'views/support.html',
    //     controller: 'SupportCtrl',
    //     authenticate:true
    // })

    // Support page
    .state('support', {
        url: '/support',
        templateUrl: 'views/support.html',
        authenticate:true
    })

    // Terms & Conditions page
    .state('terms-and-conditions', {
        url: '/terms-and-conditions',
        templateUrl: 'views/terms.html',
        controller: 'MainCtrl'
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
      controller:'NetworksCtrl',
      authenticate: true
    })

    // Mining page
    .state('mining', {
      url: '/mining',
      templateUrl: 'views/mining.html',
      controller: 'MiningCtrl',
      authenticate: true
    })

    .state('order-tab', {
      url: '/mining/:orderTab',
      templateUrl: 'views/mining.html',
      controller: 'MiningCtrl',
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
    .state('promote-coinomia', {
      url: '/promote-coinomia',
      templateUrl: 'views/promote-coinomia.html',
      controller: 'PromotecoinomiaCtrl',
      authenticate: true
    })

    .state('promote-coinomia-tab', {
      url: '/promote-coinomia/:tabId',
      templateUrl: 'views/promote-coinomia.html',
      controller: 'PromotecoinomiaCtrl',
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
    .state('wallet', {
      url: '/wallet',
      templateUrl: 'views/wallet.html',
      controller: 'WalletCtrl',
      authenticate: true
    })
    .state('coin-videos', {
      url: '/coin-videos/:tabId',
      templateUrl: 'views/coin-videos.html',
      controller: 'CoinvideosCtrl',
      authenticate: true
    })
    //
    // $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
});
