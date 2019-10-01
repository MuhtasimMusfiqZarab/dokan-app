/** @format */

import { Color, Images } from '@common';
import { TabBar, TabBarIcon } from '@components';
import React from 'react';
import { Dimensions, I18nManager } from 'react-native';
import {
	createAppContainer,
	createBottomTabNavigator,
	createStackNavigator,
	NavigationActions,
} from 'react-navigation';
import AboutUsScreen from './AboutUsScreen';
import AddressScreen from './AddressScreen';
import CartScreen from './CartScreen';
import CategoriesScreen from './CategoriesScreen';
import CategoryScreen from './CategoryScreen';
import ContactUsScreen from './ContactUsScreen';
import CustomPageScreen from './CustomPageScreen';
import DetailScreen from './DetailScreen';
import ForgetPasswordScreen from './ForgetPasswordScreen';
import HomeScreen from './HomeScreen';
import ListAllScreen from './ListAllScreen';
import LoginScreen from './LoginScreen';
import MyOrdersScreen from './MyOrdersScreen';
import NewsDetailScreen from './NewsDetailScreen';
import NewsScreen from './NewsScreen';
import OrderDetailsScreen from './OrderDetailsScreen';
import PrivacyPolicyScreen from './PrivacyPolicyScreen';
import ReviewsScreen from './ReviewsScreen';
import SearchScreen from './SearchScreen';
import SettingScreen from './SettingScreen';
import SignUpScreen from './SignUpScreen';
import TransitionConfig from './TransitionConfig';
import UserProfileEditScreen from './UserProfileEditScreen';
import UserProfileScreen from './UserProfileScreen';
import VendorProfileScreen from './VendorProfileScreen';
import VendorsScreen from './VendorsScreen';
import WishListScreen from './WishListScreen';

// useScreens();

const { width } = Dimensions.get('window');

const NewsStack = createStackNavigator(
	{
		News: { screen: NewsScreen },
		NewsDetailScreen: { screen: NewsDetailScreen },
	},
	{ cardStyle: { backgroundColor: Color.main } },
	{
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);

const CategoryStack = createStackNavigator(
	{
		CategoriesScreen: { screen: CategoriesScreen },
		CategoryScreen: { screen: CategoryScreen },
		DetailScreen: { screen: DetailScreen },
		VendorProfileScreen: { screen: VendorProfileScreen },
	},
	{ cardStyle: { backgroundColor: Color.main } },
	{
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);

const CategoryDetailStack = createStackNavigator(
	{
		CategoryScreen: { screen: CategoryScreen },
	},
	{ cardStyle: { backgroundColor: Color.main } },
	{
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);

const WishListStack = createStackNavigator(
	{
		WishListScreen: { screen: WishListScreen },
		DetailScreen: { screen: DetailScreen },
		VendorProfileScreen: { screen: VendorProfileScreen },
	},
	{ cardStyle: { backgroundColor: Color.main } },
	{
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);

const SearchStack = createStackNavigator(
	{
		Search: { screen: SearchScreen },
		DetailScreen: { screen: DetailScreen },
	},
	{ cardStyle: { backgroundColor: Color.main } },
	{
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);

const HomeStack = createStackNavigator(
	{
		Home: { screen: HomeScreen },
		ListAllScreen: { screen: ListAllScreen },
		DetailScreen: { screen: DetailScreen },
		VendorProfileScreen: { screen: VendorProfileScreen },
		CategoryScreen: { screen: CategoryScreen },
		ReviewsScreen: { screen: ReviewsScreen },
	},
	{ cardStyle: { backgroundColor: Color.main } },
	{
		navigationOptions: {
			gestureResponseDistance: { horizontal: width / 2 },
			gesturesEnabled: false,
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);

const CartScreenStack = createStackNavigator(
	{
		Cart: { screen: CartScreen },
		DetailScreen: { screen: DetailScreen },
		VendorProfileScreen: { screen: VendorProfileScreen },
		Address: { screen: AddressScreen },
	},
	{ cardStyle: { backgroundColor: Color.main } },
	{
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);

const UserProfileStack = createStackNavigator(
	{
		UserProfile: { screen: UserProfileScreen },
		UserProfileEdit: { screen: UserProfileEditScreen },
		Login: { screen: LoginScreen },
		Address: { screen: AddressScreen },
	},
	{ cardStyle: { backgroundColor: Color.main } },
	{
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);

const LoginStack = createStackNavigator(
	{
		LoginScreen: { screen: LoginScreen },
		SignUpScreen: { screen: SignUpScreen },
		ForgetPasswordScreen: { screen: ForgetPasswordScreen },
	},
	{ cardStyle: { backgroundColor: Color.main } },
	{
		mode: 'modal',
		header: null,
		transitionConfig: () => TransitionConfig,
	}
);

// New StackNavigators by weDevs
const VendorsStack = createStackNavigator(
	{
		VendorsScreen: { screen: VendorsScreen },
		VendorProfileScreen: { screen: VendorProfileScreen },
	},
	{ cardStyle: { backgroundColor: Color.main } },
	{
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);
const MyOrdersStack = createStackNavigator(
	{
		MyOrders: { screen: MyOrdersScreen },
		OrderDetail: { screen: OrderDetailsScreen },
	},
	{ cardStyle: { backgroundColor: Color.main } },
	{
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);
const VendorProfileStack = createStackNavigator(
	{
		VendorProfile: { screen: VendorProfileScreen },
	},
	{ cardStyle: { backgroundColor: Color.main } },
	{
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);
const ContactUsStack = createStackNavigator(
	{
		ContactUs: { screen: ContactUsScreen },
	},
	{ cardStyle: { backgroundColor: Color.main } },
	{
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);
const AboutUsStack = createStackNavigator(
	{
		AboutUs: { screen: AboutUsScreen },
	},
	{ cardStyle: { backgroundColor: Color.main } },
	{
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);
const PrivacyPolicyStack = createStackNavigator(
	{
		PrivacyPolicy: { screen: PrivacyPolicyScreen },
	},
	{ cardStyle: { backgroundColor: Color.main } },
	{
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);
// End

// Hide bottom navigator by weDevs
const hiddenBottomNavStack = [CartScreenStack, SearchStack, LoginStack];
hiddenBottomNavStack.map(item => {
	item.navigationOptions = ({ navigation }) => {
		let navigationOptions = {};

		navigationOptions.tabBarVisible = false;

		return navigationOptions;
	};
});
HomeStack.navigationOptions = ({ navigation }) => {
	let { routeName } = navigation.state.routes[navigation.state.index];
	let navigationOptions = {};

	if (routeName === 'DetailScreen' || routeName === 'CategoryScreen') {
		navigationOptions.tabBarVisible = false;
	}

	return navigationOptions;
};
CategoryStack.navigationOptions = ({ navigation }) => {
	let { routeName } = navigation.state.routes[navigation.state.index];
	let navigationOptions = {};

	if (routeName === 'DetailScreen' || routeName === 'CategoryScreen') {
		navigationOptions.tabBarVisible = false;
	}

	return navigationOptions;
};
// End

const AppNavigator = createBottomTabNavigator(
	{
		Default: {
			screen: HomeStack,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<TabBarIcon icon={Images.IconHome} tintColor={tintColor} />
				),
			},
		},
		CategoriesScreen: {
			screen: CategoryStack,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<TabBarIcon
						css={{ width: 18, height: 18 }}
						icon={Images.IconCategory}
						tintColor={tintColor}
					/>
				),
			},
		},
		Search: {
			screen: SearchStack,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<TabBarIcon
						css={{ width: 18, height: 18 }}
						icon={Images.IconSearch}
						tintColor={tintColor}
					/>
				),
			},
		},
		CartScreen: {
			screen: CartScreenStack,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<TabBarIcon
						cartIcon
						css={{ width: 20, height: 20 }}
						icon={Images.IconCart}
						tintColor={tintColor}
					/>
				),
			},
		},
		WishListScreen: {
			screen: WishListStack,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<TabBarIcon
						wishlistIcon
						css={{ width: 18, height: 18 }}
						icon={Images.IconHeart}
						tintColor={tintColor}
					/>
				),
			},
		},
		UserProfileScreen: {
			screen: UserProfileStack,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<TabBarIcon
						wishlistIcon
						css={{ width: 18, height: 18 }}
						icon={Images.IconUser}
						tintColor={tintColor}
					/>
				),
			},
		},
		MyOrders: {
			screen: MyOrdersStack,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<TabBarIcon
						orderIcon
						css={{ width: 18, height: 18 }}
						icon={Images.IconOrder}
						tintColor={tintColor}
					/>
				),
			},
		},
		NewsScreen: { screen: NewsStack },
		SettingScreen: { screen: SettingScreen },
		LoginStack: { screen: LoginStack },
		CustomPage: { screen: CustomPageScreen },
		CategoryDetail: { screen: CategoryDetailStack },
		VendorsScreen: {
			screen: VendorsStack,
		},
		VendorProfileScreen: {
			screen: VendorProfileStack,
		},
		ContactUs: { screen: ContactUsStack },
		AboutUs: { screen: AboutUsStack },
		PrivacyPolicy: { screen: PrivacyPolicyStack },
	},
	{
		tabBarComponent: TabBar,
		tabBarPosition: 'bottom',
		swipeEnabled: false,
		animationEnabled: false,
		tabBarOptions: {
			showIcon: true,
			showLabel: true,
			activeTintColor: '#F2709C',
			inactiveTintColor: '#A0A9BD',
			activeBackgroundColor: 'rgba(246, 98, 77, 0.1)',
		},
		lazy: true,
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);

export default createAppContainer(AppNavigator);

/**
 * prevent duplicate screen
 */
const navigateOnce = getStateForAction => (action, state) => {
	const { type, routeName } = action;
	return state &&
		type === NavigationActions.NAVIGATE &&
		routeName === state.routes[state.routes.length - 1].routeName &&
		routeName !== 'DetailScreen'
		? null
		: getStateForAction(action, state);
};

/**
 * Add AppNavigator to navigateOnce bug naivgate drawer category
 */
// AppNavigator.router.getStateForAction = navigateOnce(
// AppNavigator.router.getStateForAction
// );
NewsStack.router.getStateForAction = navigateOnce(
	NewsStack.router.getStateForAction
);
CategoryStack.router.getStateForAction = navigateOnce(
	CategoryStack.router.getStateForAction
);
CategoryDetailStack.router.getStateForAction = navigateOnce(
	CategoryDetailStack.router.getStateForAction
);
WishListStack.router.getStateForAction = navigateOnce(
	WishListStack.router.getStateForAction
);
HomeStack.router.getStateForAction = navigateOnce(
	HomeStack.router.getStateForAction
);
SearchStack.router.getStateForAction = navigateOnce(
	SearchStack.router.getStateForAction
);
CartScreenStack.router.getStateForAction = navigateOnce(
	CartScreenStack.router.getStateForAction
);
