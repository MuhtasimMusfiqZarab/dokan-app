import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { Events, Constants } from '@common';
import { Button } from '@components';
import styles from './ProductDetail_Style';

export default class VariationButton extends PureComponent {
	render() {
		return (
			<View
				style={[
					styles.bottomView,
					Constants.RTL && { flexDirection: 'row-reverse' },
					{ position: 'absolute', width: '100%', bottom: 0 },
				]}>
				<Button
					type="text"
					text="Cancel"
					textStyle={styles.butnCartText}
					style={[styles.buttonContainer, { backgroundColor: '#F8F8FA' }]}
					onPress={this.props.onCancel}
				/>
				<Button
					text="Done"
					style={styles.btnBuy}
					textStyle={styles.btnBuyText}
					onPress={this.props.onDone}
				/>
			</View>
		);
	}
}
