/**
 * @format
 */

import { Config, Styles, Tools } from '@common';
import { Text } from '@components';
import React, { PureComponent } from 'react';
import {
	I18nManager,
	Image,
	ScrollView,
	TouchableOpacity,
	View,
} from 'react-native';
import { connect } from 'react-redux';
import { DrawerButton } from '../DrawerButton';
import styles from './styles';

class DrawerDefault extends PureComponent {
	constructor(props) {
		super(props);

		const { user } = props.userProfile;

		// Config Menu
		if (user) {
			this.buttonList = [
				...Config.menu.listMenu,
				...Config.menu.listMenuLogged,
			];
		} else {
			this.buttonList = [
				...Config.menu.listMenu,
				...Config.menu.listMenuUnlogged,
			];
		}

		this.state = {
			reload: false,
			activeScreenIndex: 0,
		};
	}

	componentDidMount() {
		/**
		 * Keep track of active screen
		 */
		// this.buttonList.map((item, index) => {
		// 	if (item.params.isActive === true) {
		// 		this.setState({
		// 			activeScreenIndex: index,
		// 		});
		// 	}
		// });
	}

	/**
	 * Update when logged in
	 */
	UNSAFE_componentWillReceiveProps(props) {
		const { userProfile } = props;

		if (userProfile && userProfile.user) {
			this.buttonList = [
				...Config.menu.listMenu,
				...Config.menu.listMenuLogged,
			];
		} else {
			this.buttonList = [
				...Config.menu.listMenu,
				...Config.menu.listMenuUnlogged,
			];
		}
	}

	_handlePress = item => {
		const { goToScreen } = this.props;

		// To show active inactive menu
		if (item.params.isActive === false) {
			item.params.isActive = true;
			this.setState({ activeScreenIndex: item.index });
		} else {
			this.setState({
				activeScreenIndex: item.index,
			});
		}

		goToScreen(item.routeName, item.params, item.isReset);
	};

	handleUserProfilePress = () => {
		const { goToScreen } = this.props;
		goToScreen('UserProfileScreen');
	};

	render() {
		const { userProfile } = this.props;
		const user = userProfile.user;
		const avatar = Tools.getAvatar(user);
		const name = Tools.getName(user);

		return (
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => this.handleUserProfilePress()}
					style={[styles.avatarBackground, Styles.Common.ColumnCenter]}>
					<Image
						source={avatar}
						style={[styles.avatar, I18nManager.isRTL && { left: -20 }]}
					/>
					<View style={styles.textContainer}>
						<Text style={styles.fullName}>{name}</Text>
						<Text style={styles.email}>{user ? user.email : ''}</Text>
					</View>
				</TouchableOpacity>
				<ScrollView>
					{this.buttonList.map((item, index) => {
						return (
							<DrawerButton
								onPress={() => this._handlePress(item)}
								key={index}
								isActive={this.state.activeScreenIndex === index}
								{...item}
							/>
						);
					})}
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = ({ user, netInfo }) => ({
	userProfile: user,
	loginType: user.loginType,
	netInfo, // auto reload when netInfo change, also fix reload menu to change language
});

const mapDispatchToProps = dispatch => {
	const CartActions = require('@redux/CartRedux').actions;
	const UserActions = require('@redux/UserRedux').actions;

	return {
		emptyCart: () => CartActions.emptyCart(dispatch),
		logout: () => dispatch(UserActions.logout()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DrawerDefault);
