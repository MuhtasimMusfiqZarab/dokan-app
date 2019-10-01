/**
 * @format
 */

import { FacebookAPI, toast, Validate } from '@app/Omni';
import { Color, Config, Icons, Images, Languages, Styles } from '@common';
import { Button, ButtonIndex, ImageCache, Spinner } from '@components';
import DokanWorker from '@services/Dokan/DokanWorker';
import WPUserAPI from '@services/WPUserAPI';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, ImageBackground, Keyboard, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import styles from './styles';

class LoginScreen extends PureComponent {
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
		onForgetPassword: PropTypes.func,
		fetchAllCartItems: PropTypes.func,
		calledFrom: PropTypes.string,
		loggedIn: PropTypes.bool,
		loginType: PropTypes.string,
		updateUserInfo: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			isLoading: false,
			logInFB: false,
		};

		this.onUsernameEditHandle = username => this.setState({ username });
		this.onPasswordEditHandle = password => this.setState({ password });
		this.focusPassword = () => this.password && this.password.focus();
	}

	componentDidMount() {
		const { user, isLogout } = this.props;

		// check case after logout
		if (user && isLogout) {
			this._handleLogout();
		}
	}

	// handle logout screen and navigate to cart page if the new user login object exists
	UNSAFE_componentWillReceiveProps(nextProps) {
		const { user: oldUser, onViewCartScreen } = this.props;
		const { user } = nextProps.user;
		const { params } = nextProps.navigation.state;

		// check case after logout
		if (user) {
			if (!oldUser.user) {
				this.setState({ isLoading: false });

				if (params && typeof params.onCart !== 'undefined') {
					console.log('onview cartscreen');
					onViewCartScreen();
				}

				const uName =
					user.last_name != null || user.first_name != null
						? `${user.first_name} ${user.last_name}`
						: user.name;
				toast(`${Languages.welcomeBack} ${uName}.`);
			}
		}
	}

	_handleLogout = () => {
		console.log('handle logout');
		const { logout, loginType } = this.props;

		if (loginType === 'facebook') {
			FacebookAPI.logout();
		}

		logout();

		// calledFrom === 'drawer' ? onViewHomeScreen() : onBack();
	};

	// _onBack = () => {
	// 	const { onBack, goBack } = this.props;
	// 	if (onBack) {
	// 		onBack();
	// 	} else {
	// 		goBack();
	// 	}
	// };

	onLoginPressHandle = async () => {
		Keyboard.dismiss();
		const { login, netInfo, calledFrom, onViewHomeScreen, onBack } = this.props;

		if (!netInfo.isConnected) {
			return toast(Languages.noConnection);
		}

		if (this.state.isLoading) return;
		this.setState({ isLoading: true });

		const _error = this.validateForm();
		if (_error) return this.stopAndToast(_error);

		const { username, password } = this.state;

		// login the customer via Wordpress API and get the access token
		const json = await WPUserAPI.login(username.trim(), password);

		if (json === undefined) {
			this.stopAndToast(Languages.GetDataError);
		} else if (json.code === '[jwt_auth] incorrect_password') {
			this.stopAndToast('Invalid Password');
		} else if (json.code === '[jwt_auth] invalid_username') {
			this.stopAndToast('Invalid User Name');
		} else if (json.code === '[jwt_auth] invalid_email') {
			this.stopAndToast('Invalid Email');
		} else if (json.code) {
			this.stopAndToast(json.message);
		} else {
			let customers = await DokanWorker.getCustomerProfile(json.token);
			console.log(json.token);
			if (customers.code !== undefined) {
				this.stopAndToast(customers.message);
			} else if (customers.id !== undefined) {
				// Fetch customer's cart
				this.props.fetchAllCartItems(json.token);
				// Update and store customer's info
				customers = { ...customers, username, password };
				login(customers, json.token, 'regular');

				this.setState({ isLoading: false });
				calledFrom === 'drawer' ? onViewHomeScreen() : onBack();
			} else {
				this.stopAndToast('Server Error');
			}
		}
	};

	onFBLoginPressHandle = () => {
		const { login, netInfo, calledFrom, onViewHomeScreen, onBack } = this.props;

		if (!netInfo.isConnected) {
			return toast(Languages.noConnection);
		}

		FacebookAPI.login()
			.then(async response => {
				if (response.token) {
					console.log(response.token);
					const json = await WPUserAPI.loginFacebook(response.token);

					if (json === undefined) {
						this.stopAndToast(Languages.GetDataError);
					} else if (json.error) {
						this.stopAndToast(json.error);
					} else if (json.code) {
						this.stopAndToast(json.message);
					} else {
						this.setState({ isLoading: true });
						let customer = await DokanWorker.getCustomerProfile(json.token);
						console.log(json.token);
						if (isEmpty(customer.profile_picture)) {
							customer.profile_picture = {
								uri: response.profilePicUrl,
							};
							const profileUpdateResponse = await DokanWorker.updateCustomerProfile(
								customer.profile_picture,
								json.token
							);
							if (profileUpdateResponse.id) {
								this.props.updateUserInfo(profileUpdateResponse);
							}
						}
						this.props.fetchAllCartItems(json.token);
						// Update and store customer's info
						login(customer, json.token, 'facebook');

						calledFrom === 'drawer' ? onViewHomeScreen() : onBack();
					}
				} else {
					this.stopAndToast(response.message);
				}
			})
			.catch(err => {
				console.log(err);
				this.setState({ isLoading: false });
			});
	};

	validateForm = () => {
		const { username, password } = this.state;

		if (Validate.isEmpty(username, password)) {
			// check empty
			return 'Please complete the form';
		}

		return undefined;
	};

	signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			// this.setState({ userInfo });
			console.log(userInfo);
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (f.e. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened
			}
		}
	};

	onSignUpHandle = () => {
		this.props.onViewSignUp();
	};

	onForgetPassHandle = () => {
		this.props.onForgetPassword();
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
		const { username, password, isLoading } = this.state;
		const { calledFrom, onViewHomeScreen, onBack } = this.props;

		return (
			<ImageBackground
				source={Images.LoginScreenBackground}
				style={styles.backgroundImage}
				resizeMode="cover">
				<KeyboardAwareScrollView
					enableOnAndroid={true}
					keyboardShouldPersistTaps="always">
					{Platform.OS === 'ios' && (
						<TouchableOpacity
							style={styles.backButton}
							onPress={() =>
								calledFrom === 'drawer' ? onViewHomeScreen() : onBack()
							}>
							{/* <Image
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
							/> */}
							<Text style={{ color: '#7C8592' }}>Go Back</Text>
						</TouchableOpacity>
					)}

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
					<Text style={styles.loginText}>Login</Text>
					<View style={styles.subContain}>
						<View style={styles.inputWrap}>
							<Text style={styles.label}>Username or Email</Text>
							<TextInput
								{...commonInputProps}
								style={styles.input}
								ref={comp => (this.username = comp)}
								autoCapitalize="none"
								keyboardType="email-address"
								onChangeText={this.onUsernameEditHandle}
								onSubmitEditing={this.focusPassword}
								returnKeyType="next"
								value={username}
							/>
						</View>
						<View style={styles.inputWrap}>
							<Text style={styles.label}>Password</Text>
							<TextInput
								{...commonInputProps}
								ref={comp => (this.password = comp)}
								onChangeText={this.onPasswordEditHandle}
								secureTextEntry
								returnKeyType="go"
								value={password}
							/>
						</View>
						<TouchableOpacity
							// style={Styles.Common.ColumnCenter}
							onPress={this.onForgetPassHandle}>
							<Text style={styles.highlight}>Forget Password?</Text>
						</TouchableOpacity>
						<Button
							type="gradientBtn"
							text="Login"
							style={{
								alignSelf: 'flex-start',
								marginVertical: 15,
							}}
							onPress={this.onLoginPressHandle}
						/>

						<ButtonIndex
							text={Languages.FacebookLogin.toUpperCase()}
							icon={Icons.MaterialCommunityIcons.Facebook}
							containerStyle={styles.fbButton}
							onPress={this.onFBLoginPressHandle}
						/>

						{/* <GoogleSigninButton
							style={{ width: 192, height: 48 }}
							size={GoogleSigninButton.Size.Wide}
							color={GoogleSigninButton.Color.Dark}
							onPress={this.signIn}
							disabled={this.state.isSigninInProgress}
						/> */}

						<View style={styles.separatorWrap}>
							<View style={styles.separator} />
							<Text style={styles.separatorText}>{Languages.Or}</Text>
							<View style={styles.separator} />
						</View>

						<TouchableOpacity
							style={Styles.Common.ColumnCenter}
							onPress={this.onSignUpHandle}>
							<Text style={styles.signUp}>
								{Languages.DontHaveAccount}{' '}
								<Text style={styles.highlight}>{Languages.signup}</Text>
							</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAwareScrollView>
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

LoginScreen.propTypes = {
	netInfo: PropTypes.object,
	login: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = ({ netInfo, user }) => ({
	netInfo,
	user,
	loginType: user.loginType,
});

const mapDispatchToProps = dispatch => {
	const { actions } = require('@redux/UserRedux');
	const CartActions = require('@redux/CartRedux').actions;
	const backAction = NavigationActions.back({
		key: null,
	});

	return {
		login: (user, token, loginType) =>
			dispatch(actions.login(user, token, loginType)),
		logout: () => dispatch(actions.logout()),
		updateUserInfo: user => dispatch(actions.updateUserInfo(user)),
		goBack: () => dispatch(backAction),
		fetchAllCartItems: token => CartActions.fetchAllCartItems(dispatch, token),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginScreen);
