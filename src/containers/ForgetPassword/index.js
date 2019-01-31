/**
 * @format
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	ScrollView,
	Text,
	Image,
	ImageBackground,
	TextInput,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Color, Languages, Constants, Config, Images } from '@common';
import { toast } from '@app/Omni';
import { Spinner, Button } from '@components';
import WPUserAPI from '@services/WPUserAPI';
import styles from '../Login/styles';

class ForgetPassword extends PureComponent {
	static propTypes = {
		user: PropTypes.object,
		isLogout: PropTypes.bool,
		onViewCartScreen: PropTypes.func,
		onViewHomeScreen: PropTypes.func,
		onViewSignUp: PropTypes.func,
		logout: PropTypes.func,
		navigation: PropTypes.object,
		onBack: PropTypes.func,
		goBack: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			userLogin: '',
			isLoading: false,
			showResetForm: true,
		};

		this.onUserLoginEditHandle = userLogin => this.setState({ userLogin });
	}

	_onBack = () => {
		const { onBack, goBack } = this.props;
		if (onBack) {
			onBack();
		} else {
			goBack();
		}
	};

	onForgetPasswordPressHandle = async () => {
		const { netInfo } = this.props;
		const { userLogin } = this.state;

		if (!netInfo.isConnected) {
			return toast(Languages.noConnection);
		}

		if (!userLogin) {
			return toast('Type username or email');
		}

		this.setState({ isLoading: true });

		// login the customer via Wordpress API and get the access token
		const json = await WPUserAPI.forgetPassword(userLogin);

		if (json === undefined) {
			this.stopAndToast(Languages.GetDataError);
		} else if (json.code === 'no_user_found') {
			this.stopAndToast(json.message);
		} else {
			this.setState({
				isLoading: false,
				showResetForm: false,
			});
		}
	};

	checkConnection = () => {
		const { netInfo } = this.props;
		if (!netInfo.isConnected) toast(Languages.noConnection);
		return netInfo.isConnected;
	};

	stopAndToast = msg => {
		toast(msg);
		this.setState({ isLoading: false });
	};

	render() {
		const { isLoading, showResetForm } = this.state;
		return (
			<ImageBackground
				source={Images.LoginScreenBackground}
				style={styles.backgroundImage}
				resizeMode="cover">
				{showResetForm && (
					<ScrollView contentContainerStyle={styles.container}>
						<View style={styles.logoWrap}>
							<Image
								source={Config.LogoWithText}
								style={styles.logo}
								resizeMode="contain"
							/>
							<Text style={styles.logoText}>
								Build Your Dream Multi Vendor Market Place
							</Text>
						</View>
						<View style={styles.subContain}>
							<View style={styles.loginForm}>
								<View style={styles.inputWrap}>
									<Text style={styles.label}>
										Type in Your Username or Email
									</Text>
									<TextInput
										{...commonInputProps}
										style={styles.input}
										ref={comp => (this.userLogin = comp)}
										keyboardType="email-address"
										onChangeText={this.onUserLoginEditHandle}
										onSubmitEditing={this.onForgetPasswordPressHandle}
										returnKeyType="go"
									/>
								</View>
								<Button
									type="gradientBtn"
									text="Send"
									size="sm"
									alignSelf="flex-start"
									marginTop={15}
									onPress={this.onForgetPasswordPressHandle}
								/>
							</View>
						</View>
					</ScrollView>
				)}
				{!showResetForm && (
					<View
						style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<View style={styles.pwdResetInfo}>
							<Text
								style={{
									fontFamily: Constants.fontFamilyLato,
									color: Color.wdred1,
									fontSize: 18,
								}}>
								Reset Link Has been sent to your email
							</Text>
						</View>
					</View>
				)}
				{isLoading ? <Spinner mode="overlay" color="#000" /> : null}
			</ImageBackground>
		);
	}
}

const commonInputProps = {
	style: styles.input,
	underlineColorAndroid: 'transparent',
	placeholderTextColor: Color.blackTextSecondary,
};

ForgetPassword.propTypes = {
	netInfo: PropTypes.object,
};

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, user });

const mapDispatchToProps = dispatch => {
	const { actions } = require('@redux/UserRedux');
	const backAction = NavigationActions.back({
		key: null,
	});

	return {
		login: (user, token) => dispatch(actions.login(user, token)),
		logout: () => dispatch(actions.logout()),
		goBack: () => dispatch(backAction),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ForgetPassword);
