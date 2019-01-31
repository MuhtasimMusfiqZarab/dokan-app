/** @format */

import React, { PureComponent } from 'react';
import { Back, CartWishListIcons } from './IconNav';

import { Color, Images, Styles } from '@common';
import { Vendors } from '@containers';

export default class CategoriesScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: 'Store List',
		headerLeft: Back(navigation, Images.icons.arrowBack),
		headerRight: CartWishListIcons(navigation),

		headerTintColor: Color.headerTintColor,
		headerStyle: Styles.Common.toolbar,
		headerTitleStyle: Styles.Common.headerTitleStyle,
	});

	render() {
		const { navigate } = this.props.navigation;

		return (
			<Vendors
				onViewVendorScreen={item => navigate('VendorProfileScreen', item)}
				page={1}
				showToolBar={true}
			/>
		);
	}
}
