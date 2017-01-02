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
    'rewards': [
      {
        'type': 'bronze.png',
        'class': 'reward01',
        'image': '400.jpg', 
        'title': 'Bronze',
        'subtitle': 'Hitting 1st Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab o 3:3, you are ranked Bronze.Hitting for 7 consecutive days, you get rewarded with <strong> $400 </strong>',
        'prize':'bronz-reward.png',
        'description': '<h2>Matching 3:3 PV’s through Repurchase binary lands you to Bronze! Your achievement will be displayed with achievers and other Rank holders.</h2><h3>Bingo!!<b> You are now eligible to win $400 extra above daily</b> repurchase returns <br>just by hitting Bronze for 7 consecutive days!</h3> <br><br><strong>Current Stats: </strong>You are Currently a Bronze Rank holder.<br>Days left for achieving reward: 6<br><strong class="red-font">Note: This structure works only with Repurchase Binary.</strong>'
      },
      {
        'type': 'silver.png',
        'class': 'reward02',
        'image': 'macbook.jpg', 
        'title': 'Silver',
        'subtitle': 'Hitting 2nd Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab of 9:9, you are ranked Silver. Hitting for 7 Consecutive days, grab a <strong>Macbook Pro</strong>.',
        'prize':'silver-reward.png',
        'description': 'Matching  9:9 PV’s through Repurchase binary lands you to Silver! Your achievement will  be displayed with achievers and other Rank holders.<br><h2>Hitting Silver For 7 Days Continuously will Add a More Gadget to your Kitty. You Will be Getting a Brand New Macbook Pro,the Best of the Kind! You Cannot Beat the Class of this Machine</h2><h3>Bingo!! <b> You can now grab a Macbook Pro above daily</b> repurchase returns just by hitting  Silver for 7 consecutive days!</h3><br><br><strong>Current  Stats:</strong>You  need to motivate your team to make more repurchases!<br>Days  left for achieving reward: 7<br><strong>Note:  This structure works with Repurchase Binary.</strong>'
      },
      {
        'type': 'gold.png',
        'class': 'reward03',
        'image': 'dubai.jpg', 
        'title': 'Gold',
        'subtitle': 'Hitting 3rd Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab of 27:27, you are ranked Gold. Hitting for 7 Consecutive days, fly to <strong>Dubai/Tashkent for 3 Nights/4 days</strong>.',
        'prize':'gold-reward.png',
        'description': 'Matching 27:27 PV’s through Repurchase binary lands you to Gold! Your achievement will be displayed with achievers and other Rank holders.<br><h2>Hitting gold for 7 consecutive days will be an achievement for you! In spite of making $270 for 7 days, you will also be sponsored a trip to dubai/tashkent for 4 days!!</h2><h3>Bingo!! <b>You can now fly to Dubai/Tashkent for 3 Nights/4 Days above daily</b> repurchase returns just by hitting Gold for 7 consecutive days!</h3><br><br><strong>Current Stats: </strong>You need to motivate your team to make more repurchases!<br>Days left for achieving reward: 7<br><strong>Note: This structure works with Repurchase Binary.</strong>'
      },
      {
        'type': 'ruby.png',
        'class': 'reward04',
        'image': 'vegas.jpg', 
        'title': 'Ruby',
        'subtitle': 'Hitting 4th Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab of 81:81, you are ranked Ruby.Hitting for 7 Consecutive days, fly to <strong>Vegas for 6 Nights/7 days</strong>',
        'prize':'ruby-reward.png',
        'description': 'Matching 81:81 PV’s through Repurchase binary lands you to Ruby! Your achievement will be displayed with achievers and other Rank holders.<h2>Ruby, As The Name Says, Is A Luxury In Itself! Hitting Ruby For 7 Continuous Days Lands You To A 7 Day Trip To Vegas!!! Yes, Its True! When You Maintain The Rank For 7 Days, Your Trip Will Be Sponsored By Coinomia.</h2><h3>Bingo!! <b>You can now fly to Vegas for 6 Nights/7 Days above daily</b> repurchase returns just by hitting Ruby for 7 consecutive days!</h3><br><br><strong>Current Stats: </strong> You need to motivate your team to make more repurchases!<br>Days left for achieving reward: 7<br><strong>Note: This structure works with Repurchase Binary.</strong>'
      },
      {
        'type': 'emerld.png',
        'class': 'reward05',
        'image': 'bmw5.jpg', 
        'title': 'Emerald',
        'subtitle': 'Hitting 5th Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab of 243:243, you are ranked Emerald.Hitting for 7 Consecutive days, <strong>grab a BMW 5 Series</strong>!',
        'prize':'emerald-reward.png',
        'description': 'Matching 243:243 PV’s through Repurchase binary lands you to Emerald! Your achievement will be displayed with achievers and other Rank holders.<br><h2>Ruby, As The Name Says, Is A Luxury In Itself! Hitting Ruby For 7 Continuous Days Lands You To A 7 Day Trip To Vegas!!! Yes, Its True! When You Maintain The Rank For 7 Days, Your Trip Will Be Sponsored By Coinomia.!!</h2><h3>Bingo!! <b>You can now grab a BMW 5 Series above daily</b> repurchase returns just by hitting Emerald for 7 consecutive days! </h3><br><br><strong>Current Stats: </strong>You need to motivate your team to make more repurchases!<br> Days left for achieving reward: 7<br><strong>Note: This structure works with Repurchase Binary.</strong>'
      },
      {
        'type': 'diamond.png',
        'class': 'reward07',
        'image': 'bmwi8.jpg', 
        'title': 'Diamond',
        'subtitle': 'Hitting 6th Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab of 729:729, you are ranked Diamond.Hitting for 7 Consecutive days, <strong>Grab a brand new BMW I8</strong>!',
        'prize':'diamond-award.png',
        'description': 'Matching 729:729 PV’s through Repurchase binary lands you to Diamond! Your achievement will be displayed with achievers and other Rank holders.<br><h2>Hitting Emerald For 7 Continuous Days Makes You A Star! Thus, Not Only You Make A Heavy Amount Daily By Repurchase, You Also Get A Powerful Bmw 5 Series. No Further Explanations But The Brand Speaks Itself!</h2><h3>Bingo!! <b>You can now grab a brand new BMW I8 above daily</b> repurchase returns just by hitting Diamond for 7 consecutive days!</h3><br><br><strong>Current Stats: </strong><br>You need to motivate your team to make more repurchases!<br>Days left for achieving reward: 7<br> <strong>Note: This structure works with Repurchase Binary.</strong>'
      },
      {
        'type': 'double-diamond.png',
        'class': 'reward08',
        'image': 'ferrari.jpg', 
        'title': 'Double Diamond',
        'subtitle': 'Hitting 7th Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab of 2143:2143, you are ranked Double Diamond.Hitting for 7 Consecutive days, grab a <strong>Brand new Ferrari Italia</strong>!',
        'prize':'dobdiamon-reward.png',
        'description': 'Matching 2143:2143 PV’s through Repurchase binary lands you to Double Diamond! Your achievement will be displayed with achievers and other Rank holders.<h2>Double Diamond For 7 Consecutive Days Makes You The God’s Chosen One! You Have Proved Everyone That Hardwork And Confidence Can Make Everything Happen! You Will Be Making $21870 Daily + A Brand New Ferrari Italia!!</h2><h3>Bingo!! <b>You can now grab a brand new Ferrari Italia above daily</b> repurchase returns just by hitting Double Diamond for 7 consecutive days!</h3><br><br> <strong>Current Stats: </strong>You need to motivate your team to make more repurchases!<br> Days left for achieving reward: 7<br><strong>Note: This structure works with Repurchase Binary.</strong>'
      },
      {
        'type': 'blackdiamond.png',
        'class': 'reward06',
        'image': 'BURJ-BANNNRE.jpg',
        'title': 'BLACK DIAMOND',
        'subtitle': 'Hitting 8thand final Slab of Repurchase Binary', 
        'shortDescription': 'When you hit the slab of 6561:6561, you are ranked Black Diamond.Hitting for 7 Consecutive days, <strong>Book an Apartment in BurjKhalifa</strong>!',
        'prize':'black-diamond.png',
        'description': 'Matching 6561:6561 PV’s through Repurchase binary lands you to Emerald! Your achievement will be displayed with achievers and other Rank holders.<h2>Hitting Black Diamond For 7 Consecutive Days Make You The Luckiest And The Wealthiest Among All!! You Own Luxury And You Also Own An Armani Suite Apartment In The World’s Tallest Building- Burj Khalifa!</h2><h3>Bingo!! <b>You can now own an Apartment at world’s tallest building- BurjKhalifa, Dubai above daily</b> repurchase returns just by hitting Black Diamond for 7 consecutive days!</h3><br><br><strong>Current Stats:</strong>You need to motivate your team to make more repurchases!<br>Days left for achieving reward: 7<br><strong>Note: This structure works with Repurchase Binary.</strong>'
      },
    ]
    // 'productImage': {
    //   'Bitcoin Pool Contract': 'contract-bitcoin.png',
    //   'Bitcoin Machine Contract': 'contributor.png',
    //   'Bitcoin Rack Contract': 'rack.png,
    //   'Ethereum Pool Contract':'ether-contract.png',
    //   'Ethereum Machine Contract':'ether-contributor',
    //   'Ethereum Rack Contract':'ether-rack'
    // }
  });
