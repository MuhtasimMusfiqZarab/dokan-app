/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Color, Styles } from '@common';
import { Home } from '@containers';
import { Menu, CartWishListIcons } from './IconNav';

export default class HomeScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: 'Home',
		headerLeft: Menu(),
		headerRight: CartWishListIcons(navigation),

		headerTintColor: Color.headerTintColor,
		headerStyle: Styles.Common.toolbar,
		headerLeftContainerStyle: Styles.Common.toolbarLeft,
		headerRightContainerStyle: Styles.Common.toolbarRight,
		headerTitleStyle: Styles.Common.headerTitleStyle,
	});

	static propTypes = {
		navigation: PropTypes.object.isRequired,
	};

	render() {
		const { navigate } = this.props.navigation;

		return (
			<Home
				onShowAll={(config, index) =>
					navigate('ListAllScreen', { config, index })
				}
				onViewProductScreen={item => {
					navigate('DetailScreen', item);
				}}
				onViewVendorProfileScreen={item => {
					navigate('VendorProfileScreen', item);
				}}
				onViewCategory={item => {
					navigate('CategoryScreen', item);
				}}
				navigation={this.props.navigation}
			/>
		);
	}
}
