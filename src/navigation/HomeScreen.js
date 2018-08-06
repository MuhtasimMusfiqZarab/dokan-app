/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Color, Styles } from "@common";
import { Home } from "@containers";
import { Logo, Menu, HeaderHomeRight } from "./IconNav";

export default class HomeScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: Logo(),
    headerLeft: Menu(),
    headerRight: HeaderHomeRight(navigation),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerStyle,
  });

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Home
        onShowAll={(config, index) =>
          navigate("ListAllScreen", { config, index })
        }
        onViewProductScreen={(item) => {
          this.props.navigation.tabBarVisible = false;
          navigate("DetailScreen", item);
        }}
      />
    );
  }
}
