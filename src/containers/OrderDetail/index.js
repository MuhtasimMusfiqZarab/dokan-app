import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button } from '@components';
import OrderQuantity from './OrderQuantity';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';

export class OrderDetail extends Component {
	render() {
		const { orderDetail } = this.props;
		console.log(orderDetail);
		return (
			<View style={styles.container}>
				<ScrollView>
					<OrderQuantity
						items={orderDetail.line_items}
						store={orderDetail.store.shop_name}
						discount={orderDetail.discount_total}
						total={orderDetail.total}
					/>
					<ShippingAddress shippingAddress={orderDetail.shipping} />
					<BillingAddress billingAddress={orderDetail.billing} />
					{orderDetail.status === 'completed' && (
						<Button
							type="gradientBtn"
							text="Order Again"
							alignSelf="center"
							marginTop={15}
							onPress={() => alert('To be implemented')}
						/>
					)}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
	},
});

export default OrderDetail;
