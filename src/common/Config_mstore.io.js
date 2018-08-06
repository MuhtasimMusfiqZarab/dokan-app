/** @format */

import Images from "./Images";
import Constants from "./Constants";

export default {
  /**
     Step 1: change to your website URL and the wooCommerce API consumeKey
     */
  WooCommerce: {
    url: "http://mstore.io",
    consumerKey: "ck_b7594bc4391db4b56c635fe6da1072a53ca4535a",
    consumerSecret: "cs_980b9edb120e15bd2a8b668cacc734f7eca0ba40",
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
  HorizonLayout: [
    { tag: 273, paging: true, layout: Constants.Layout.miniBanner },
    {
      name: "Feature Products",
      category: 21,
      image: Images.Banner.Feature,
      layout: Constants.Layout.threeColumn,
    },
    {
      name: "Bags Collections",
      category: 23,
      image: Images.Banner.Bag,
      layout: Constants.Layout.twoColumn,
    },
    {
      name: "Woman Best seller",
      category: 22,
      image: Images.Banner.Woman,
      layout: Constants.Layout.twoColumnHigh,
    },
    {
      name: "Man Collections",
      category: 18,
      image: Images.Banner.Man,
      layout: Constants.Layout.card,
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
    bacs: require("@images/payment_logo/PayPal.png"),
    cod: require("@images/payment_logo/cash_on_delivery.png"),
    paypal: require("@images/payment_logo/PayPal.png"),
    stripe: require("@images/payment_logo/stripe.png"),
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
     * */
  shipping: {
    visible: true,
    time: {
      free_shipping: "4 - 7 Days",
      flat_rate: "1 - 4 Days",
      local_pickup: "1 - 4 Days",
    },
  },
  showStatusBar: false,
  LogoImage: require("@images/new_logo.png"),
  LogoWithText: require("@images/logo_with_text.png"),
  LogoLoading: require("@images/logo.png"),

  showAdmobAds: true,
  AdMob: {
    deviceID: "pub-2101182411274198",
    unitID: "ca-app-pub-2101182411274198/4100506392",
    unitInterstitial: "ca-app-pub-2101182411274198/8930161243",
    isShowInterstital: true,
  },
  appFacebookId: "422035778152242",
  CustomPages: { contact_id: 10941 },
  WebPages: { marketing: "http://inspireui.com" },
  intro: [
    {
      key: "page1",
      title: "Lorem Ipsum Dolor Sit Ame",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: "ios-basket-outline",
      colors: ["#0FF0B3", "#036ED9"],
    },
    {
      key: "page2",
      title: "Consectetur Adipisicing Elit Sed Do Eiusmod",
      text:
        "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
      icon: "ios-card-outline",
      colors: ["#13f1fc", "#0470dc"],
    },
    {
      key: "page3",
      title: "Adipisicing Elit Sed Do",
      text: "Usage Consectetur adipisicing elit, sed do eiusmod",
      icon: "ios-finger-print-outline",
      colors: ["#b1ea4d", "#459522"],
    },
  ],
};
