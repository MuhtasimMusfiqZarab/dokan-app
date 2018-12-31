/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Images, Color, Styles } from "@common";
import { Back, HeaderRight } from "./IconNav";
import { MyOrders } from "@containers";

export default class MyOrdersScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: "My Orders",
		headerLeft: Back(navigation, Images.icons.arrowBack),
		headerRight: HeaderRight(navigation),

		headerTintColor: Color.headerTintColor,
		headerStyle: Styles.Common.toolbar,
		headerLeftContainerStyle: Styles.Common.toolbarLeft,
		headerRightContainerStyle: Styles.Common.toolbarRight,
		headerTitleStyle: Styles.Common.headerTitleStyle,
	});

	static propTypes = {
		navigation: PropTypes.object,
	};

	render() {
		const { navigate } = this.props.navigation;
		return (
			<MyOrders
				navigate={this.props.navigation}
				onViewHomeScreen={() => navigate("Default")}
			/>
		);
	}
}