import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import css from './styles';

export default function ShippingAddress(props) {
	const { shippingAddress } = props;

	return (
		<View style={css.orderDetailsBlock}>
			<Text style={[css.title, { marginLeft: 15 }]}>Shipping Address</Text>
			<View style={css.separator} />
			{/* {Object.keys(props.shippingAddress).map((key, index) => {
				return (
					<View key={index} style={styles.row}>
						<Text>{key}</Text>
						<Text>{props.shippingAddress[key]}</Text>
					</View>
				);
      })} */}

			<Text style={[css.standardTextGray, { marginBottom: 5, marginLeft: 15 }]}>
				{`${shippingAddress.first_name} ${shippingAddress.last_name}`}
			</Text>
			<Text style={[css.standardTextGray, { marginBottom: 5, marginLeft: 15 }]}>
				{`${shippingAddress.address_1}`}
			</Text>
			<Text style={[css.standardTextGray, { marginBottom: 5, marginLeft: 15 }]}>
				{`${shippingAddress.city}`}
			</Text>
			<Text style={[css.standardTextGray, { marginBottom: 5, marginLeft: 15 }]}>
				{`${shippingAddress.state} ${shippingAddress.postcode}`}
			</Text>
			<Text style={[css.standardTextGray, { marginBottom: 5, marginLeft: 15 }]}>
				{`${shippingAddress.country}`}
			</Text>
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
