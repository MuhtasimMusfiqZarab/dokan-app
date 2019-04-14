/** @format */

import React, { PureComponent } from 'react';
import { HeaderRight, Back } from './IconNav';
import { Color, Styles, Images } from '@common';
import { Address } from '@containers';

export default class AddressScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		// headerTitle: 'My Shopping',
		// headerLeft: Back(navigation, Images.icons.arrowBack),
		// headerRight: HeaderRight(navigation),

		// headerTintColor: Color.headerTintColor,
		// headerStyle: Styles.Common.toolbar,
		// headerLeftContainerStyle: Styles.Common.toolbarLeft,
		// headerRightContainerStyle: Styles.Common.toolbarRight,
		// headerTitleStyle: Styles.Common.headerTitleStyle,
		header: null,
	});

	render() {
		const { navigate, state } = this.props.navigation;
		const fromScreen = state.params.from;

		return (
			<Address
				onMustLogin={() => {
					navigate('LoginScreen', { onCart: true });
				}}
				onBack={() => navigate('Default')}
				onFinishOrder={() => navigate('MyOrders')}
				onViewHome={() => navigate('Default')}
				onViewProduct={product => navigate('Detail', product)}
				navigation={this.props.navigation}
				fromScreen={fromScreen}
			/>
		);
	}
}
