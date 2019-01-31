/** @format */

import React, { PureComponent } from 'react';
import { Menu, EmptyView } from './IconNav';
import { Color, Styles } from '@common';
import { UserProfile } from '@containers';

export default class UserProfileScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: 'My Account',
		headerLeft: Menu(),
		headerRight: EmptyView(),

		headerTintColor: Color.headerTintColor,
		headerStyle: Styles.Common.toolbar,
		headerTitleStyle: Styles.Common.headerTitleStyle,
	});

	render() {
		const { navigation } = this.props;

		return <UserProfile navigation={navigation} />;
	}
}
