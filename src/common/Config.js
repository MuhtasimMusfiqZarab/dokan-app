/** @format */

import Images from './Images';
import Constants from './Constants';
import Icons from './Icons';

export default {
	/**
		 Step 1: change to your website URL and the wooCommerce API consumerKey
		*/
	WooCommerce: {
		// url: 'http://ajaira.website/dokan-app',
		// consumerKey: 'ck_4f6b5c9dd7e44a22a2ab9d0e9685b42429879e1a',
		// consumerSecret: 'cs_8c8a7e181349b69ff32d21477ed94bcd832a8e26',

		url: 'http://mobileapp.getdokan.com',
		consumerKey: 'ck_e8cee3b732833e55c5a5e664a0a7de40eae05d28',
		consumerSecret: 'cs_0b5b64944e8c319d6751ffe9c132f91deb3aca2c',

		// url: 'http://dokan-mobile.test/',
		// consumerKey: 'ck_058d37798c6d4fde333cce1e24864340d6a78017',
		// consumerSecret: 'cs_6c3776e01ec312fcc2de6517edc76c139731469c',

		// url: 'https://tedhut.com/',
		// consumerKey: 'ck_288d122af9ac2a56977970fa404352a0ed32b6e6',
		// consumerSecret: 'cs_ef48540035466d888768e10cc3571214b20e2af3',
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
		// { tag: 355, paging: true, layout: Constants.Layout.miniBanner },
		// { tag: 604, paging: true, layout: Constants.Layout.miniBanner },
		// { tag: 25, paging: true, layout: Constants.Layout.miniBanner },
		{ tag: 25, puprpose: 'appBanner', layout: Constants.Layout.miniBanner },
		{
			purpose: 'atAglance',
			layout: Constants.Layout.atAglance,
			vendorListType: 'allVendors',
		},
		{
			name: 'featuredProducts',
			purpose: 'featuredProducts',
			// image: Images.Banner.Banner1,
			layout: Constants.Layout.threeColumn,
		},
		{
			purpose: 'newArrival',
			layout: Constants.Layout.newArrival,
		},
		{
			name: 'bestSellingProducts',
			purpose: 'bestSellingProducts',
			// image: Images.Banner.Banner3,
			layout: Constants.Layout.threeColumn,
		},
		{
			name: 'topRatedProducts',
			purpose: 'topRatedProducts',
			// image: Images.Banner.Banner2,
			layout: Constants.Layout.threeColumn,
		},
		{
			purpose: 'popularCategory',
			layout: Constants.Layout.popularCategory,
		},
		{
			name: 'featuredVendor',
			purpose: 'featuredVendor',
			layout: Constants.Layout.featuredVendor,
			vendorListType: 'featured',
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
		ppec_paypal: require('@images/payment_logo/PayPal.png'),
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
	WebPages: { marketing: 'http://wedevs.com' },
	CategoryListView: true,
	dokanModules: {},
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
				iconLeft: Icons.MaterialCommunityIcons.SignIn,
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
				iconLeft: Icons.MaterialCommunityIcons.SignOut,
			},
		],
		// Default List
		listMenu: [
			{
				index: 0,
				text: 'Categories',
				routeName: 'CategoriesScreen',
				params: {
					isActive: false,
				},
				iconLeft: Icons.MaterialCommunityIcons.GridMode,
			},
			{
				index: 1,
				text: 'Home',
				routeName: 'Default',
				params: {
					isActive: true,
				},
				iconLeft: Icons.MaterialCommunityIcons.Home,
			},
			{
				index: 2,
				text: 'WishList',
				routeName: 'WishListScreen',
				params: {
					isActive: false,
				},
				iconLeft: Icons.MaterialCommunityIcons.Wishlist,
			},
			{
				index: 3,
				text: 'My Order',
				routeName: 'MyOrders',
				params: {
					// id: 10941,
					// title: 'contactus',
					isActive: false,
				},
				iconLeft: Icons.MaterialCommunityIcons.Order,
			},
			// {
			// 	index: 4,
			// 	text: 'Currency',
			// 	routeName: 'CustomPage',
			// 	params: {
			// 		isActive: false
			// 	},
			// 	iconLeft: Icons.MaterialCommunityIcons.Currency,
			// },
			{
				index: 5,
				text: 'Languages',
				routeName: 'SettingScreen',
				params: {
					isActive: false,
				},
				iconLeft: Icons.MaterialCommunityIcons.Language,
			},
			// {
			// 	index: 6,
			// 	text: 'Push Notification',
			// 	params: {
			// 		isActive: false
			// 	},
			// 	iconLeft: Icons.MaterialCommunityIcons.Bell,
			// },
			// {
			// 	index: 4,
			// 	text: 'Contact Us',
			// 	routeName: 'ContactUs',
			// 	params: {
			// 		isActive: false,
			// 	},
			// 	iconLeft: Icons.MaterialCommunityIcons.Wechat,
			// },
			// {
			// 	index: 5,
			// 	text: 'Privacy Policies',
			// 	routeName: 'PrivacyPolicy',
			// 	params: {
			// 		isActive: false,
			// 	},
			// 	iconLeft: Icons.MaterialCommunityIcons.Lock,
			// },
			{
				index: 4,
				text: 'About Us',
				routeName: 'AboutUs',
				params: {
					// url: 'http://ajaira.website/dokan-app',
					isActive: false,
				},
				iconLeft: Icons.MaterialCommunityIcons.About,
			},
			// {
			// 	index: 5,
			// 	text: 'Settings',
			// 	routeName: 'SettingScreen',
			// 	params: {
			// 		isActive: false,
			// 	},
			// 	iconLeft: Icons.MaterialCommunityIcons.Setting,
			// },
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
	policies: [
		{
			heading: 'Heading 01',
			text:
				'Proactively e-enable best-of-breed communities before long-term high-impact niche markets. Assertively reinvent superior interfaces after global.',
		},
		{
			heading: 'Heading 02',
			text:
				'Intrinsicly communicate diverse expertise without enabled communities. Dramatically implement cross-unit opportunities through functionalized results. Holisticly innovate maintainable channels with exceptional.',
		},
		{
			heading: 'Heading 03',
			text:
				'Holisticly administrate user friendly products without sustainable architectures. Synergistically maximize parallel supply chains whereas performance based results. Dynamically expedite multimedia based leadership with superior e-commerce.',
		},
		{
			heading: 'Heading 04',
			text:
				'Completely myocardinate cooperative resources and fully researched systems. Monotonectally brand unique partnerships with maintainable platforms. Rapidiously embrace client-centric markets rather than innovative portals. Quickly seize interactive human capital vis-a-vis viral.',
		},
		{
			heading: 'Heading 05',
			text:
				'Intrinsicly communicate diverse expertise without enabled communities. Dramatically implement cross-unit opportunities through functionalized results. Holisticly innovate maintainable channels with exceptional.',
		},
	],
	sortingTexts: [
		// "Sort by popularity",
		'Sort by average rating',
		'Sort by newness',
		'Sort by price high to low',
		'Sort by price low to high',
	],
	// listItem: [
	// 	{
	// 		label: `${Languages.WishList  } (${  wishListTotal  })`,
	// 		routeName: "WishListScreen",
	// 	},
	// 	userProfile.user && {
	// 		label: Languages.MyOrder,
	// 		routeName: "MyOrders",
	// 	},
	// 	{
	// 		label: Languages.Currency,
	// 		value: currency.code,
	// 		isActionSheet: true,
	// 	},
	// 	{
	// 		label: Languages.Languages,
	// 		routeName: "SettingScreen",
	// 		value: Languages.LanguageName,
	// 	},
	// 	{
	// 		label: Languages.PushNotification,
	// 		icon: () => (
	// 			<Switch
	// 				onValueChange={this._handleSwitch}
	// 				value={this.state.pushNotification}
	// 				tintColor={Color.blackDivide}
	// 			/>
	// 		),
	// 	},
	// 	{
	// 		label: Languages.contactus,
	// 		routeName: "CustomPage",
	// 		params: {
	// 			id: 10941,
	// 			title: Languages.contactus,
	// 		},
	// 	},
	// 	{
	// 		label: Languages.Privacy,
	// 		routeName: "CustomPage",
	// 		params: {
	// 			id: 10941,
	// 			title: Languages.Privacy,
	// 		},
	// 	},
	// 	{
	// 		label: Languages.About,
	// 		routeName: "CustomPage",
	// 		params: {
	// 			url: "http://inspireui.com",
	// 		},
	// 	},
	// ]
};
