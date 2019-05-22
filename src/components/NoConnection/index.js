/**
 * @format
 */

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Color, Languages, Styles, Constants } from '@common';
import { toast } from '@app/Omni';
import { Button } from 'react-native-paper';

export default class NoConnection extends React.PureComponent {
	constructor(props) {
		super(props);

		this.skipFirstToast = true;
	}

	render() {
		return (
			<View style={styles.conatiner}>
				<Text style={styles.connectionTitle}>Oops!</Text>
				<Text style={styles.connectionText}>
					No internet found. Please Connect to the internet.
				</Text>
				<Button
					mode="contained"
					color={Color.attributes.red}
					onPress={() => this.props.onPress()}>
					Try Again
				</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	conatiner: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 15,
	},
	connectionTitle: {
		color: Color.blackTextDisable,
		fontSize: 36,
		fontFamily: Constants.fontFamilyLato,
		fontWeight: 'bold',
		marginBottom: 15,
	},
	connectionText: {
		color: Color.blackTextDisable,
		fontSize: Styles.FontSize.medium,
		fontFamily: Constants.fontFamilyLato,
		marginBottom: 15,
	},
});
