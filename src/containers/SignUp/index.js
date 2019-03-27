/**
 * @format
 */

import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	TextInput,
	Switch,
	LayoutAnimation,
	ImageBackground,
	I18nManager,
	Dimensions,
	Platform,
	TouchableOpacity,
} from 'react-native';
import { Styles, Languages, Color, Images, Config, Constants } from '@common';
import { toast, error, Validate } from '@app/Omni';
import { Button, ImageCache } from '@components';
import Spinner from '@components/Spinner';
import WPUserAPI from '@services/WPUserAPI';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class SignUpScreen extends Component {
	constructor(props) {
		super(props);

		let state = {
			username: '',
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			confirmPassword: '',
			role: 'customer',
			useGeneratePass: false,
			isLoading: false,
			showSignupForm: true,
		};

		const params = props.params;
		if (params && params.user) {
			state = { ...state, ...params.user, useGeneratePass: true };
		}

		this.state = state;

		this.onFirstNameEditHandle = firstName => this.setState({ firstName });
		this.onLastNameEditHandle = lastName => this.setState({ lastName });
		this.onUsernameEditHandle = username => this.setState({ username });
		this.onEmailEditHandle = email => this.setState({ email });
		this.onPasswordEditHandle = password => this.setState({ password });
		this.onConfirmPasswordEditHandle = confirmPassword =>
			this.setState({ confirmPassword });

		this.onPasswordSwitchHandle = () =>
			this.setState({ useGeneratePass: !this.state.useGeneratePass });

		this.focusLastName = () => this.lastName && this.lastName.focus();
		this.focusUsername = () => this.username && this.username.focus();
		this.focusEmail = () => this.email && this.email.focus();
		this.focusPassword = () =>
			!this.state.useGeneratePass && this.password && this.password.focus();
	}

	shouldComponentUpdate() {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		return true;
	}

	onSignUpHandle = async () => {
		this._scrollView.scrollTo({
			x: 0,
			y: 0,
			animated: true,
		});

		const { netInfo } = this.props;

		if (!netInfo.isConnected) return toast(Languages.noConnection);

		const {
			username,
			email,
			firstName,
			lastName,
			password,
			useGeneratePass,
			confirmPassword,
			role,
			isLoading,
		} = this.state;

		if (isLoading) return;

		this.setState({ isLoading: true });

		const _error = this.validateForm();
		if (_error) return this.stopAndToast(_error);

		const user = {
			username,
			email,
			firstName,
			lastName,
			password: useGeneratePass ? undefined : password,
			confirmPassword: confirmPassword ? confirmPassword : '',
			role: role,
		};

		const json = await WPUserAPI.register(user);

		if (json === undefined) {
			return this.stopAndToast("Server didn't response correctly");
		} else if (json.code === 'user_created') {
			this.setState({
				showSignupForm: false,
				isLoading: false,
			});
		} else {
			return this.stopAndToast(json.message);
		}
	};

	validateForm = () => {
		const {
			username,
			email,
			password,
			firstName,
			lastName,
			useGeneratePass,
			confirmPassword,
		} = this.state;
		if (
			Validate.isEmpty(
				username,
				email,
				firstName,
				lastName,
				useGeneratePass ? '1' : password,
				confirmPassword
			)
		) {
			// check empty
			return 'Please complete the form';
		} else if (!Validate.isEmail(email)) {
			return 'Email is not correct';
		}
		return undefined;
	};

	stopAndToast = msg => {
		toast(msg);
		error(msg);
		this.setState({ isLoading: false });
	};

	render() {
		const {
			username,
			email,
			password,
			firstName,
			lastName,
			confirmPassword,
			useGeneratePass,
			isLoading,
			showSignupForm,
		} = this.state;
		const params = this.props.params;

		return (
			<ImageBackground
				source={Images.LoginScreenBackground}
				style={styles.backgroundImage}
				resizeMode="cover">
				{showSignupForm && (
					<KeyboardAwareScrollView
						innerRef={ref => {
							this._scrollView = ref;
						}}>
						<TouchableOpacity
							style={styles.backButton}
							onPress={() => this.props.goBack(null)}>
							<Image
								source={Images.icons.back}
								style={[
									{
										width: 16,
										height: 16,
										resizeMode: 'contain',
									},
									// Styles.Common.toolbarIcon,
									I18nManager.isRTL && {
										transform: [{ rotate: '180deg' }],
									},
								]}
							/>
						</TouchableOpacity>
						<View style={styles.logoWrap}>
							{Config.appSettings.app_logo ? (
								<ImageCache
									uri={Config.appSettings.app_logo}
									style={styles.logo}
									resizeMode="contain"
								/>
							) : (
								<Image
									source={Config.LogoWithText}
									style={styles.logo}
									resizeMode="contain"
								/>
							)}
							<Text style={styles.logoText}>
								{Config.appSettings.tag_line
									? Config.appSettings.tag_line
									: 'Build Your Dream Multi Vendor Market Place'}
							</Text>
						</View>
						<Text style={styles.signUpText}>Signup</Text>
						<View style={styles.formContainer}>
							{/* <Text style={styles.label}>{Languages.profileDetail}</Text> */}
							<View style={styles.inputWrap}>
								<Text style={styles.label2}>First Name</Text>
								<TextInput
									{...commonInputProps}
									ref={comp => (this.firstName = comp)}
									onChangeText={this.onFirstNameEditHandle}
									onSubmitEditing={this.focusLastName}
									autoCapitalize="words"
									returnKeyType="next"
									value={firstName}
								/>
							</View>
							<View style={styles.inputWrap}>
								<Text style={styles.label2}>Last Name</Text>
								<TextInput
									{...commonInputProps}
									ref={comp => (this.lastName = comp)}
									onChangeText={this.onLastNameEditHandle}
									onSubmitEditing={this.focusUsername}
									autoCapitalize="words"
									returnKeyType="next"
									value={lastName}
								/>
							</View>

							{/* <Text style={styles.label}>{Languages.accountDetails}</Text> */}
							<View style={styles.inputWrap}>
								<Text style={styles.label2}>Username</Text>
								<TextInput
									{...commonInputProps}
									ref={comp => (this.username = comp)}
									onChangeText={this.onUsernameEditHandle}
									onSubmitEditing={this.focusEmail}
									autoCapitalize="none"
									returnKeyType="next"
									value={username}
								/>
							</View>
							<View style={styles.inputWrap}>
								<Text style={styles.label2}>Email</Text>
								<TextInput
									{...commonInputProps}
									ref={comp => (this.email = comp)}
									onChangeText={this.onEmailEditHandle}
									onSubmitEditing={this.focusPassword}
									keyboardType="email-address"
									returnKeyType={useGeneratePass ? 'done' : 'next'}
									value={email}
								/>
							</View>
							{params && params.user ? (
								<View style={styles.switchWrap}>
									<Switch
										value={useGeneratePass}
										onValueChange={this.onPasswordSwitchHandle}
										thumbTintColor={Color.accent}
										onTintColor={Color.accentLight}
									/>
									<Text
										style={[
											styles.text,
											{
												color: useGeneratePass
													? Color.accent
													: Color.blackTextSecondary,
											},
										]}>
										{Languages.generatePass}
									</Text>
								</View>
							) : null}
							{useGeneratePass ? (
								<View />
							) : (
								<View style={styles.inputWrap}>
									<Text style={styles.label2}>Password</Text>
									<TextInput
										{...commonInputProps}
										ref={comp => (this.password = comp)}
										onChangeText={this.onPasswordEditHandle}
										secureTextEntry
										returnKeyType="next"
										value={password}
									/>
								</View>
							)}
							<View style={styles.inputWrap}>
								<Text style={styles.label2}>Confirm Password</Text>
								<TextInput
									{...commonInputProps}
									ref={comp => (this.confirmPassword = comp)}
									onChangeText={this.onConfirmPasswordEditHandle}
									secureTextEntry
									returnKeyType="done"
									value={confirmPassword}
								/>
							</View>
							<Button
								type="gradientBtn"
								text={Languages.signup}
								size="sm"
								alignSelf="flex-start"
								marginTop={15}
								onPress={this.onSignUpHandle}
							/>
						</View>
					</KeyboardAwareScrollView>
				)}
				{!showSignupForm && (
					<View
						style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<View style={styles.successInfo}>
							<Text
								style={{
									fontFamily: Constants.fontFamilyLato,
									color: Color.wdred1,
									fontSize: 30,
									marginBottom: 20,
								}}>
								Success!
							</Text>
							<Button
								type="gradientBtn"
								text="Login"
								size="sm"
								alignSelf="flex-start"
								marginTop={15}
								onPress={this.props.onLoginScreen}
							/>
						</View>
					</View>
				)}
				{isLoading ? <Spinner mode="overlay" color="#000" /> : null}
			</ImageBackground>
		);
	}
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	formContainer: {
		paddingHorizontal: Styles.width * 0.1,
	},
	backButton: {
		paddingHorizontal: Styles.width * 0.1,
		marginTop: Styles.width * 0.1,
	},
	signUpText: {
		paddingHorizontal: Styles.width * 0.1,
		fontSize: 30,
		fontFamily: Constants.fontFamilyLato,
		fontWeight: 'bold',
		color: '#000',
		marginBottom: 20,
	},
	label: {
		fontWeight: 'bold',
		fontSize: Styles.FontSize.medium,
		color: Color.blackTextPrimary,
		marginTop: 20,
		marginBottom: 10,
	},
	label2: {
		color: '#7C8592',
	},
	inputWrap: {
		marginBottom: 20,
	},
	input: {
		color: Color.blackTextPrimary,
		backgroundColor: '#fff',
		borderRadius: 5,
		height: 45,
		marginTop: 10,
		paddingHorizontal: 10,
		textAlign: I18nManager.isRTL ? 'right' : 'left',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: 0.05,
				shadowOffset: { width: 0, height: 1 },
			},
			android: {
				elevation: 1,
			},
		}),
	},
	signUpButton: {
		marginTop: 20,
		backgroundColor: Color.primary,
		borderRadius: 5,
		elevation: 1,
	},
	switchWrap: {
		...Styles.Common.RowCenterLeft,
		marginTop: 10,
	},
	text: {
		marginLeft: 10,
		color: Color.blackTextSecondary,
	},
	backgroundImage: {
		flex: 1,
		width: null,
		height: null,
	},
	logoWrap: {
		flexGrow: 0.3,
		paddingHorizontal: Styles.width * 0.1,
		marginBottom: 50,
	},
	logo: {
		width: 120,
		height: 80,
	},
	logoText: {
		width: width / 2,
		color: Color.wdgray5,
	},
	successInfo: {
		width: width / 1.2,
		height: 300,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		backgroundColor: '#fff',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: 0.3,
				shadowOffset: { width: 0, height: 0 },
			},
			android: {
				elevation: 3,
			},
		}),
	},
});

const commonInputProps = {
	style: styles.input,
	underlineColorAndroid: 'transparent',
	placeholderTextColor: Color.blackTextSecondary,
};

const mapStateToProps = state => {
	return {
		netInfo: state.netInfo,
	};
};

const mapDispatchToProps = dispatch => {
	const { actions } = require('@redux/UserRedux');
	return {
		login: (user, token) => dispatch(actions.login(user, token)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpScreen);
