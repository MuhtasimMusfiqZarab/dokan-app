import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import css from './styles';

export default function BillingAddress(props) {
	const { billingAddress } = props;

	return (
		<View style={css.orderDetailsBlock}>
			<Text style={[css.title, { marginLeft: 15 }]}>Billing Address</Text>
			<View style={css.separator} />
			{/* {Object.keys(props.billingAddress).map((key, index) => {
				return (
					<View key={index} style={styles.row}>
						<Text>{key}</Text>
						<Text>{props.shippingAddress[key]}</Text>
					</View>
				);
      })} */}
			<Text style={[css.standardTextGray, { marginBottom: 5, marginLeft: 15 }]}>
				{`${billingAddress.first_name} ${billingAddress.last_name}`}
			</Text>
			<Text style={[css.standardTextGray, { marginBottom: 5, marginLeft: 15 }]}>
				{`${billingAddress.address_1}`}
			</Text>
			<Text style={[css.standardTextGray, { marginBottom: 5, marginLeft: 15 }]}>
				{`${billingAddress.city}`}
			</Text>
			<Text style={[css.standardTextGray, { marginBottom: 5, marginLeft: 15 }]}>
				{`${billingAddress.state} ${billingAddress.postcode}`}
			</Text>
			<Text style={[css.standardTextGray, { marginBottom: 5, marginLeft: 15 }]}>
				{`${billingAddress.country}`}
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
