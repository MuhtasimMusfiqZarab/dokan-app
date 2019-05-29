/** @format */

import React, { PureComponent } from 'react';
import {
	Text,
	View,
	Keyboard,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { SwipeRow } from 'react-native-swipe-list-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { uniqBy, find } from 'lodash';
import { currencyFormatter, toast, Icon } from '@app/Omni';
import { ProductItem, Button, Spinkit } from '@components';
import { Languages, Color, Events, Icons } from '@common';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import css from '@cart/styles';
import styles from './styles';
import WooWorker from '@services/WooCommerce/WooWorker';
import { NavigationActions } from 'react-navigation';

class MyCart extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			// coupon: props.couponCode,
			coupon: '',
			isLoading: true,
		};
	}

	componentDidMount() {
		this.props.getAllCoupons(this.props.token);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		// if (
		// 	nextProps.hasOwnProperty('type') &&
		// 	nextProps.type == 'GET_COUPON_CODE_FAIL' &&
		// 	nextProps.message
		// ) {
		// 	this.props.cleanOldCoupon();
		// 	toast(nextProps.message);
		// }
		if (nextProps.cartMsg) {
			toast(nextProps.cartMsg);
			this.props.resetCartmsg();
		}
	}

	onProductClickHandler = async data => {
		this.props.addSpinner();
		const response = await WooWorker.getProductId(data.product.product_id);
		this.props.removeSpinner();

		const navigateAction = NavigationActions.navigate({
			routeName: 'DetailScreen',
			params: {
				product: response,
			},
			key: `DetailScreen-step-${data.product.product_id}`,
		});
		this.props.navigation.dispatch(navigateAction);
	};

	getUniqueVendors = cartItems => uniqBy(cartItems, item => item.vendor.id);

	renderShippingOptions = storeName => {
		const { shippingMethods, userCountry } = this.props;

		if (userCountry === '') {
			return (
				<TouchableOpacity
					style={{ flexDirection: 'row' }}
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
						style={{ flexDirection: 'row' }}
						onPress={() => this.onPressShippingCalculation(storeName)}>
						<Text style={{ color: '#B888CB' }}>
							{`${chosenMethod.label} ${currencyFormatter(chosenMethod.cost)}`}
						</Text>
						<Icon
							name={Icons.MaterialCommunityIcons.DownChevron}
							size={18}
							color="#B888CB"
						/>
					</TouchableOpacity>
				);
			} else {
				// return (
				// 	<Text style={{ color: Color.blackTextDisable }}>No shipping</Text>
				// );
				return (
					<TouchableOpacity
						style={{ flexDirection: 'row' }}
						onPress={() => this.onPressShippingCalculation(storeName)}>
						<Text style={{ color: '#B888CB' }}>No Shipping</Text>
						<Icon
							name={Icons.MaterialCommunityIcons.DownChevron}
							size={18}
							color="#B888CB"
						/>
					</TouchableOpacity>
				);
			}
		}
	};

	onPressShippingCalculation = storeName => {
		Events.openCartModal('modalShippingMethods', storeName);
	};

	render() {
		const { cartItems, isCartFetching } = this.props;

		let uniqueVendors = this.getUniqueVendors(this.props.cartItems);

		return (
			<View style={styles.container}>
				<KeyboardAwareScrollView
					enableOnAndroid={true}
					keyboardShouldPersistTaps="always">
					<View style={styles.list}>
						{isCartFetching && (
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
									// this.getExistCoupon() > 0 && {
									// 	backgroundColor: Color.lightgrey,
									// },
									this.props.isCartFetching ||
										(this.props.isCouponApplying && {
											backgroundColor: Color.lightgrey,
										}),
								]}
								underlineColorAndroid="transparent"
								autoCapitalize="none"
								// editable={this.getExistCoupon() == 0}
								editable={this.props.isCartFetching ? false : true}
							/>

							<Button
								// isDisabled={this.props.isCartFetching}
								type="gradientBtn"
								size="sm"
								text={Languages.ApplyCoupon}
								onPress={() => this.checkCouponCode()}
								isLoading={this.props.isCouponApplying}
							/>
						</View>

						{this.props.coupons.length > 0 &&
							this.props.coupons.map((item, index) => (
								<Text key={index} style={styles.couponMessage}>
									{`"${item.code}" ${parseInt(item.amount)} ${
										item.discount_type === 'percent' ? '%' : item.discount_type
									} is applied to ${item.store_name}`}
								</Text>
							))}
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
			Keyboard.dismiss();
			this.props.applyCoupon(this.state.coupon, this.props.token);
			this.setState({ coupon: '' });
		} else {
			toast('Enter Coupon Code');
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
		coupons: carts.coupons,
		// couponCode: products.coupon && products.coupon.code,
		// couponAmount: products.coupon && products.coupon.amount,
		// discountType: products.coupon && products.coupon.type,
		isCartFetching: carts.isFetching,
		isCouponApplying: carts.isCouponApplying,
		isFetching: products.isFetching,
		type: products.type,
		message: products.message,
		cartMsg: carts.message,
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
		applyCoupon: (couponCode, token) => {
			actions.applyCoupon(dispatch, couponCode, token);
		},
		getAllCoupons: token => {
			actions.getAllCoupons(dispatch, token);
		},
		resetCartmsg: () => {
			actions.resetCartmsg(dispatch);
		},
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(MyCart);
