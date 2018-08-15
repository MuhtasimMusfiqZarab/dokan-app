/** @format */

import React from "react";
import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import Device from "@common/Device";

import { Styles, Events, Images, Config } from "@common";
import { NavigationBarIcon, CartIcons } from "@components";
import { toggleDrawer } from "@app/Omni";

// Icons for HeaderBar
const Logo = () => (
  <Image source={Config.LogoImage} style={Styles.Common.logo} />
);

const hitSlop = { top: 20, right: 20, bottom: 20, left: 20 };
const Menu = () => (
  <TouchableOpacity hitSlop={hitSlop} onPress={toggleDrawer}>
    <Image
      source={Images.icons.home}
      style={[
        Styles.Common.toolbarIcon,
        I18nManager.isRTL && {
          transform: [{ rotate: "180deg" }],
        },
      ]}
    />
  </TouchableOpacity>
);

const EmptyView = () => (
  <View
    style={[
      Styles.Common.Row,
      I18nManager.isRTL ? { left: -10 } : { right: -5 },
      Platform.OS !== "ios" && { right: -12 },
    ]}
  />
);

const HeaderRight = (navigation) => (
  <View
    style={[
      Styles.Common.Row,
      I18nManager.isRTL ? { left: -10 } : { right: -5 },
      Platform.OS !== "ios" && { right: -12 },
    ]}>
    <NavigationBarIcon
      icon={Images.IconSearch}
      size={17}
      onPress={() => navigation.navigate("Search")}
    />
  </View>
);

const HeaderHomeRight = (navigation, item) => (
  <View
    style={[
      Styles.Common.Row,
      // I18nManager.isRTL ? { left: -10 } : { right: 5 },
      Platform.OS !== "ios" && { right: -12 },
    ]}>
    <NavigationBarIcon
      icon={Images.IconGrid}
      size={17}
      onPress={Events.openModalLayout}
    />
  </View>
);

const CartWishListIcons = (navigation) => <CartIcons navigation={navigation} />;

const Back = (navigation, iconBack, text) => (
  <TouchableOpacity
    hitSlop={hitSlop}
    style={[
      Styles.Common.Row,
      // I18nManager.isRTL ? { left: -10 } : { right: 5 },
      Platform.OS !== "ios" && { right: -12 },
    ]}>
    onPress={() => {
      navigation.goBack(null);
    }}>
    <Image
      source={iconBack || Images.icons.back}
      style={[
        Styles.Common.toolbarIcon,
        iconBack && Styles.Common.iconBack,
        I18nManager.isRTL && {
          transform: [{ rotate: "180deg" }],
        },
      ]}
    />
    { text ? 
      <Text
        style={
          {
            color: '#6D7684',
            fontSize: 16,
            fontWeight: 'bold',
            ...Platform.select({
              ios: {
                marginTop: Config.showStatusBar
                  ? Device.isIphoneX
                    ? -20
                    : 7
                  : Device.isIphoneX
                    ? -30
                    : -4,
              },
              android: {
                marginTop: 10,
              },
            })
          }
        }
      >
        {text}
      </Text>
      : null
    }
  </TouchableOpacity>
);

export {
  Logo,
  Menu,
  HeaderRight,
  EmptyView,
  CartWishListIcons,
  HeaderHomeRight,
  Back,
};
