import React, { PureComponent } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button } from '@components';
import { connect } from 'react-redux';
import OrderQuantity from './OrderQuantity';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';

export class OrderDetail extends PureComponent {
	onPressorderAgain = () => {
		this.props.emptyCart();
		this.props.addCartItemsBatch(
			this.props.orderDetail.line_items,
			this.props.user.token
		);
		this.props.navigate('CartScreen');
	};

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
							onPress={() => this.onPressorderAgain()}
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

const mapStateToProps = ({ user, carts }) => ({
	user,
	isCartFetching: carts.isFetching,
});
function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('@redux/CartRedux');
	return {
		...ownProps,
		...stateProps,
		emptyCart: () => {
			actions.emptyCart(dispatch);
		},
		addCartItemsBatch: (items, token) => {
			actions.addCartItemsBatch(dispatch, items, token);
		},
	};
}

export default connect(
	mapStateToProps,
	null,
	mergeProps
)(OrderDetail);
