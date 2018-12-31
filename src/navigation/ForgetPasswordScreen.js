/** @format */

import React, { PureComponent } from "react";
import { ForgetPassword } from "@containers";
import { Color, Styles, Images } from "@common";
import { Back, EmptyView, Logo } from "./IconNav";

export default class LoginScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: Back(navigation, Images.icons.arrowBack),
		headerRight: EmptyView(),
		headerTitle: "Password Reset",

		headerTintColor: Color.headerTintColor,
		headerStyle: Styles.Common.toolbar,
		headerLeftContainerStyle: Styles.Common.toolbarLeft,
		headerRightContainerStyle: Styles.Common.toolbarRight,
		headerTitleStyle: Styles.Common.headerTitleStyle,
	});

	render() {
		const { navigate, state, goBack } = this.props.navigation;

		return (
			<ForgetPassword />
		);
	}
}
