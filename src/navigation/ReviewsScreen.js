/** @format */

import React, { PureComponent } from 'react';
import { Reviews } from '@containers';
import { Back, EmptyView } from './IconNav';
import { Color, Styles, Images } from '@common';

export default class ReviewsScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: 'All Reviews',
		headerLeft: Back(navigation, Images.icons.arrowBack),
		headerRight: EmptyView(),

		headerTintColor: Color.headerTintColor,
		headerStyle: Styles.Common.toolbar,
		headerTitleStyle: Styles.Common.headerTitleStyle,
	});

	render() {
		const { state } = this.props.navigation;
		const { productID, vendorID } = state.params;

		if (productID !== undefined) {
			return <Reviews productID={productID} />;
		} else {
			return <Reviews vendorID={vendorID} />;
		}
	}
}
