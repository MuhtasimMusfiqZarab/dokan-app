/** @format */

import { Images } from '@common';
import { Login } from '@containers';
import React, { PureComponent } from 'react';
import { Back, EmptyView } from './IconNav';

export default class LoginScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: Back(navigation, Images.icons.arrowBack),
		headerRight: EmptyView(),
		// headerTitle: 'Login',
		header: null,

		// headerTintColor: Color.headerTintColor,
		// headerStyle: Styles.Common.toolbarTransparent,
		// headerLeftContainerStyle: Styles.Common.toolbarLeft,
		// headerRightContainerStyle: Styles.Common.toolbarRight,
		// headerTitleStyle: Styles.Common.headerTitleStyle,
	});

	render() {
		const { navigate, state, goBack } = this.props.navigation;
		const isLogout = state.params ? state.params.isLogout : false;
		const calledFrom = state.params ? state.params.from : null;

		console.log(`loginScreen calledFrom: ${calledFrom}`);

		return (
			<Login
				statusBar
				navigation={this.props.navigation}
				onBack={goBack}
				isLogout={isLogout}
				calledFrom={calledFrom}
				onViewSignUp={user => navigate('SignUpScreen', user)}
				onViewCartScreen={() => navigate('CartScreen')}
				onViewHomeScreen={() => navigate('Default')}
				onForgetPassword={() => navigate('ForgetPasswordScreen')}
			/>
		);
	}
}
