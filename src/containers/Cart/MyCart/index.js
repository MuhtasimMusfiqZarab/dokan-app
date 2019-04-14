/** @format */

import React, { PureComponent } from 'react';
import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import css from '@cart/styles';
import { currencyFormatter, toast } from '@app/Omni';
import { ProductItem, Button, Spinkit, Spinner } from '@components';
import { connect } from 'react-redux';
import { SwipeRow } from 'react-native-swipe-list-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Languages, Color, Constants, Events } from '@common';
import styles from './styles';
import WooWorker from '@services/WooCommerce/WooWorker';
import { uniqBy, find } from 'lodash';

class MyCart extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			coupon: props.couponCode,
			isLoading: true,
		};
		// this.uniqueVendors = [];
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (
			nextProps.hasOwnProperty('type') &&
			nextProps.type == 'GET_COUPON_CODE_FAIL' &&
			nextProps.message
		) {
			this.props.cleanOldCoupon();
			toast(nextProps.message);
		}
	}

	onProductClickHandler = async data => {
		const response = await WooWorker.getProductId(data.product.product_id);

		this.props.onViewProduct({ product: response });
	};

	// renderCartItems = storeName => {
	// 	const isCompleted = find(this.completed, item => item === storeName);
	// 	console.log(isCompleted);
	// 	this.completed.push(storeName);
	// 	console.log(this.completed);
	// };

	getUniqueVendors = cartItems => uniqBy(cartItems, item => item.vendor.id);

	renderShippingOptions = storeName => {
		const { shippingMethods, userCountry } = this.props;

		if (userCountry === '') {
			return (
				<TouchableOpacity
					onPress={() => this.onPressShippingCalculation(storeName)}>
					<Text style={{ color: '#B888CB' }}>Calculate Shipping</Text>
				</TouchableOpacity>
			);
		} else {
			const currentVendor = find(
				shippingMethods,
				item => item.store_name === storeName
			);

			if (currentVendor.chosen_method) {
				let chosenMethod = find(
					currentVendor.available_methods,
					item => item.id === currentVendor.chosen_method
				);

				return (
					<TouchableOpacity
						onPress={() => this.onPressShippingCalculation(storeName)}>
						<Text style={{ color: '#B888CB' }}>
							{`${chosenMethod.label} ${currencyFormatter(chosenMethod.cost)}`}
						</Text>
					</TouchableOpacity>
				);
			} else {
				return (
					<Text style={{ color: 'red' }}>No shipping for this location</Text>
				);
			}
			// let newItem = [];
			// return shippingMethods.map(item => {
			// 	if (item.chosen_method) {
			// 		newItem = item.available_methods.filter(s => {
			// 			return item.chosen_method === s.id;
			// 		});
			// 	}
			// 	if (newItem.length === 0) {
			// 		console.log('mal nai');
			// 		return (
			// 			<TouchableOpacity
			// 				onPress={() => this.onPressShippingCalculation(storeName)}>
			// 				<Text style={{ color: '#B888CB' }}>No Shipping found</Text>
			// 			</TouchableOpacity>
			// 		);
			// 	} else {
			// 		console.log('mal ase');
			// 		return (
			// 			<TouchableOpacity
			// 				onPress={() => this.onPressShippingCalculation(storeName)}>
			// 				<Text style={{ color: '#B888CB' }}>Coming Soon</Text>
			// 			</TouchableOpacity>
			// 		);
			// 	}
			// });
		}
	};

	onPressShippingCalculation = storeName => {
		Events.openCartModal('modalShippingMethods', storeName);
	};

	render() {
		const {
			cartItems,
			totalPrice,
			totalItems,
			isFetching,
			discountType,
		} = this.props;
		// console.log(shippingMethods);
		// console.log(user.user.shipping.country);
		let couponBtn = Languages.ApplyCoupon;
		// let colors = [Color.darkOrange, Color.darkYellow, Color.yellow];
		const finalPrice =
			discountType == 'percent'
				? totalPrice - this.getExistCoupon() * totalPrice
				: totalPrice - this.getExistCoupon();

		if (isFetching) {
			couponBtn = 'Applying...';
		} else if (this.getExistCoupon() > 0) {
			colors = [Color.darkRed, Color.red];
			couponBtn = Languages.remove;
		}

		let uniqueVendors = this.getUniqueVendors(this.props.cartItems);

		return (
			<View style={styles.container}>
				<KeyboardAwareScrollView enableOnAndroid={true}>
					<View style={styles.list}>
						{this.props.isCartFetching && (
							<View
								style={{
									width: '100%',
									height: '100%',
									position: 'absolute',
									justifyContent: 'center',
									alignItems: 'center',
									backgroundColor: 'rgba(0, 0, 0, 0.5)',
									zIndex: 10,
								}}>
								<Spinkit color="#fff" />
							</View>
						)}
						{/* {this.props.isCartFetching ? <Spinkit /> : null} */}
						{cartItems &&
							uniqueVendors.map((item, index) => {
								let vendorIDtoMatch = item.vendor.id;
								return (
									<View style={{ marginVertical: 10 }} key={`cart${index}`}>
										<View style={css.row}>
											<Text style={[css.label, { fontWeight: 'bold' }]}>
												{item.vendor.store_name}
											</Text>
											{this.renderShippingOptions(item.vendor.store_name)}
										</View>
										{cartItems.map(
											(item, index) =>
												vendorIDtoMatch === item.vendor.id && (
													<SwipeRow
														key={index}
														disableRightSwipe
														leftOpenValue={75}
														rightOpenValue={-75}>
														{this.renderHiddenRow(item, index)}
														<ProductItem
															key={index}
															viewQuantity
															product={item.product ? item.product : item}
															onPress={() =>
																this.onProductClickHandler({
																	product: item.product ? item.product : item,
																})
															}
															variation={item.variation}
															quantity={item.quantity}
															isCartProduct
														/>
													</SwipeRow>
												)
										)}
									</View>
								);
							})}
					</View>
					<View style={styles.couponView}>
						<Text style={styles.couponLabel}>
							{Languages.CouponPlaceholder}:
						</Text>
						<View style={styles.row}>
							<TextInput
								value={this.state.coupon}
								onChangeText={coupon => this.setState({ coupon })}
								style={[
									styles.couponInput,
									this.getExistCoupon() > 0 && {
										backgroundColor: Color.lightgrey,
									},
								]}
								underlineColorAndroid="transparent"
								autoCapitalize="none"
								editable={this.getExistCoupon() == 0}
							/>

							<Button
								type="gradientBtn"
								size="sm"
								text={couponBtn}
								onPress={() => this.checkCouponCode()}
							/>
						</View>
						{this.getExistCoupon() > 0 && (
							<Text style={styles.couponMessage}>
								{Languages.applyCouponSuccess + this.getCouponString()}
							</Text>
						)}
					</View>
				</KeyboardAwareScrollView>
			</View>
		);
	}

	renderHiddenRow = (rowData, index) => {
		return (
			<TouchableOpacity
				key={`hiddenRow-${index}`}
				style={styles.hiddenRow}
				onPress={() =>
					this.props.deleteCartItem(rowData.key, this.props.token)
				}>
				<View style={{ marginRight: 23 }}>
					<FontAwesome name="trash" size={30} color="white" />
				</View>
			</TouchableOpacity>
		);
	};

	checkCouponCode = () => {
		if (this.state.coupon) {
			if (this.getExistCoupon() == 0) {
				this.props.getCouponAmount(this.state.coupon);
			} else {
				this.props.cleanOldCoupon();
			}
		} else {
			alert('No Coupon was Entered');
		}
	};

	getCouponString = () => {
		const { discountType } = this.props;
		const couponValue = this.getExistCoupon();
		if (discountType == 'percent') {
			return `${couponValue * 100}%`;
		}
		return currencyFormatter(couponValue);
	};

	getExistCoupon = () => {
		const { couponCode, couponAmount, discountType } = this.props;
		if (couponCode == this.state.coupon) {
			if (discountType == 'percent') {
				return couponAmount / 100.0;
			}
			return couponAmount;
		}
		return 0;
	};
}

MyCart.defaultProps = {
	couponCode: '',
	couponAmount: 0,
};

const mapStateToProps = ({ carts, products, user }) => {
	return {
		cartItems: carts.cartItems,
		totalPrice: carts.totalPrice,
		totalItems: carts.total,
		couponCode: products.coupon && products.coupon.code,
		couponAmount: products.coupon && products.coupon.amount,
		discountType: products.coupon && products.coupon.type,
		isCartFetching: carts.isFetching,
		isFetching: products.isFetching,
		type: products.type,
		message: products.message,
		token: user.token,
		user,
	};
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('@redux/CartRedux');
	const productActions = require('@redux/ProductRedux').actions;

	return {
		...ownProps,
		...stateProps,
		fetchAllCartItems: token => {
			actions.fetchAllCartItems(dispatch, token);
		},
		removeCartItem: (product, variation) => {
			actions.removeCartItem(dispatch, product, variation);
		},
		deleteCartItem: (productKey, token) => {
			actions.deleteCartItem(dispatch, productKey, token);
		},
		cleanOldCoupon: () => {
			productActions.cleanOldCoupon(dispatch);
		},
		getCouponAmount: coupon => {
			productActions.getCouponAmount(dispatch, coupon);
		},
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(MyCart);
