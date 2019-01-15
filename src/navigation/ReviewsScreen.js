/** @format */

import React, { PureComponent } from "react";
import { Reviews } from "@containers";
import { Back, EmptyView } from "./IconNav";
import { Color, Styles, Images } from "@common";
import { warn } from "@app/Omni";

export default class ReviewsScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: "All Reviews",
		headerLeft: Back(navigation, Images.icons.arrowBack),
		headerRight: EmptyView(),

		headerTintColor: Color.headerTintColor,
		headerStyle: Styles.Common.toolbar,
		headerTitleStyle: Styles.Common.headerTitleStyle,
	});

	render() {
		const { state } = this.props.navigation;
		const productID = state.params.productID;

		return ( <Reviews productID={productID} />);
	}
}
