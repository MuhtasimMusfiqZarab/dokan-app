import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import css from './styles';

export default function ShippingAddress(props) {
	return (
		<View style={css.orderDetailsBlock}>
			<Text style={[css.title, { marginLeft: 15 }]}>Shipping Address</Text>
			<View style={css.separator} />
			{Object.keys(props.shippingAddress).map((key, index) => {
				return (
					<View key={index} style={styles.row}>
						<Text>{key}</Text>
						<Text>{props.shippingAddress[key]}</Text>
					</View>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		width: '100%',
		paddingHorizontal: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
