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
    'incomeTitle': 'Mining',
    'incomeSubTitle': 'Income',
    'incomeIcon': 'dash-tot-inc.png',
    'ratesTitle': 'Current Rates',
    'ratesSubTitle': 'Offered by Coinomia as Now',
    'ratesIcon': 'dash-cur-rate.png',
    'videoIdOne': 'YB1qiuxiCbk',
    'videoIdTwo': 'fmWgYnmgcew',
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
    'dashSelectedValue': 10,
    'btcPoolValue':2,          // Mining payout BTC pool TH/s value
    'btcMachineValue':20,    // Mining payout BTC Machine or Contributor TH/s value
    'btcRackValue':200,            // Mining payout BTC Rack TH/s value
    'ethPoolValue':0.58,          // Mining payout ETH pool MH/s value
    'ethMachineValue':5.8,    // Mining payout ETH Machine or Contributor MH/s value
    'ethRackValue':58,
    'dashPoolValue':50,          // Mining payout ETH pool MH/s value
    'dashMachineValue':500,    // Mining payout ETH Machine or Contributor MH/s value
    'dashRackValue':5000,
    'moneroPoolValue':150,
    'moneroMachineValue':1500,
    'moneroRackValue':15000,
    'litePoolValue':150,
    'liteMachineValue':1500,
    'liteRackValue':15000,
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
      'ETH': 'Ether',
      'DASH': 'Dash',
      'MONERO': 'Monero',
      'LITE': 'Lite'
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
    'dashImagePath':[
      'dashpool.png',
      'dashmahine.png',
      'dashrack.png'
    ],
    'moneroImagePath':[
      'monerocloud.png',
      'moneromachine.png',
      'monerorack.png'
    ],
    'liteImagePath':[
      'litepool.png',
      'litemahine.png',
      'literack.png'
    ],
    'productImage': {
      'Bitcoin Pool Contract': 'contract-bitcoin.png',
      'Bitcoin Machine Contract': 'contributor.png',
      'Bitcoin Rack Contract': 'rack.png',
      'Ethereum Pool Contract':'ether-contract.png',
      'Ethereum Machine Contract':'ether-contributor',
      'Ethereum Rack Contract':'ether-rack'
    },
    'reward_commission': {
      'frontline_commission': [
        {
          'memberid': 'mlmguruankur',
          'name': 'Ankur Agarwal',
          'country': 'Malaysia',
          'amount': 2028
        },
        {
          'memberid': 'Dreamsultd',
          'name': 'HumanEyeballs.com Traffic',
          'country': 'USA',
          'amount': 1590
        },
        {
          'memberid': 'coinomia',
          'name': 'Maksim Yemelyanov',
          'country': 'Russia',
          'amount': 1500
        },
        {
          'memberid': 'azamriaz381',
          'name': 'Azam Riaz',
          'country': 'Pakistan',
          'amount': 460
        },
        {
          'memberid': 'Tapsillc',
          'name': 'Nabeel',
          'country': 'USA',
          'amount': 440
        },
        {
          'memberid': 'FraankSG',
          'name': 'Fraank Foo',
          'country': 'Singapore',
          'amount': 330
        },
        {
          'memberid': 'incomeguy',
          'name': 'Nebojsa Zarada',
          'country': 'Yugoslavia',
          'amount': 312
        },
        {
          'memberid': 'freedomrsa',
          'name': 'Tony Gouveia',
          'country': 'South Africa',
          'amount': 2028
        },
        {
          'memberid': 'Ivicagrozni',
          'name': 'Ivica Plantak',
          'country': 'Hungary',
          'amount': 240
        },
        {
          'memberid': 'EarnWithMe',
          'name': 'Sercan Cakir',
          'country': 'Turkey',
          'amount': 232
        }
      ],
      'referral_commission': [
        {
          'memberid': 'coinomia',
          'name':'Maksim Yemelyanov ',
          'country': 'Russia',
          'amount': 17212
        },
        {
          'memberid': 'mlmguruankur',
          'name':'Ankur Agarwal',
          'country': 'Malaysia',
          'amount': 4267
        },
        {
          'memberid': 'cadastro',
          'name':'Eduardo Monteiro',
          'country': 'Brazil',
          'amount': 2156
        },
        {
          'memberid': 'dreamsultd',
          'name':'HumanEyeballs.com Traffic',
          'country': 'USA',
          'amount': 1781
        },
        {
          'memberid': 'azamriaz381',
          'name':'Azam Riaz',
          'country': 'Pakistan',
          'amount': 1715
        },
        {
          'memberid': 'Thema',
          'name':'Arthur SysteMMoney',
          'country': 'Israel',
          'amount': 1514
        },
        {
          'memberid': 'Tomkent023',
          'name':'Tom Kent',
          'country': 'Australia',
          'amount': 1380
        },
        {
          'memberid': 'hoon11',
          'name':'Myonghoon Heo',
          'country': 'Korea, South',
          'amount': 1199
        },
        {
          'memberid': 'star005',
          'name':'antonio santos',
          'country': 'Brazil',
          'amount': 1140
        },
        {
          'memberid': '247success',
          'name':'Louis Martel',
          'country': 'Canada',
          'amount': 985
        }
      ],
      'paid_commission': [
        {
          'memberid': 'coinomia',
          'name': 'Maksim Yemelyanov',
          'country': 'Russia',
          'amount': 64
        },
        {
          'memberid': 'mlmguruankur',
          'name': 'Ankur Agarwal',
          'country': 'Malaysia',
          'amount': 60
        },
        {
          'memberid': 'dreamsultd',
          'name': 'HumanEyeballs.com Traffic',
          'country': 'USA',
          'amount': 45
        },
        {
          'memberid': 'incomeguy',
          'name': 'Nebojsa Zarada',
          'country': 'Yugoslavia',
          'amount': 21
        },
        {
          'memberid': 'azamriaz381',
          'name': 'Azam Riaz',
          'country': 'Pakistan',
          'amount': 16
        },
        {
          'memberid': 'join',
          'name': 'Brian S.',
          'country': 'USA',
          'amount': 11
        },
        {
          'memberid': 'EarnWithMe',
          'name': 'Sercan Cakir',
          'country': 'Turkey',
          'amount': 10
        },
        {
          'memberid': 'samresh123',
          'name': 'Samresh Kumar',
          'country': 'Singapore',
          'amount': 10
        },
        {
          'memberid': 'profit4us',
          'name': 'Steve Bianco',
          'country': 'USA',
          'amount': 9
        },
        {
          'memberid': 'freedomrsa',
          'name': 'Tony Gouveia',
          'country': 'South Africa',
          'amount': 9
        }
      ],
      'repurchase_cheque': [
        {
          'memberid': 'incomeguy',
          'name': 'Nebojsa Zarada',
          'country': 'Yugoslavia',
          'amount': 810
        },
        {
          'memberid': 'join',
          'name': 'Brian S.',
          'country': 'USA',
          'amount': 270
        },
        {
          'memberid': 'LaptopLife',
          'name': 'Parth Dave',
          'country': 'India',
          'amount': 270
        },
        {
          'memberid': 'mlmguruankur',
          'name': 'Ankur Agarwals',
          'country': 'Malaysia',
          'amount': 270
        },
        {
          'memberid': 'GrandDanois',
          'name': 'Martin Germer',
          'country': 'Denmark',
          'amount': 90
        },
        {
          'memberid': 'dreamsultd',
          'name': 'HumanEyeballs.com Traffic',
          'country': 'USA',
          'amount': 90
        },
        {
          'memberid': 'dreambig1',
          'name': 'Sabai Marketing Group',
          'country': 'USA',
          'amount': 90
        },
        {
          'memberid': 'Tapsillc',
          'name': 'Nabeel',
          'country': 'USA',
          'amount': 90
        },
        {
          'memberid': 'mlmindiaa',
          'name': 'Ravi Soni',
          'country': 'India',
          'amount': 90
        },
        {
          'memberid': 'Amazing',
          'name': 'Lucinda Lim',
          'country': 'Singapore',
          'amount': 90
        }
      ]
    },
    'rewards': [
      {
        'icon': 'bronze_icon.png',
        'type': 'bronze',
        'noImage': false,
        'class': 'reward01',
        'image': '400.jpg',
        'title': 'bronze-ribbon.png',
        'subtitle': 'Hitting 1st Slab of Repurchase Binary',
        'shortDescription': 'When you hit the slab of 3:3, you are ranked Bronze. <br />Hitting for 7 consecutive days, you will get rewarded with <strong> $400 </strong>',
        'prize':'bronze-reward.png',
        'description': {
          'title': 'bronze_bingo_title.png',
          'subtitle': 'You can win <strong>$400 </strong> extra above for daily repurchase returns just by hitting <strong>Bronze</strong> for 7 consecutive days!',
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
        'subtitle': 'Hitting 2nd Slab of Repurchase Binary',
        'shortDescription': 'When you hit the slab of 9:9, you are ranked Silver.<br /> Hitting for 7 Consecutive days, grab a <strong>Macbook Pro!</strong>.',
        'prize':'macbook.png',
        'description': {
          'title': 'silver_bingo_title.png',
          'subtitle': 'Hitting silver for 7 days continuously will add one more gadget to your kitty. You will be receiving a brand new  <strong>Macbook Pro</strong>, the best of its kind! You cannot beat the class of this machine!',
          'prize': 'macbook-bingo.png'
        }
      },
      {
        'icon': 'gold_icon.png',
        'type': 'gold',
        'noImage': false,
        'class': 'reward01',
        'title': 'gold-ribbon.png',
        'subtitle': 'Hitting 3rd Slab of Repurchase Binary',
        'shortDescription': 'When you hit the slab of 27:27, you are ranked Gold. Hitting for 7 Consecutive days, fly to <strong>Dubai/Tashkent for 3 Nights/4 days</strong>.',
        'prize':'dubai-trip.png',
        'description': {
          'title': 'gold_bingo_title.png',
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
        'subtitle': 'Hitting 4th Slab of Repurchase Binary',
        'shortDescription': 'When you hit the slab of 81:81, you are ranked Ruby. Hitting for 7 Consecutive days, fly to <strong>Vegas for 6 Nights/7 days</strong>.',
        'prize':'ruby_vegas.png',
        'description': {
          'title': 'ruby_bingo_title.png',
          'subtitle': "Ruby, as the name says, is a luxury in itself! Hitting ruby for 7 continuous days entitles you for a 7 days trip to Vegas!!! Yes, it’s true! If you maintain the rank for 7 days, your trip will be sponsored by <strong>Coinomia</strong>.",
          'prize': 'ruby_bingo.png'
        }
      },
      {
        'icon': 'emerald_icon.png',
        'type': 'emerald',
        'noImage': true,
        'class': 'reward01',
        'title': 'emerald-ribbon.png',
        'subtitle': 'Hitting 5th Slab of Repurchase Binary',
        'shortDescription': 'When you hit the slab of 243:243, you are ranked <strong>Emerald</strong>.Hitting for 7 Consecutive days, you can drive home a <strong>BMW 5 Series!</strong>.',
        'prize':'emerald_BMW5.png',
        'description': {
          'title': 'emerald_bingo_title.png',
          'subtitle': "Hitting <strong>Emerald</strong> for 7 continuous days will make you a star! Not only you will be making a hefty amount daily by repurchase, you will also drive a powerful <strong>BMW 5</strong> series. No further explanations required as the brand speaks itself!",
          'prize': 'emerald-bingo.png'
        }
      },
      {
        'icon': 'diamond_icon.png',
        'type': 'diamond',
        'noImage': true,
        'class': 'reward01',
        'title': 'diamond-ribbon.png',
        'subtitle': 'Hitting 6th Slab of Repurchase Binary',
        'shortDescription': 'When you hit the slab of 729:729, you are ranked <strong>Diamond</strong>. Hitting for 7 Consecutive days, drive home with a brand new <strong>BMW I8</strong> luxury car!.',
        'prize':'diamond_BMWi8.png',
        'description': {
          'title': 'diamond_bingo_title.png',
          'subtitle': "Hitting <strong>Diamond</strong> for 7 days continuously. You will add another edition of <strong>BMW i8</strong> in your garage.",
          'prize': 'diamond_bingo.png'
        }
      },
      {
        'icon': 'doublediamond_icon.png',
        'type': 'doublediamond',
        'noImage': true,
        'class': 'reward01',
        'title': 'doublediamond-ribbon.png',
        'subtitle': 'Hitting 7th Slab of Repurchase Binary',
        'shortDescription': 'When you hit the slab of 2143:2143, you are ranked <strong>Double Diamond</strong>. Hitting for 7 Consecutive days, drive a brand new <strong>Ferrai Italia!</strong>.',
        'prize':'doublediamond_ferrari.png',
        'description': {
          'title': 'doublediamond_bingo_title.png',
          'subtitle': "Hitting <strong> Double Diamond</strong> for 7 consecutive days will makes you the God’s chosen one! You will have proved everyone that by hard work and confidence, you can make everything possible! You will be making <strong>$21870 daily + a brand new pure speed machine Ferrari Italia!!!</strong>",
          'prize': 'doublediamond_bingo.png'
        }
      },
      {
        'icon': 'blackdiamond_icon.png',
        'type': 'blackdiamond',
        'noImage': false,
        'class': 'reward01',
        'title': 'blackdiamond-ribbon.png',
        'subtitle': 'Hitting 8th and final Slab of Repurchase Binary',
        'shortDescription': 'When you hit the slab of 6561:6561, you are ranked <strong>Black Diamond</strong>. Hitting for 7 Consecutive days, Book an Apartment in <strong>Burj Khalifa!</strong>.',
        'prize':'blackdiamond_apartment.png',
        'description': {
          'title': 'blackdiamond_bingo_title.png',
          'subtitle': "Hitting <strong>Black Diamond</strong> for 7 consecutive days will make you the luckiest and the wealthiest among all!! You own luxury and you will be a proud owner of an <strong> Armani suite apartment</strong> in the world’s tallest building- <strong>Burj Khalifa!</strong>",
          'prize': 'blackdiamond_bingo.png'
        }
      }
    ],
    'oldPackage': [
      'Bitcoin Pool Contract',
      'Bitcoin Machine Contract',
      'Bitcoin Rack Contract'
    ]
  });
