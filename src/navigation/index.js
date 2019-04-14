/** @format */

import React from 'react';
import { Images } from '@common';
import { TabBar, TabBarIcon } from '@components';
import {
	View,
	Dimensions,
	I18nManager,
	StyleSheet,
	Animated,
} from 'react-native';
import {
	createStackNavigator,
	createBottomTabNavigator,
	NavigationActions,
} from 'react-navigation';
import { TabViewPagerPan } from 'react-native-tab-view';
import HomeScreen from './HomeScreen';
import NewsScreen from './NewsScreen';
import NewsDetailScreen from './NewsDetailScreen';
import CategoriesScreen from './CategoriesScreen';
import CategoryScreen from './CategoryScreen';
import DetailScreen from './DetailScreen';
import CartScreen from './CartScreen';
import MyOrdersScreen from './MyOrdersScreen';
import WishListScreen from './WishListScreen';
import SearchScreen from './SearchScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import CustomPageScreen from './CustomPageScreen';
import ListAllScreen from './ListAllScreen';
import SettingScreen from './SettingScreen';
import UserProfileScreen from './UserProfileScreen';
import UserProfileEditScreen from './UserProfileEditScreen';
import VendorsScreen from './VendorsScreen';
import VendorProfileScreen from './VendorProfileScreen';
import ContactUsScreen from './ContactUsScreen';
import AboutUsScreen from './AboutUsScreen';
import PrivacyPolicyScreen from './PrivacyPolicyScreen';
import ReviewsScreen from './ReviewsScreen';
import ForgetPasswordScreen from './ForgetPasswordScreen';
import OrderDetailsScreen from './OrderDetailsScreen';
import TransitionConfig from './TransitionConfig';
import AddressScreen from './AddressScreen';

const { width } = Dimensions.get('window');

const NewsStack = createStackNavigator(
	{
		News: { screen: NewsScreen },
		NewsDetailScreen: { screen: NewsDetailScreen },
	},
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
		DetailScreen: {
			screen: DetailScreen,
			navigationOptions: { tabBarVisible: false },
		},
	},
	{
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);

const CategoryDetailStack = createStackNavigator(
	{
		CategoryScreen: { screen: CategoryScreen },
		DetailScreen: {
			screen: DetailScreen,
			navigationOptions: { tabBarVisible: false },
		},
	},
	{
		navigationOptions: {
			gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
		},
	}
);

const WishListStack = createStackNavigator(
	{
		WishListScreen: { screen: WishListScreen },
		Detail: { screen: DetailScreen },
	},
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
		Detail: { screen: DetailScreen },
		Address: { screen: AddressScreen },
	},
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
	},
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
		// SignUpScreen: { screen: SignUpScreen },
		CustomPage: { screen: CustomPageScreen },
		Detail: {
			screen: DetailScreen,
			navigationOptions: {
				tabBarVisible: false,
				gestureDirection: I18nManager.isRTL ? 'inverted' : 'default',
			},
		},
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

export default AppNavigator;

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

/**
 * FIX RTL react-navigation tab do not show
 */
TabViewPagerPan.prototype.render = function render() {
	const { panX, offsetX, navigationState, layout, children } = this.props;
	const { width } = layout;
	const { routes } = navigationState;
	const maxTranslate = width * (routes.length - 1);
	let translateX;
	if (I18nManager.isRTL) {
		// <------- HACK ---------
		translateX = Animated.multiply(Animated.add(panX, offsetX), -1).interpolate(
			{
				inputRange: [0, maxTranslate],
				outputRange: [0, maxTranslate],
				extrapolate: 'clamp',
			}
		);
		// ---------------------->
	} else {
		translateX = Animated.add(panX, offsetX).interpolate({
			inputRange: [-maxTranslate, 0],
			outputRange: [-maxTranslate, 0],
			extrapolate: 'clamp',
		});
	}

	return (
		<Animated.View
			style={[
				styles.sheet,
				width
					? {
							width: routes.length * width,
							transform: [{ translateX }],
					  }
					: null,
			]}
			{...this._panResponder.panHandlers}>
			{React.Children.map(children, (child, i) => (
				<View
					key={navigationState.routes[i].key}
					testID={navigationState.routes[i].testID}
					style={
						width
							? { width }
							: i === navigationState.index
							? StyleSheet.absoluteFill
							: null
					}>
					{i === navigationState.index || width ? child : null}
				</View>
			))}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	sheet: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch',
	},
});
