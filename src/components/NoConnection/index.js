/**
 * @format
 */

import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Color, Languages, Styles, Constants, Images } from '@common';
import { toast } from '@app/Omni';
import { Button } from '@components';

export default class NoConnection extends React.PureComponent {
	constructor(props) {
		super(props);

		this.skipFirstToast = true;
	}

	render() {
		return (
			<View style={styles.conatiner}>
				<Image
					source={Images.NoConnection}
					style={styles.noConnectionImage}
					resizeMode="contain"
				/>
				<View style={{ alignItems: 'center' }}>
					<Text style={styles.noConnectionTitle}>Oops!</Text>
					<Text style={styles.noConnectionText}>No internet found</Text>
					<Text style={styles.noConnectionText}>
						Please check your connection
					</Text>
				</View>

				<Button
					type="gradientBtn"
					text="Try Again"
					size="sm"
					style={{
						marginTop: 20,
					}}
					shadow
					onPress={() => this.props.onPress()}>
					Try Again
				</Button>
			</View>
		);
	}
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	conatiner: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 15,
	},
	noConnectionImage: {
		width: width / 2,
		height: width / 1.5,
	},
	noConnectionTitle: {
		color: Color.blackText,
		fontSize: 36,
		fontFamily: Constants.fontFamilyLato,
		fontWeight: 'bold',
		marginBottom: 15,
	},
	noConnectionText: {
		color: Color.blackTextDisable,
		fontSize: Styles.FontSize.medium,
		fontFamily: Constants.fontFamilyLato,
	},
});
