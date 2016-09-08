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
    'purchasedTitle': 'Purchased',
    'purchasedSubTitle': 'Power',
    'purchasedIcon': 'images/dash-pur-pow.png',
    'incomeTitle': 'Total',
    'incomeSubTitle': 'Income',
    'incomeIcon': 'images/dash-tot-inc.png',
    'ratesTitle': 'Current Rates',
    'ratesSubTitle': 'Offerd by Coinomia as Now',
    'ratesIcon': 'images/dash-cur-rate.png',
    'btcIcon': [
      'images/contract-bitcoin.png',
      'images/contributor.png',
      'images/RACK.png'
    ],
    'eth' : {
      'poolImg': '',
      'contributorImg':'',
      'rackImg':''
    }

  });
