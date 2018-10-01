/** @format */

import React from "react";
import { Color, Images } from "@common";
import { TabBar, TabBarIcon } from "@components";
import {
  View,
  Dimensions,
  I18nManager,
  StyleSheet,
  Animated,
} from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions,
} from "react-navigation";
import { TabViewPagerPan } from "react-native-tab-view";
import HomeScreen from "./wdHomeScreen";
import NewsScreen from "./NewsScreen";
import NewsDetailScreen from "./NewsDetailScreen";
import CategoriesScreen from "./wdCategoriesScreen";
import CategoryScreen from "./wdCategoryScreen";
import DetailScreen from "./wdDetailScreen";
import CartScreen from "./wdCartScreen";
import MyOrdersScreen from "./MyOrdersScreen";
import WishListScreen from "./WishListScreen";
import SearchScreen from "./SearchScreen";
import LoginScreen from "./wdLoginScreen";
import SignUpScreen from "./SignUpScreen";
import CustomPageScreen from "./CustomPageScreen";
import ListAllScreen from "./wdListAllScreen";
import SettingScreen from "./SettingScreen";
import UserProfileScreen from "./wdUserProfileScreen";
import ContactUsScreen from "./wdContactUsScreen";
import AboutUsScreen from "./wdAboutUsScreen";
import PrivacyPolicyScreen from "./wdPrivacyPolicyScreen";

import TransitionConfig from "./TransitionConfig";

const { width } = Dimensions.get("window");

const NewsStack = createStackNavigator(
  {
    News: { screen: NewsScreen },
    NewsDetailScreen: { screen: NewsDetailScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
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
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
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
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
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
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
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
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    ListAllScreen: { screen: ListAllScreen },
    DetailScreen: { screen: DetailScreen },
  },
  {
    navigationOptions: {
      gestureResponseDistance: { horizontal: width / 2 },
      gesturesEnabled: true,
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const CartScreenStack = createStackNavigator(
  {
    Cart: { screen: CartScreen },
    Detail: { screen: DetailScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);
CartScreenStack.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  
  navigationOptions.tabBarVisible = false;
  
  return navigationOptions;
};

const UserProfileStack = createStackNavigator(
  {
    UserProfile: { screen: UserProfileScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const LoginStack = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    SignUpScreen: { screen: SignUpScreen },
  },
  {
    mode: "modal",
    header: null,
    transitionConfig: () => TransitionConfig,
  }
);

const ContactUsStack = createStackNavigator(
  {
    ContactUs: { screen: ContactUsScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const AboutUsStack = createStackNavigator(
  {
    AboutUs: { screen: AboutUsScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const PrivacyPolicyStack = createStackNavigator(
  {
    PrivacyPolicy: { screen: PrivacyPolicyScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

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
    MyOrders: { screen: MyOrdersScreen },
    NewsScreen: { screen: NewsStack },
    SettingScreen: { screen: SettingScreen },
    LoginStack: { screen: LoginStack },
    // SignUpScreen: { screen: SignUpScreen },
    CustomPage: { screen: CustomPageScreen },
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
        tabBarVisible: false,
        gestureDirection: I18nManager.isRTL ? "inverted" : "default",
      },
    },
    CategoryDetail: { screen: CategoryDetailStack },
    ContactUs: { screen: ContactUsStack }, 
    AboutUs: { screen: AboutUsStack },
    PrivacyPolicy: { screen: PrivacyPolicyStack }
  },
  {
    tabBarComponent: TabBar,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor: Color.tabbarTint,
      inactiveTintColor: Color.tabbarColor,
    },
    lazy: true,
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

export default AppNavigator;

/**
 * prevent duplicate screen
 */
const navigateOnce = (getStateForAction) => (action, state) => {
  const { type, routeName } = action;
  return state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
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
        extrapolate: "clamp",
      }
    );
    // ---------------------->
  } else {
    translateX = Animated.add(panX, offsetX).interpolate({
      inputRange: [-maxTranslate, 0],
      outputRange: [-maxTranslate, 0],
      extrapolate: "clamp",
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
    flexDirection: "row",
    alignItems: "stretch",
  },
});
