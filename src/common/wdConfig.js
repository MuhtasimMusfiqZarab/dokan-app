/** @format */

import Images from './wdImages'
import Constants from './wdConstants'
import Icons from './wdIcons'

export default {
  /**
     Step 1: change to your website URL and the wooCommerce API consumeKey
     */
  WooCommerce: {
    // url: 'http://mstore.io',
    // consumerKey: 'ck_b7594bc4391db4b56c635fe6da1072a53ca4535a',
    // consumerSecret: 'cs_980b9edb120e15bd2a8b668cacc734f7eca0ba40',
    url: 'http://ajaira.website/dokan-app',
    consumerKey: 'ck_4f6b5c9dd7e44a22a2ab9d0e9685b42429879e1a',
    consumerSecret: 'cs_8c8a7e181349b69ff32d21477ed94bcd832a8e26',
  },
  Dokan: {
    url: 'http://ajaira.website/dokan-app',
  },

  /**
     Step 2: Setting Product Images
     - ProductSize: Explode the guide from: update the product display size: https://mstore.gitbooks.io/mstore-manual/content/chapter5.html
     The default config for ProductSize is disable due to some problem config for most of users.
     If you have success config it from the Wordpress site, please enable to speed up the app performance
     - HorizonLayout: Change the HomePage horizontal layout - https://mstore.gitbooks.io/mstore-manual/content/chapter6.html
     */
  ProductSize: {
    enable: false,
    CatalogImages: { width: 300, height: 360 },
    SingleProductImage: { width: 600, height: 720 },
    ProductThumbnails: { width: 180, height: 216 },
  },
  // BUG: Language can not change when set default value in Config.js ==> pass string to change Languages
  // NOTE: name is define value --> change field in Language.js
  HorizonLayout: [
    { tag: 273, paging: true, layout: Constants.Layout.miniBanner },
    {
      purpose: "atAglance",
      layout: Constants.Layout.atAglance,
    },
    {
      name: "featuredProducts",
      purpose: "featuredProducts",
      category: 21,
      image: Images.Banner.Feature,
      layout: Constants.Layout.threeColumn,
    },
    {
      purpose: "newArrival",
      layout: Constants.Layout.newArrival,
    },
    {
      name: "bestSellingProducts",
      purpose: 'bestSellingProducts',
      category: 23,
      image: Images.Banner.Bag,
      layout: Constants.Layout.threeColumn,
    },
    {
      name: "topRatedProducts",
      purpose: "topRatedProducts",
      category: 22,
      image: Images.Banner.Woman,
      layout: Constants.Layout.threeColumn,
    },
    {
      purpose: "popularCategory",
      layout: Constants.Layout.popularCategory,
    },
    {
      name: "featuredVendor",
      purpose: "featuredVendor",
      layout: Constants.Layout.featuredVendor,
      vendorListType: "featured"
    },
  ],

  /**
     step 3: Config image for the Payment Gateway
     Notes:
     - Only the image list here will be shown on the app but it should match with the key id from the WooCommerce Website config
     - It's flexible way to control list of your payment as well
     Ex. if you would like to show only cod then just put one cod image in the list
     * */
  Payments: {
    bacs: require('@images/payment_logo/bacs.png'),
    cod: require('@images/payment_logo/cash_on_delivery.png'),
    paypal: require('@images/payment_logo/PayPal.png'),
    stripe: require('@images/payment_logo/stripe.png'),
    ppec_paypal: require('@images/payment_logo/PayPal.png')
  },

  /**
     Step 4: Advance config:
     - showShipping: option to show the list of shipping method
     - showStatusBar: option to show the status bar, it always show iPhoneX
     - LogoImage: The header logo
     - LogoWithText: The Logo use for sign up form
     - LogoLoading: The loading icon logo
     - appFacebookId: The app facebook ID, use for Facebook login
     - CustomPages: Update the custom page which can be shown from the left side bar (Components/Drawer/index.js)
     - WebPages: This could be the id of your blog post or the full URL which point to any Webpage (responsive mobile is required on the web page)
     - CategoryListView: default layout for category (true/false)
     - intro: The on boarding intro slider for your app
     - menu: config for left menu side items (isMultiChild: This is new feature from 3.4.5 that show the sub products categories)
     * */
  shipping: {
    // visible: true,
    time: {
      free_shipping: '4 - 7 Days',
      flat_rate: '1 - 4 Days',
      local_pickup: '1 - 4 Days',
    },
  },
  showStatusBar: true,
  LogoImage: require('@images/new_logo.png'),
  // LogoWithText: require('@images/logo_with_text.png'),
  LogoWithText: require('@images/dokan-logo.png'),
  LogoLoading: require('@images/logo.png'),

  showAdmobAds: false,
  AdMob: {
    deviceID: 'pub-2101182411274198',
    unitID: 'ca-app-pub-2101182411274198/4100506392',
    unitInterstitial: 'ca-app-pub-2101182411274198/8930161243',
    isShowInterstital: true,
  },
  appFacebookId: '422035778152242',
  CustomPages: { contact_id: 10941 },
  WebPages: { marketing: 'http://inspireui.com' },
  CategoryListView: true,
  intro: [
    {
      key: 'page1',
      title: 'Lorem Ipsum Dolor Sit Ame',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      icon: 'ios-basket-outline',
      colors: ['#0FF0B3', '#036ED9'],
    },
    {
      key: 'page2',
      title: 'Consectetur Adipisicing Elit Sed Do Eiusmod',
      text:
        'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
      icon: 'ios-card-outline',
      colors: ['#13f1fc', '#0470dc'],
    },
    {
      key: 'page3',
      title: 'Adipisicing Elit Sed Do',
      text: 'Usage Consectetur adipisicing elit, sed do eiusmod',
      icon: 'ios-finger-print-outline',
      colors: ['#b1ea4d', '#459522'],
    },
  ],

  /**
   * Config Menu Side Drawer
   * @param goToScreen 3 Params (routeName, params, isReset = false)
   * BUG: Language can not change when set default value in Config.js ==> pass string to change Languages
   */
  menu: {
    // has child categories
    isMultiChild: false,
    // Unlogged
    listMenuUnlogged: [
      {
        text: 'Login',
        routeName: 'LoginScreen',
        params: {
          isLogout: false,
        },
        icon: Icons.MaterialCommunityIcons.SignIn,
      },
    ],
    // user logged in
    listMenuLogged: [
      {
        text: 'Logout',
        routeName: 'LoginScreen',
        params: {
          isLogout: true,
        },
        icon: Icons.MaterialCommunityIcons.SignOut,
      },
    ],
    // Default List
    listMenu: [
      {
        index: 0,
        text: 'Categories',
        routeName: 'CategoriesScreen',
        params: {
          isActive: false
        },
        icon: Icons.MaterialCommunityIcons.GridMode
      },
      {
        index: 1,
        text: 'Home',
        routeName: 'Default',
        params: {
          isActive: true
        },
        icon: Icons.MaterialCommunityIcons.Home,
      },
      {
        index: 2,
        text: 'WishList',
        routeName: 'WishListScreen',
        params: {
          isActive: false
        },
        icon: Icons.MaterialCommunityIcons.Wishlist,
      },
      {
        index: 3,
        text: 'My Order',
        routeName: 'MyOrders',
        params: {
          // id: 10941,
          // title: 'contactus',
          isActive: false
        },
        icon: Icons.MaterialCommunityIcons.Order,
      },
      {
        index: 4,
        text: 'Currency',
        routeName: 'CustomPage',
        params: {
          id: 10941,
          title: 'contactus',
          isActive: false
        },
        icon: Icons.MaterialCommunityIcons.Currency,
      },
      {
        index: 5,
        text: 'Languages',
        routeName: 'CustomPage',
        params: {
          id: 10941,
          title: 'contactus',
          isActive: false
        },
        icon: Icons.MaterialCommunityIcons.Language,
      },
      {
        index: 6,
        text: 'Push Notification',
        routeName: 'CustomPage',
        params: {
          id: 10941,
          title: 'contactus',
          isActive: false
        },
        icon: Icons.MaterialCommunityIcons.Bell,
      },
      {
        index: 7,
        text: 'Contact Us',
        routeName: 'ContactUs',
        params: {
          id: 10941,
          title: 'contactus',
          isActive: false
        },
        icon: Icons.MaterialCommunityIcons.Wechat,
      },
      {
        index: 8,
        text: 'Privacy Policies',
        routeName: 'PrivacyPolicy',
        params: {
          id: 10941,
          title: 'contactus',
          isActive: false
        },
        icon: Icons.MaterialCommunityIcons.Lock,
      },
      {
        index: 9,
        text: 'About Us',
        routeName: 'AboutUs',
        params: {
          // url: 'http://ajaira.website/dokan-app',
          isActive: false
        },
        icon: Icons.MaterialCommunityIcons.About,
      },
      {
        index: 10,
        text: 'Settings',
        routeName: 'SettingScreen',
        params: {
          isActive: false
        },
        icon: Icons.MaterialCommunityIcons.Setting,
      },
    ],
  },

  // Layout select
  layouts: [
    {
      layout: Constants.Layout.card,
      image: Images.icons.iconCard,
      text: 'cardView',
    },
    {
      layout: Constants.Layout.simple,
      image: Images.icons.iconRight,
      text: 'simpleView',
    },
    {
      layout: Constants.Layout.twoColumn,
      image: Images.icons.iconColumn,
      text: 'twoColumnView',
    },
    {
      layout: Constants.Layout.threeColumn,
      image: Images.icons.iconThree,
      text: 'threeColumnView',
    },
    {
      layout: Constants.Layout.horizon,
      image: Images.icons.iconHorizal,
      text: 'horizontal',
    },
    {
      layout: Constants.Layout.advance,
      image: Images.icons.iconAdvance,
      text: 'advanceView',
    },
  ],

  // weDevs
  popularCat: [
    {
      Name: 'Dress',
      icon: Images.PopularCatImages.Dress,
      colorRGB: 'rgba(233, 79, 68, 0.05)',
    },
    {
      Name: 'Electronics',
      icon: Images.PopularCatImages.Electronics,
      colorRGB: 'rgba(247, 204, 83, 0.05)',
    },
    {
      Name: 'Computer',
      icon: Images.PopularCatImages.Computer,
      colorRGB: 'rgba(122, 212, 118, 0.05)',
    },
    {
      Name: 'Accessories',
      icon: Images.PopularCatImages.Accessories,
      colorRGB: 'rgba(74, 144, 226, 1)',
    },
    {
      Name: 'Clothing',
      icon: Images.PopularCatImages.Clothing,
      colorRGB: 'rgba(89, 94, 205, 0.05)',
    },
    {
      Name: 'Music',
      icon: Images.PopularCatImages.Music,
      colorRGB: 'rgba(26, 158, 212, 0.05)',
    },
    {
      Name: 'Poster',
      icon: Images.PopularCatImages.Poster,
      colorRGB: 'rgba(64, 85, 171, 0.05)',
    },
    {
      Name: 'Movies',
      icon: Images.PopularCatImages.Movies,
      colorRGB: 'rgba(230, 126, 34, 0.05)',
    },
    {
      Name: 'Furnitures',
      icon: Images.PopularCatImages.Furnitures,
      colorRGB: 'rgba(59, 128, 244, 0.05)',
    }
  ],
  featuredVendor: [
    {
      name: 'Glaze Concept',
      rating: 2,
      text: 'G',
      color: '#2ECC71'
    },
    {
      name: 'Tammi Gong',
      rating: 5,
      text: 'T',
      color: '#E9485E'
    },
    {
      name: 'Suma Fong',
      rating: 0,
      text: 'S',
      color: '#3B80F4'
    },
    {
      name: 'Abstract Shop',
      rating: 4,
      text: 'A',
      color: '#3B80F4'
    }
  ],
  BACON_IPSUM : 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ',
  productDetails : [
    {
      title: 'Description',
      // content: BACON_IPSUM,
      fromColor: "#00C6FB",
      toColor: "#005BEA",
    },
    {
      title: 'Shipping',
      // content: BACON_IPSUM,
      fromColor: "#C444FB",
      toColor: "#5B56D7"
    },
    {
      title: 'Customer Review',
      // content: BACON_IPSUM,
      fromColor: "#FF9472",
      toColor: "#F2709C"
    },
    {
      title: 'Vendor Info',
      // content: BACON_IPSUM,
      fromColor: "#7ED500",
      toColor: "#00BF8D"
    },
    {
      title: 'Related Products',
      // content: BACON_IPSUM,
      fromColor: "#6EACFF",
      toColor: "#907CFF"
    },
  ],
  sortingTexts: [
    "Sort by popularity",
    "Sort by average rating",
    "Sort by newness",
    "Sort by price high to low",
    "Sort by price low to high"
  ]
}
