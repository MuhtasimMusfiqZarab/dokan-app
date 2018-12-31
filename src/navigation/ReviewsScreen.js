/** @format */

import React, { PureComponent } from "react";
import { FlatList, View } from "react-native";
import { ReviewComment } from "@components";
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

	_renderReviews = (data) => ( <ReviewComment review={data.item} /> );

	render() {
		const { state } = this.props.navigation;
		const reviews = state.params.reviews;

		return (
			<View style={{
				flex: 1,
				backgroundColor: "#fff",
				justifyContent: "center",
				padding: 15
			}}>
				<FlatList
					data={reviews}
					keyExtractor={(item, index) => `r_${index}`}
					renderItem={this._renderReviews}
				/>
			</View>
		)
	}
}
