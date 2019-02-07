import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from '@components';
import OrderQuantity from './OrderQuantity';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';

export class OrderDetail extends Component {
	render() {
		const { orderDetail } = this.props;
		console.log(orderDetail);
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<OrderQuantity
					items={orderDetail.line_items}
					discount={orderDetail.discount_total}
					total={orderDetail.total}
				/>
				<ShippingAddress shippingAddress={orderDetail.shipping} />
				{/* <BillingAddress />
				<Button /> */}
			</ScrollView>
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
