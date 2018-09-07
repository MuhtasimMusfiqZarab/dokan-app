/** @format */

import React, { PureComponent } from "react";
import { Logo, Menu } from "./IconNav";
import { Color, Constants, Images, Config, Styles } from "@common";
import { UserProfile } from "@containers";
import { warn } from "@app/Omni";

export default class UserProfileScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "My Account",
    headerLeft: Menu(),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    const { navigation } = this.props;

    return <UserProfile navigation={navigation} />;
  }
}
