/** @format */

import React, { PureComponent } from 'react';
import { Back, HeaderRight } from './IconNav';
import { Color, Images, Styles } from '@common';
import { VendorProfile } from '@containers';

export default class VendorProfileScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: Back(navigation, Images.icons.arrowBack),
		headerRight: HeaderRight(navigation),

		headerTintColor: Color.headerTintColor,
		headerStyle: Styles.Common.toolbar,
		headerLeftContainerStyle: Styles.Common.toolbarLeft,
		headerRightContainerStyle: Styles.Common.toolbarRight,
		headerTitleStyle: Styles.Common.headerTitleStyle,
	});

	render() {
		const { state } = this.props.navigation;

		return (
			<VendorProfile vendor={state.params} navigation={this.props.navigation} />
		);
	}
}
