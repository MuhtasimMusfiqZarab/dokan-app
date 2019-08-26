/**
 * @format
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Color, Languages, Styles } from '@common';
import { toast } from '@app/Omni';

class MyNetInfo extends React.PureComponent {
	static propTypes = {
		updateConnectionStatus: PropTypes.func,
		netInfo: PropTypes.any,
	};

	constructor(props) {
		super(props);

		this.skipFirstToast = true;
	}

	componentDidMount() {
		// NetInfo.isConnected.addEventListener(
		// 	'connectionChange',
		// 	this._handleConnectionChange
		// );
		this.unsubscribe = NetInfo.addEventListener(state => {
			this._handleConnectionChange(state.isConnected);
		});
	}

	componentWillUnmount() {
		// NetInfo.isConnected.removeEventListener(
		// 	'connectionChange',
		// 	this._handleConnectionChange
		// );
		this.unsubscribe();
	}

	_handleConnectionChange = isConnected => {
		this.props.updateConnectionStatus(isConnected);
		if (!isConnected) return;

		if (!this.skipFirstToast) {
			toast('You are Online!');
		} else {
			this.skipFirstToast = false;
		}
	};

	render() {
		const { netInfo } = this.props;

		if (netInfo.isConnected) return <View />;
		return (
			<View style={styles.connectionStatus}>
				<Text style={styles.connectionText}>{Languages.noConnection}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	connectionStatus: {
		position: 'absolute',
		bottom: 0,
		width: Styles.width,
		height: 25,
		backgroundColor: Color.error,
		alignItems: 'center',
		justifyContent: 'center',
	},
	connectionText: {
		color: 'white',
		fontSize: Styles.FontSize.tiny,
		fontWeight: 'bold',
	},
});

const mapStateToProps = state => {
	return {
		netInfo: state.netInfo,
	};
};

const mapDispatchToProps = dispatch => {
	const { actions } = require('@redux/NetInfoRedux');

	return {
		updateConnectionStatus: isConnected =>
			dispatch(actions.updateConnectionStatus(isConnected)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyNetInfo);
