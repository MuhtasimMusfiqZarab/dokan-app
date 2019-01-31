/** @format */

import React, { PureComponent } from 'react';
import { Login } from '@containers';
import { Color, Styles, Images } from '@common';
import { Back, EmptyView } from './IconNav';

export default class LoginScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: Back(navigation, Images.icons.arrowBack),
		headerRight: EmptyView(),
		headerTitle: 'Login',

		headerTintColor: Color.headerTintColor,
		headerStyle: Styles.Common.toolbar,
		headerLeftContainerStyle: Styles.Common.toolbarLeft,
		headerRightContainerStyle: Styles.Common.toolbarRight,
		headerTitleStyle: Styles.Common.headerTitleStyle,
	});

	render() {
		const { navigate, state, goBack } = this.props.navigation;
		const isLogout = state.params ? state.params.isLogout : false;

		return (
			<Login
				statusBar
				navigation={this.props.navigation}
				onBack={goBack}
				isLogout={isLogout}
				onViewSignUp={user => navigate('SignUpScreen', user)}
				onViewCartScreen={() => navigate('CartScreen')}
				onViewHomeScreen={() => navigate('Default')}
				onForgetPassword={() => navigate('ForgetPasswordScreen')}
			/>
		);
	}
}
