/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	Dimensions,
	ScrollView,
	View,
	Image,
	TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { toast, IconIO } from '@app/Omni';
import { Languages, Config, Icons } from '@common';
import Buttons from '@cart/Buttons';
import WooWorker from '@services/WooCommerce/WooWorker';
import styles from './styles';
import { LinearGradient } from '@expo';
import Delivery from '../Delivery';

// const { width } = Dimensions.get('window');

class PaymentOptions extends PureComponent {
	static propTypes = {
		fetchPayments: PropTypes.func,
		message: PropTypes.array,
		type: PropTypes.string,
		cleanOldCoupon: PropTypes.func,
		onNext: PropTypes.func,
		user: PropTypes.object,
		userInfo: PropTypes.object,
		currency: PropTypes.any,
		payments: PropTypes.object,
		isLoading: PropTypes.bool,
		cartItems: PropTypes.any,
		onShowCheckOut: PropTypes.func,
		emptyCart: PropTypes.func,
		couponCode: PropTypes.any,
		couponId: PropTypes.any,
		couponAmount: PropTypes.any,
		shippingMethod: PropTypes.any,
		onChangeUserInfo: PropTypes.any,
		onPrevious: PropTypes.any,
	};

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			// token: null,
			selectedIndex: 0,
			// accountNumber: '',
			// holderName: '',
			// expirationDate: '',
			// securityCode: '',
			// paymentState: '',
			// createdOrder: {},
			userDataSaved: false,
		};
	}

	UNSAFE_componentWillMount() {
		this.props.fetchPayments();
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.message && nextProps.message.length > 0) {
			// Alert.alert(Languages.Error, nextProps.carts.message)
			toast(nextProps.message);
		}

		if (
			nextProps.type !== this.props.type &&
			nextProps.type == 'CREATE_NEW_ORDER_SUCCESS'
		) {
			// warn(nextProps);
			this.props.cleanOldCoupon();
			this.props.onNext();
		}
	}

	nextStep = () => {
		if (this.state.userDataSaved) {
			const { user, token } = this.props.user;
			const { userInfo, currency } = this.props;
			const coupon = this.getCouponInfo();

			// Billing First name is a required field.
			// Billing Last name is a required field.
			// Billing Country is a required field.
			// Billing Street address is a required field.
			// Billing Town / City is a required field.

			let first_name = userInfo.first_name;
			let last_name = userInfo.last_name;
			let address_1 = userInfo.address_1;
			let city = userInfo.city;
			let state = userInfo.state;
			let country = userInfo.country;
			let postcode = userInfo.postcode;

			if (user && user.billing) {
				first_name = user.billing.first_name;
				last_name = user.billing.last_name;
				address_1 = user.billing.last_name;
				city = user.billing.city;
				state = user.billing.state;
				country = user.billing.country;
				postcode = user.billing.postcode;
			}

			const { list } = this.props.payments;
			const payload = {
				token,
				customer_id: user.id,
				set_paid: false,
				payment_method: list[this.state.selectedIndex].id,
				payment_method_title: list[this.state.selectedIndex].title,
				billing: {
					...user.billing,
					email: userInfo.email,
					phone: userInfo.phone,
					first_name: first_name,
					last_name: last_name,
					address_1: address_1,
					city: city,
					state: state,
					country: country,
					postcode: postcode,
				},
				shipping: {
					first_name: userInfo.first_name,
					last_name: userInfo.last_name,
					address_1: userInfo.address_1,
					city: userInfo.city,
					state: userInfo.state,
					country: userInfo.country,
					postcode: userInfo.postcode,
				},
				line_items: this.getItemsCart(),
				customer_note:
					typeof userInfo.note !== 'undefined' ? userInfo.note : '',
				currency: currency.code,
			};
			// check the shipping info
			if (Config.shipping.visible) {
				payload.shipping_lines = this.getShippingMethod();
			}

			// check the coupon
			if (coupon.length != 0) {
				payload.coupon_lines = this.getCouponInfo();
			}

			this.setState({ loading: this.props.isLoading });

			if (list[this.state.selectedIndex].id == 'cod') {
				// console.log(payload);
				this.setState({ loading: true });
				WooWorker.createNewOrder(
					payload,
					() => {
						this.setState({ loading: false });
						this.props.emptyCart();
						this.props.onNext();
					},
					response => {
						console.log(response);
						this.setState({ loading: false });
					}
				);
			} else {
				// other kind of payment
				this.props.onShowCheckOut(payload, list[this.state.selectedIndex].id);
			}
		} else {
			alert('Update your delivery information');
		}
	};

	getItemsCart = () => {
		const { cartItems } = this.props;
		const items = [];
		for (let i = 0; i < cartItems.length; i++) {
			const cartItem = cartItems[i];

			const item = {
				product_id: cartItem.product
					? cartItem.product.id
					: cartItem.product_id,
				quantity: cartItem.quantity,
			};

			if (cartItem.variation != null) {
				item.variation_id = cartItem.variation.id;
			}
			items.push(item);
		}
		return items;
	};

	getCouponInfo = () => {
		const { couponCode, couponAmount } = this.props;
		if (
			typeof couponCode !== 'undefined' &&
			typeof couponAmount !== 'undefined' &&
			couponAmount > 0
		) {
			return [
				{
					code: couponCode,
				},
			];
		}
		return {};
	};

	getShippingMethod = () => {
		const { shippingMethod } = this.props;

		if (typeof shippingMethod !== 'undefined') {
			return [
				{
					method_id: `${shippingMethod.method_id}:${shippingMethod.id}`,
					method_title: shippingMethod.title,
					total:
						shippingMethod.id == 'free_shipping' ||
						shippingMethod.method_id == 'free_shipping'
							? '0'
							: shippingMethod.settings.cost.value,
				},
			];
		}
		// return the free class as default
		return [
			{
				method_id: 'free_shipping',
				total: '0',
			},
		];
	};

	onSaveUserData = () => {
		// weDevs
		if (!this.state.userDataSaved) {
			this.setState({
				userDataSaved: true,
			});
		}
	};

	render() {
		const { list } = this.props.payments;

		return (
			<View style={styles.container}>
				<ScrollView>
					<Text style={styles.label}>{Languages.SelectPayment}:</Text>

					<View style={styles.paymentOption}>
						{list.map((item, index) => {
							if (!item.enabled) return null;
							const image =
								typeof Config.Payments[item.id] !== 'undefined' &&
								Config.Payments[item.id];
							return (
								<View style={styles.optionContainer} key={index}>
									<TouchableWithoutFeedback
										style={{ width: '100%', height: '100%' }}
										onPress={() => this.setState({ selectedIndex: index })}>
										<LinearGradient
											style={styles.optionGradient}
											start={{ x: 0, y: 0 }}
											end={{ x: 0.5, y: 1.0 }}
											locations={[0.1, 0.75, 1]}
											colors={
												this.state.selectedIndex === index
													? ['#FF9472', '#F88287', '#F2709C']
													: ['#fff', '#fff', '#fff']
											}>
											<Image
												style={[
													styles.imgOption,
													// this.state.selectedIndex === index &&
													//   {tintColor: "#fff"}
												]}
												source={image}
											/>
										</LinearGradient>
									</TouchableWithoutFeedback>
									{this.state.selectedIndex === index && (
										<View style={styles.tickMarkContainer} key={index}>
											<LinearGradient
												style={styles.tickMarkGradient}
												start={{ x: 0, y: 0 }}
												end={{ x: 0.5, y: 1.0 }}
												locations={[0.1, 0.75, 1]}
												colors={['#7ED500', '#3CC94A', '#00BF8D']}>
												<IconIO
													name={Icons.Ionicons.CheckMark}
													size={36}
													color="#fff"
												/>
											</LinearGradient>
										</View>
									)}
								</View>
							);
						})}
					</View>

					{/* <Delivery
						onChangeUserInfo={this.props.onChangeUserInfo}
						onSaveUserData={this.onSaveUserData}
					/> */}
				</ScrollView>

				<Buttons
					isAbsolute
					onPrevious={this.props.onPrevious}
					isLoading={this.state.loading}
					nextText={Languages.ConfirmOrder}
					onNext={this.nextStep}
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ payments, carts, user, products, currency }) => {
	return {
		payments,
		user,
		type: carts.type,
		cartItems: carts.cartItems,
		totalPrice: carts.totalPrice,
		message: carts.message,
		customerInfo: carts.customerInfo,
		couponCode: products.coupon && products.coupon.code,
		couponAmount: products.coupon && products.coupon.amount,
		discountType: products.coupon && products.coupon.type,
		couponId: products.coupon && products.coupon.id,
		shippingMethod: carts.shippingMethod,
		currency,
	};
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const CartRedux = require('@redux/CartRedux');
	const productActions = require('@redux/ProductRedux').actions;
	const paymentActions = require('@redux/PaymentRedux').actions;
	return {
		...ownProps,
		...stateProps,
		emptyCart: () => CartRedux.actions.emptyCart(dispatch),
		createNewOrder: payload => {
			CartRedux.actions.createNewOrder(dispatch, payload);
		},
		cleanOldCoupon: () => {
			productActions.cleanOldCoupon(dispatch);
		},
		fetchPayments: () => {
			paymentActions.fetchPayments(dispatch);
		},
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(PaymentOptions);
