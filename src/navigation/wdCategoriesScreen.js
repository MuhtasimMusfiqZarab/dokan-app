/** @format */

import React, { PureComponent } from "react";
import { Logo, Menu, EmptyView, CartWishListIcons } from "./IconNav";

import { Color, Config, Constants, Images, Styles } from "@common";
import { TabBarIcon } from "@components";
import { Categories } from "@containers";

export default class CategoriesScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "All Categories",
    headerLeft: Menu(),
    headerRight: CartWishListIcons(navigation),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Categories
        onViewProductScreen={(item) => navigate("DetailScreen", item)}
        onViewCategory={(item) => {
          navigate("CategoryScreen", item);
        }}
      />
    );
  }
}
