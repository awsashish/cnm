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
    'purchasedIcon': 'dash-pur-pow.png',
    'incomeTitle': 'Total',
    'incomeSubTitle': 'Income',
    'incomeIcon': 'dash-tot-inc.png',
    'ratesTitle': 'Current Rates',
    'ratesSubTitle': 'Offered by Coinomia as Now',
    'ratesIcon': 'dash-cur-rate.png',
    'poolDropdown': [
      {value:1000, name:'1000'},
      {value:100, name:'100'},
      {value:50, name:'50'},
      {value:10, name:'10'},
      {value:5, name:'5'},
      {value:2, name:'2'},
      {value:1, name:'1'},
      {value:0, name:'0'}
    ],
    'machineDropdown': [
      {value:100, name:'100'},
      {value:50, name:'50'},
      {value:10, name:'10'},
      {value:5, name:'5'},
      {value:2, name:'2'},
      {value:1, name:'1'},
      {value:0, name:'0'}
    ],
    'rackDropdown': [
      {value:10, name:'10'},
      {value:5, name:'5'},
      {value:2, name:'2'},
      {value:1, name:'1'},
      {value:0, name:'0'}
    ],
    'poolSelectedValue': 1000,
    'machineSelectedValue': 100,
    'rackSelectedValue': 10,
    'btcPoolValue':3,          // Mining payout BTC pool TH/s value
    'btcMachineValue':30,    // Mining payout BTC Machine or Contributor TH/s value
    'btcRackValue':300,            // Mining payout BTC Rack TH/s value
    'ethPoolValue':0.58,          // Mining payout ETH pool MH/s value
    'ethMachineValue':5.8,    // Mining payout ETH Machine or Contributor MH/s value
    'ethRackValue':58,            // Mining payout ETH Rack MH/s value
    'productMaxUnit':[
      1000,
      100,
      10
    ],
    'PV':10,
    'directPercent': 0.12,    // 12% incase of direct sales commission
    'contributorMining':10,   // Machine mining value for mining payouts
    'rackMining':100,         // Rack mining value for mining payouts
    'DAYS_IN_A_MONTH':30,
    'DAYS_IN_A_YEAR':365,
    'DAYS_IN_A_WEEK':7,
    'DAYS_IN_A_15_MONTHLY':456,
    'activeTab':'grab-concept',
    'salesDirectImage':'direct-ref.png',
    'salesBinaryImage':'team-ref.png',
    'salesDirectHeading':'If all your Directs Buy',
    'salesBinaryHeading':'If all your Team Buy',
    'wallet':{
      'BTC': 'Bitcoin',
      'ETH': 'Ether'
    },
    'bannerApiPath':'http://coinomiaadmin.azurewebsites.net',
    'signUpPath':'http://login.coinomia.com/#/signup',
    's3BucketUrl':'https://s3-us-west-2.amazonaws.com/coinomia/images/',
    'teamColumnHead': [
      'Name of the User',
      'Email',
      'Sponsor Name',
      'Username',
      'Contact Number',
      'Country',
      'Contract Purchased',
      'Total Purchased Value',
      'Joined At',
      'Team Members'
    ],
    'columnOrder': [
      'Name',
      'Email',
      'Sponsor',
      'username',
      'Mobile',
      'country',
      'TotalContract',
      'TotalPurchased',
      'DOJ',
      'TotalDirect'
    ]
  });
