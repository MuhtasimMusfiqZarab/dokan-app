/** @format */

import React, { PureComponent } from "react";
import { View, ScrollView, Text, Switch, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import {
	UserProfileHeader,
	UserProfileItem,
	DokanModal,
	CurrencyPicker,
} from "@components";
import { Languages, Color, Tools, Icons } from "@common";
import { getNotification } from "@app/Omni";

import styles from "./styles";

class UserProfile extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			pushNotification: false,
			isLoading: true,
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
		const { currency, wishListTotal, language, userProfile } = this.props;

		const listItem = [
			{
				label: `${Languages.WishList  } (${  wishListTotal  })`,
				routeName: "WishListScreen",
				iconLeft: Icons.MaterialCommunityIcons.Wishlist,
			},
			userProfile.user && {
				label: Languages.MyOrder,
				routeName: "MyOrders",
				iconLeft: Icons.MaterialCommunityIcons.Order
			},
			{
				label: Languages.Currency,
				value: currency.code,
				isActionSheet: true,
				iconLeft: Icons.MaterialCommunityIcons.Currency,
			},
			{
				label: Languages.Languages,
				routeName: "SettingScreen",
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
					/>
				),
				iconLeft: Icons.MaterialCommunityIcons.Bell,
			},
			{
				label: Languages.contactus,
				routeName: "ContactUs",
				iconLeft: Icons.MaterialCommunityIcons.Wechat,
			},
			{
				label: Languages.Privacy,
				routeName: "PrivacyPolicy",
				iconLeft: Icons.MaterialCommunityIcons.Lock,
			},
			{
				label: Languages.About,
				routeName: "AboutUs",
				iconLeft: Icons.MaterialCommunityIcons.About,
			},
		];

		return listItem;
	};

	_handleSwitch = (value) => {
		AsyncStorage.setItem("@notification", JSON.stringify(value), () => {
			this.setState({
				pushNotification: value,
			});
		});
	};

	_handlePress = (item) => {
		const { navigation } = this.props;
		const { routeName, isActionSheet } = item;

		if (routeName && !isActionSheet) {
			navigation.navigate(routeName, item.params);
		}

		if (isActionSheet) {
			this.currencyPicker.openModal();
		}
	};

	render() {
		const {
			userProfile,
			language,
			navigation,
			currency,
			changeCurrency,
		} = this.props;
		const user = userProfile.user || {};
		const name = Tools.getName(user);
		const listItem = this._getListItem();
		const address = Tools.getAddress(user);

		return (
			<View style={styles.container}>
				<ScrollView ref="scrollView">
					<UserProfileHeader
						onLogin={() => navigation.navigate("LoginScreen")}
						onLogout={() =>
							navigation.navigate("LoginScreen", { isLogout: true })
						}
						user={{
							...user,
							name,
						}}
					/>

					{userProfile.user && (
						<View style={{marginTop: 15}}>
							<Text style={styles.headerSection}>
								{Languages.AccountInformations.toUpperCase()}
							</Text>
							<UserProfileItem
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
					ref={(c) => (this.currencyPicker = c)}
					customStyle={{
						width: "90%",
						height: 300
					}}>
					<CurrencyPicker
						closeCurrencyModal={() => this.currencyPicker.closeModal()}
						currency={currency}
						changeCurrency={changeCurrency} />
				</DokanModal>
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
	const { actions } = require("@redux/CurrencyRedux");
	return {
		...ownProps,
		...stateProps,
		changeCurrency: (currnecy) => actions.changeCurrency(dispatch, currnecy),
	};
}

export default connect(
	mapStateToProps,
	null,
	mergeProps
)(UserProfile);
