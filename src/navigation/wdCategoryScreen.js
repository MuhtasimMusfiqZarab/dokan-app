/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Color, Images, Styles } from "@common";
import { TabBarIcon } from "@components";
import { Category } from "@containers";
import { Logo, Back, EmptyView, CartWishListIcons } from "./IconNav";

export default class CategoryScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: `${navigation.state.params.mainCategory.name}`,
      headerLeft: Back(navigation),
      // headerLeft: EmptyView(),
      headerRight: CartWishListIcons(navigation),
      tabBarIcon: ({ tintColor }) => (
        <TabBarIcon
          css={{ width: 18, height: 18 }}
          icon={Images.IconCategory}
          tintColor={tintColor}
        />
      ),

      headerTintColor: Color.headerTintColor,
      headerStyle: Styles.Common.toolbar,
      headerTitleStyle: Styles.Common.headerTitleStyle,
      tabBarVisible: false
    }
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    const { navigate, } = this.props.navigation;
    return (
      <Category
        onViewProductScreen={(item) => {
          navigate("DetailScreen", item);
        }}
      />
    );
  }
}