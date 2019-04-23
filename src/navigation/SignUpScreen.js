/** @format */

import React, { Component } from 'react';
import { SignUp } from '@containers';
import { Color, Languages, Styles, Images } from '@common';
import { Back, EmptyView } from './IconNav';

export default class SignUpScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		// title: Languages.signup,
		// headerLeft: Back(navigation, Images.icons.arrowBack),
		// headerRight: EmptyView(),
		// headerTintColor: Color.headerTintColor,
		// headerStyle: Styles.Common.toolbar,
		// headerLeftContainerStyle: Styles.Common.toolbarLeft,
		// headerRightContainerStyle: Styles.Common.toolbarRight,
		// headerTitleStyle: Styles.Common.headerTitleStyle,
		header: null,
	});

	render() {
		const { state, navigate, goBack } = this.props.navigation;
		return (
			<SignUp
				goBack={goBack}
				params={state.params}
				onBackCart={() => navigate('Cart')}
				onLoginScreen={() => navigate('LoginScreen')}
				onViewHomeScreen={() => navigate('Default')}
			/>
		);
	}
}
