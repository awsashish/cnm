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
    'messageLimit': 10,
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
    'academyUrl': 'https://www.youtube.com/embed/YB1qiuxiCbk?autoplay=',
    'affiliateFees':100,
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
      {field:'colA', displayName:'Name of the User'},
      {field:'colB', displayName:'Email'},
      {field:'colC', displayName:'Sponsor Name'},
      {field:'colD', displayName:'Username'},
      {field:'colE', displayName:'Contact Number'},
      {field:'colF', displayName:'Country'},
      {field:'colG', displayName:'Contract Purchased'},
      {field:'colH', displayName:'Total Purchased Value'},
      {field:'colI', displayName:'Joined At'},
      {field:'colJ', displayName:'Team Members'}
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
    ],
    'btcImagePath':[
      'contract-bitcoin.png',
      'contributor.png',
      'rack.png'
    ],
    'ethImagePath':[
      'ether-contract.png',
      'ether-contributor.png',
      'ether-rack.png'
    ],
    'productImage': {
      'Bitcoin Pool Contract': 'contract-bitcoin.png',
      'Bitcoin Machine Contract': 'contributor.png',
      'Bitcoin Rack Contract': 'rack.png',
      'Ethereum Pool Contract':'ether-contract.png',
      'Ethereum Machine Contract':'ether-contributor',
      'Ethereum Rack Contract':'ether-rack'
    },
    'rewards': [
      {
        'icon': 'bronze_icon.png',
        'type': 'bronze',
        'noImage': false,
        'class': 'reward01',
        'image': '400.jpg', 
        'title': 'bronze-ribbon.png',
        'subtitle': 'Hitting First Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab of 3:3, you are ranked Bronze. <br />Hitting for 7 consecutive days, you get rewarded with <strong> $400 </strong>',
        'prize':'bronze-reward.png',
        'description': {
          'title': 'bronze-desc-title.png',
          'subtitle': 'You can win <strong>$400 </strong> extra above daily repurchase returns just by hitting <strong>Bronze</strong> for 7 consecutive days!',
          'prize': 'bronze-prize.png'
        }
      },
      {
        'icon': 'silver_icon.png',
        'type': 'silver',
        'noImage': true,
        'class': 'reward02',
        'image': 'macbook.png', 
        'title': 'silver-ribbon.png',
        'subtitle': 'Hitting Second Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab of 9:9, you are ranked Silver.<br /> Hitting for 7 Consecutive days, grab a <strong>Macbook Pro</strong>.',
        'prize':'macbook.png',
        'description': {
          'title': 'bronze-desc-title.png',
          'subtitle': 'Hitting Silver For 7 Days Continuously will add a more gadget to your kitty. You will be getting a brand New <strong>Macbook Pro</strong>,the Best of the kind! You cannot beat the class of this machine',
          'prize': 'macbook-bingo.png'
        }
      },
      {
        'icon': 'gold_icon.png',
        'type': 'gold',
        'noImage': false,
        'class': 'reward01',
        'title': 'gold-ribbon.png',
        'subtitle': 'Hitting Third Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab of 27:27, you are ranked Gold. Hitting for 7 Consecutive days, fly to <strong>Dubai/Tashkent for 3 Nights/4 days</strong>.',
        'prize':'dubai-trip.png',
        'description': {
          'title': 'bronze-desc-title.png',
          'subtitle': 'Hitting gold for 7 consecutive days will be an achievement for you! In spite of making $270 for 7 days, you will also be sponsored a trip to <strong>Dubai/Tashkent for 4 days!!</strong>',
          'prize1': 'gold_bingo_imageleft.png',
          'prize2': 'gold_bingo_imageright.png'
        }
        // 'description': 'Matching 27:27 PV’s through Repurchase binary lands you to Gold! Your achievement will be displayed with achievers and other Rank holders.<br><h2>Hitting gold for 7 consecutive days will be an achievement for you! In spite of making $270 for 7 days, you will also be sponsored a trip to <strong>Dubai/Tashkent for 4 days!!</strong></h2><h3>Bingo!! <b>You can now fly to Dubai/Tashkent for 3 Nights/4 Days above daily</b> repurchase returns just by hitting Gold for 7 consecutive days!</h3><br><br><strong>Current Stats: </strong>You need to motivate your team to make more repurchases!<br>Days left for achieving reward: 7<br><strong>Note: This structure works with Repurchase Binary.</strong>'
      },
      {
        'icon': 'ruby_icon.png',
        'type': 'ruby',
        'noImage': true,
        'class': 'reward01',
        'title': 'ruby-ribbon.png',
        'subtitle': 'Hitting Fourth Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab of 81:81, you are ranked Ruby.Hitting for 7 Consecutive days, fly to <strong>Vegas for 6 Nights/7 days</strong>.',
        'prize':'ruby_vegas.png',
        'description': {
          'title': 'bronze-desc-title.png',
          'subtitle': "Ruby, as The name says, is a Luxury in itself! Hitting Ruby for 7 continuous days lands you to a 7 Days trip to VEGAS!!! Yes, it's true! When you maintain the rank for 7 days your trip will be sponsored by <strong>Coinomia</strong>.",
          'prize': 'ruby_bingo.png'
        }
      },
      {
        'icon': 'emerald_icon.png',
        'type': 'emerald',
        'noImage': true,
        'class': 'reward01',
        'title': 'emerald-ribbon.png',
        'subtitle': 'Hitting Fifth Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab of 243:243, you are ranked <strong>Emerald</strong>.Hitting for 7 Consecutive days, <strong>grab a BMW 5 Series</strong>.',
        'prize':'emerald_BMW5.png',
        'description': {
          'title': 'bronze-desc-title.png',
          'subtitle': "Hitting <strong>Emerald</strong> for 7 continuous days makes you awesome! Thus, not only you make a heavy amount daily by repurchase, you also get a powerful <strong>BMW 5</strong> series. No further explanations but the brand speaks itself.",
          'prize': 'emerald_bingo.png'
        }
      },
      {
        'icon': 'diamond_icon.png',
        'type': 'diamond',
        'noImage': true,
        'class': 'reward01',
        'title': 'diamond-ribbon.png',
        'subtitle': 'Hitting Sixth Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab of 729:729, you are ranked <strong>Diamond</strong>. Hitting for 7 Consecutive days, <strong>Grab a brand new BMW I8</strong>.',
        'prize':'diamond_BMWi8.png',
        'description': {
          'title': 'bronze-desc-title.png',
          'subtitle': "Hitting <strong>Diamond</strong> for 7 continuous days makes you a Star! Your garage cannot wait to append another contrivance and that would be a <strong>BMW i8</strong> ahead of your <strong> Repurchase income!</strong>",
          'prize': 'diamond_bingo.png'
        }
      },
      {
        'icon': 'doublediamond_icon.png',
        'type': 'doublediamond',
        'noImage': true,
        'class': 'reward01',
        'title': 'doublediamond-ribbon.png',
        'subtitle': 'Hitting Seventh Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab of 2143:2143, you are ranked <strong>Diamond</strong>. Hitting for 7 Consecutive days, <strong>Grab a brand new Ferrai Italia</strong>.',
        'prize':'doublediamond_ferrari.png',
        'description': {
          'title': 'bronze-desc-title.png',
          'subtitle': "Your motivation and dedication brought you up here. Hitting <strong> Double Diamond</strong> for 7 consecutive days makes you the Almighty's favourite! you will be making - <strong>$21870 Daily + A Brand New Ferrari Italia !! </strong>",
          'prize': 'doublediamond_bingo.png'
        }
      },
      {
        'icon': 'blackdiamond_icon.png',
        'type': 'blackdiamond',
        'noImage': false,
        'class': 'reward01',
        'title': 'blackdiamond-ribbon.png',
        'subtitle': 'Hitting Eight & Final Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab of 6561:6561, you are ranked <strong>Black Diamond</strong>. Hitting for 7 Consecutive days, book an apartment in <strong>BurjKhalifa</strong>.',
        'prize':'blackdiamond_apartment.png',
        'description': {
          'title': 'bronze-desc-title.png',
          'subtitle': "You can now own an Apartment at world's tallest building <strong>Burj Khalifa, Dubai, </strong> above a daily repurchase returns just by hitting <strong>Black Diamond</strong> for 7 consecutive days.",
          'prize': 'blackdiamond_bingo.png'
        }
      }
    ]
  });
