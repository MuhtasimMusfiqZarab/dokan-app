/** @format */

import React, { PureComponent } from "react";
import { Back, HeaderRight } from "./IconNav";
import { Text } from "react-native"
import { Color, Constants, Images, Config, Styles } from "@common";
import { warn } from "@app/Omni";

export default class VendorProfileScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: Back(navigation, Images.icons.arrowBack),
        headerRight: HeaderRight(navigation),
    
        headerTintColor: Color.headerTintColor,
        headerStyle: Styles.Common.toolbar,
        headerTitleStyle: Styles.Common.headerTitleStyle,
    });

  render() {
    const { navigation } = this.props;

    return (<Text>Vendor Profile</Text>);
  }
}
