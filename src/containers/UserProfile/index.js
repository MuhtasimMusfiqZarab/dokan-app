/** @format */

import React, { PureComponent } from "react";
import { View, ScrollView, Text, Switch, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import {
	UserProfileHeader,
	UserProfileItem,
	ModalBox,
	CurrencyPicker,
} from "@components";
import { Languages, Color, Tools } from "@common";
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
			},
			userProfile.user && {
				label: Languages.MyOrder,
				routeName: "MyOrders",
			},
			{
				label: Languages.Currency,
				value: currency.code,
				isActionSheet: true,
			},
			{
				label: Languages.Languages,
				routeName: "SettingScreen",
				value: Languages.LanguageName,
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
			},
			{
				label: Languages.contactus,
				routeName: "ContactUs",
			},
			{
				label: Languages.Privacy,
				routeName: "PrivacyPolicy",
			},
			{
				label: Languages.About,
				routeName: "AboutUs",
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
						<View style={styles.profileSection}>
							<Text style={styles.headerSection}>
								{Languages.AccountInformations.toUpperCase()}
							</Text>
							<UserProfileItem
								label={Languages.Name}
								onPress={this._handlePress}
								value={name}
							/>
							<UserProfileItem label={Languages.Email} value={user.email} />
							<UserProfileItem label={Languages.Address} value={user.address} />
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

				<ModalBox ref={(c) => (this.currencyPicker = c)}>
					<CurrencyPicker currency={currency} changeCurrency={changeCurrency} />
				</ModalBox>
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
