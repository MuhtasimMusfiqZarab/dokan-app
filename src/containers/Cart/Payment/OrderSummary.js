import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { filter } from 'lodash';
import { Styles, Color } from '@common';
import css from '../styles';
import { currencyFormatter } from '@app/Omni';

export default class OrderSummary extends PureComponent {
	getCoupons = () => {
		console.log(this.props.coupons);
	};

	renderShipping = () => {
		const { shippingMethods } = this.props;
		const items = [];
		return shippingMethods.map((item, index) => {
			if (item.available_methods.length !== 0) {
				let chosenShippingID = item.chosen_method;
				let chosenShippingObject = filter(
					item.available_methods,
					item => item.id === chosenShippingID
				);

				// let shippingObj = {
				// 	method_title: chosenShippingObject[0].label,
				// 	method_id: chosenShippingObject[0].id,
				// 	total: chosenShippingObject[0].cost,
				// };
				// items.push(shippingObj);
				return (
					<View key={index} style={[css.row, { borderBottomWidth: 0 }]}>
						<Text
							style={{
								color: Color.blackTextPrimary,
								fontSize: Styles.FontSize.medium,
							}}>
							{item.store_name}
						</Text>
						<Text
							style={{
								color: Color.textBlue,
								fontSize: Styles.FontSize.medium,
							}}>
							{chosenShippingObject[0].label}{' '}
							{currencyFormatter(chosenShippingObject[0].cost)}
						</Text>
					</View>
				);
			} else {
				return (
					<View key={index} style={[css.row, { borderBottomWidth: 0 }]}>
						<Text
							style={{
								color: Color.blackTextPrimary,
								fontSize: Styles.FontSize.medium,
							}}>
							{item.store_name}
						</Text>
						<Text
							style={{
								color: Color.blackTextSecondary,
								fontSize: Styles.FontSize.medium,
							}}>
							No Shipping
						</Text>
					</View>
				);
			}
		});
	};

	render() {
		const { coupons } = this.props;

		return (
			<View style={styles.container}>
				<View style={{ marginBottom: 15 }}>
					<View style={css.row}>
						<Text style={[css.label, { fontWeight: 'bold' }]}>Items</Text>
					</View>
					{this.props.cartItems.map((item, index) => {
						return (
							<View key={index} style={{ paddingLeft: 10, marginBottom: 10 }}>
								<Text
									style={{
										color: Color.blackTextPrimary,
										fontSize: Styles.FontSize.medium,
									}}>
									{item.data.name}
								</Text>
								<Text
									style={{
										color: Color.blackTextSecondary,
										fontSize: Styles.FontSize.medium,
									}}>
									Vendor:{' '}
									<Text style={{ color: Color.textBlue }}>
										{item.vendor.store_name}
									</Text>
								</Text>
								<Text
									style={{
										color: Color.blackTextSecondary,
										fontSize: Styles.FontSize.medium,
									}}>
									Qty{' '}
									<Text style={{ color: Color.wdred1 }}>{item.quantity}</Text>
								</Text>
							</View>
						);
					})}
				</View>

				<View style={{ marginBottom: 15 }}>
					<View style={css.row}>
						<Text style={[css.label, { fontWeight: 'bold' }]}>Shipping</Text>
					</View>
					{this.renderShipping()}
				</View>

				{coupons.length !== 0 && (
					<View style={css.row}>
						<Text style={css.label}>Costs</Text>
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		minHeight: Dimensions.get('window').height / 2,
		marginBottom: 15,
		padding: 10,
		borderRadius: 10,
	},
});
