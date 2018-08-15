/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Color, Styles, Images } from "@common";
import { SafeAreaView } from "@components";
import { Detail } from "@containers";
import { Back, CartWishListIcons } from "./wdIconNav";

export default class DetailScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerLeft: Back(navigation, Images.icons.backs, "Product Details"),
    headerRight: CartWishListIcons(navigation),

    // headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.prodDetailstoolbar,
    headerTitleStyle: Styles.Common.prodDetailsHeaderTitleStyle,
  });

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    const { state, navigate } = this.props.navigation;

    return (
      <SafeAreaView isSafeAreaBottom>
        <View style={{ flex: 1 }}>
          {typeof state.params !== "undefined" && (
            <Detail
              product={state.params.product}
              onViewCart={() => navigate("CartScreen")}
              onViewProductScreen={(product) =>
                navigate("DetailScreenMore", product)
              }
              navigation={this.props.navigation}
              onLogin={() => navigate("LoginScreen")}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}
