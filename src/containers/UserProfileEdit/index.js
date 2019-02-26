/** @format */

import React, { PureComponent } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from '@components';
import { Languages, Color, Tools, Icons } from '@common';

import styles from './styles';

class UserProfileEditScreen extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			pushNotification: false,
			isLoading: false,
		};
	}

	render() {
		const { userProfile } = this.props;
		const user = userProfile.user || {};
		const bearerToken = userProfile.token || {};
		const name = Tools.getName(user);
		const address = Tools.getAddress(user);

		return (
			<View style={styles.container}>
				<ScrollView ref={c => (this.scrollView = c)}>
					<Text>Testing...</Text>
				</ScrollView>

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
	const UserRedux = require('@redux/UserRedux');

	return {
		...ownProps,
		...stateProps,
		changeCurrency: currnecy => actions.changeCurrency(dispatch, currnecy),
		updateUser: user => dispatch(UserRedux.actions.updateUserInfo(user)),
	};
}

export default connect(
	mapStateToProps,
	null,
	mergeProps
)(UserProfileEditScreen);
