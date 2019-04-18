/** @format */

import React, { Component } from 'react';
// import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { Images, Color, Styles } from '@common';
import { OrderDetail } from '@containers';
import { Back, HeaderRight } from './IconNav';

export default class OrderDetailsScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Order Details',
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
		const { params } = this.props.navigation.state;

		return <OrderDetail navigate={navigate} orderDetail={params.orderDetail} />;
	}
}
