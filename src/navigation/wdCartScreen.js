/** @format */

import React, { PureComponent } from "react";
import { Menu, HeaderRight } from "./IconNav";
import { Color, Styles } from "@common";
import { Cart } from "@containers";

export default class CartScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "My Shopping",
    headerLeft: Menu(),
    headerRight: HeaderRight(navigation),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Cart
        onMustLogin={() => {
          navigate("LoginScreen", { onCart: true });
        }}
        onBack={() => navigate("Default")}
        onFinishOrder={() => navigate("MyOrders")}
        onViewHome={() => navigate("Default")}
        onViewProduct={(product) => navigate("Detail", product)}
        navigation={this.props.navigation}
      />
    );
  }
}
