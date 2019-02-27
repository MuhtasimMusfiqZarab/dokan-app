/** @format */

import React, { PureComponent } from 'react';
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	Switch,
	AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import {
	UserProfileHeader,
	UserProfileItem,
	DokanModal,
	CurrencyPicker,
	Spinner,
	ModalBox,
} from '@components';
import { Languages, Color, Tools, Icons } from '@common';
import { getNotification } from '@app/Omni';
import NameEditModal from './NameEditModal';
import styles from './styles';

class UserProfile extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			pushNotification: false,
			isLoading: false,
		};
	}

	async componentDidMount() {
		const notification = await getNotification();
		// console.log("notification", notification);
		this.setState({
			pushNotification: notification || false,
		});
	}

	/**
	 * TODO: refactor to config.js file
	 */
	_getListItem = () => {
		const { currency, wishListTotal, userProfile } = this.props;

		const listItem = [
			{
				label: `${Languages.WishList} (${wishListTotal})`,
				routeName: 'WishListScreen',
				iconLeft: Icons.MaterialCommunityIcons.Wishlist,
			},
			userProfile.user && {
				label: Languages.MyOrder,
				routeName: 'MyOrders',
				iconLeft: Icons.MaterialCommunityIcons.Order,
			},
			{
				label: Languages.Currency,
				value: currency.code,
				isActionSheet: true,
				iconLeft: Icons.MaterialCommunityIcons.Currency,
			},
			{
				label: Languages.Languages,
				routeName: 'SettingScreen',
				value: Languages.LanguageName,
				iconLeft: Icons.MaterialCommunityIcons.Setting,
			},
			{
				label: Languages.PushNotification,
				icon: () => (
					<Switch
						onValueChange={this._handleSwitch}
						value={this.state.pushNotification}
						tintColor={Color.blackDivide}
						// trackColor={{ true: 'blue', false: 'red' }}
					/>
				),
				iconLeft: Icons.MaterialCommunityIcons.Bell,
			},
			{
				label: Languages.contactus,
				routeName: 'ContactUs',
				iconLeft: Icons.MaterialCommunityIcons.Wechat,
			},
			{
				label: Languages.Privacy,
				routeName: 'PrivacyPolicy',
				iconLeft: Icons.MaterialCommunityIcons.Lock,
			},
			{
				label: Languages.About,
				routeName: 'AboutUs',
				iconLeft: Icons.MaterialCommunityIcons.About,
			},
		];

		return listItem;
	};

	_handleSwitch = value => {
		AsyncStorage.setItem('@notification', JSON.stringify(value), () => {
			this.setState({
				pushNotification: value,
			});
		});
	};

	_handlePress = item => {
		const { navigation } = this.props;
		const { routeName, isActionSheet, label } = item;

		if (routeName && !isActionSheet) {
			navigation.navigate(routeName, item.params);
		}

		if (isActionSheet) {
			switch (label) {
				case 'Currency':
					this.currencyPicker.openModal();
				case 'Name':
					this.editNameModal.openModal();
				default:
					break;
			}
		}
	};

	changeLoadingState = booleanValue => {
		this.setState({
			isLoading: booleanValue,
		});
	};

	closeEditModal = () => {
		this.editNameModal.closeModal();
	};

	render() {
		const {
			userProfile,
			navigation,
			currency,
			changeCurrency,
			updateUser,
		} = this.props;
		const user = userProfile.user || {};
		const bearerToken = userProfile.token || {};
		const name = Tools.getName(user);
		const listItem = this._getListItem();
		const address = Tools.getAddress(user);

		return (
			<View style={styles.container}>
				<ScrollView
					ref={c => {
						this.scrollView = c;
					}}>
					<UserProfileHeader
						onLogin={() => navigation.navigate('LoginScreen')}
						onLogout={() => {
							this.props.emptyCart();
							this.props.logOut();
							// navigation.navigate('LoginScreen', { isLogout: true });
						}}
						user={{
							...user,
							name,
							bearerToken,
						}}
						updateUser={updateUser}
						changeLoadingState={this.changeLoadingState}
					/>

					{userProfile.user && (
						<View style={{ marginTop: 15 }}>
							<View
								style={{
									flex: 1,
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}>
								<Text style={styles.headerSection}>
									{Languages.AccountInformations.toUpperCase()}
								</Text>
								<TouchableOpacity
									onPress={() => this.editNameModal.openModal()}>
									<Text style={styles.editText}>Edit</Text>
								</TouchableOpacity>
							</View>
							<UserProfileItem
								icon
								isActionSheet={true}
								label={Languages.Name}
								value={name}
								iconLeft={Icons.MaterialCommunityIcons.User}
								valueBlack
							/>
							<UserProfileItem
								label={Languages.Email}
								value={user.email}
								iconLeft={Icons.MaterialCommunityIcons.Email}
								valueBlack
							/>
							<UserProfileItem
								icon
								routeName="UserProfileEdit"
								label={Languages.Address}
								value={address}
								iconLeft={Icons.MaterialCommunityIcons.Pin}
								valueBlack
							/>
						</View>
					)}

					<View style={styles.profileSection}>
						{listItem.map((item, index) => {
							return (
								item && (
									<UserProfileItem
										icon
										key={index}
										onPress={() => this._handlePress(item)}
										{...item}
									/>
								)
							);
						})}
					</View>
				</ScrollView>

				<DokanModal
					ref={c => (this.currencyPicker = c)}
					customStyle={{
						width: '90%',
						height: 300,
					}}>
					<CurrencyPicker
						closeCurrencyModal={() => this.currencyPicker.closeModal()}
						currency={currency}
						changeCurrency={changeCurrency}
					/>
				</DokanModal>

				<NameEditModal
					refs={c => (this.editNameModal = c)}
					closeEditModal={this.closeEditModal}
					user={user}
					token={bearerToken}
					updateUser={updateUser}
				/>

				{this.state.isLoading ? <Spinner mode="overlay" color="#000" /> : null}
			</View>
		);
	}
}

const mapStateToProps = ({ user, language, currency, wishList }) => ({
	userProfile: user,
	language,
	currency,
	wishListTotal: wishList.wishListItems.length,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('@redux/CurrencyRedux');
	const CartRedux = require('@redux/CartRedux');
	const UserRedux = require('@redux/UserRedux');

	return {
		...ownProps,
		...stateProps,
		changeCurrency: currnecy => actions.changeCurrency(dispatch, currnecy),
		updateUser: user => dispatch(UserRedux.actions.updateUserInfo(user)),
		emptyCart: () => CartRedux.actions.emptyCart(dispatch),
		logOut: () => dispatch(UserRedux.actions.logout()),
	};
}

export default connect(
	mapStateToProps,
	null,
	mergeProps
)(UserProfile);
