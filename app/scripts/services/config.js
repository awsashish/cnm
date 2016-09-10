'use strict';

/**
 * @ngdoc service
 * @name coinomiaFrontendApp.config
 * @description
 * # config
 * Constant in the coinomiaFrontendApp.
 */
angular.module('coinomiaFrontendApp')
  .constant('config', {
    'pageLimit' : 25,
    'pageno':1,
    'currentPage':1,
    'purchasedTitle': 'Purchased',
    'purchasedSubTitle': 'Power',
    'purchasedIcon': 'images/dash-pur-pow.png',
    'incomeTitle': 'Total',
    'incomeSubTitle': 'Income',
    'incomeIcon': 'images/dash-tot-inc.png',
    'ratesTitle': 'Current Rates',
    'ratesSubTitle': 'Offerd by Coinomia as Now',
    'ratesIcon': 'images/dash-cur-rate.png',
    'poolValue':1000,          // Mining payout pool dropdown value
    'contributorValue':100,    // Mining payout Machine or Contributor dropdown value
    'rackValue':10,            // Mining payout Rack dropdown value
    // 'btcMining':0.5,
    // 'ethMining':0.5,
    'PV':10,
    'directPercent': 0.12,    // 12% incase of direct sales commission
    'contributorMining':10,   // Machine mining value for mining payouts
    'rackMining':100,         // Rack mining value for mining payouts
    'DAYS_IN_A_MONTH':30,
    'DAYS_IN_A_YEAR':365,
    'DAYS_IN_A_WEEK':7,
    'DAYS_IN_A_15_MONTHLY':456,

  });
