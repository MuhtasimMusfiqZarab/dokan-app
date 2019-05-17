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
	AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { toast, IconIO } from '@app/Omni';
import { Languages, Config, Icons } from '@common';
import Buttons from '@cart/Buttons';
import WooWorker from '@services/WooCommerce/WooWorker';
import { LinearGradient } from '@expo';
import OrderSummary from './OrderSummary';
import styles from './styles';
import { requestOneTimePayment } from 'react-native-paypal';
import DokanWorker from '../../../services/Dokan/DokanWorker';

// const { width } = Dimensions.get('window');

class PaymentOptions extends PureComponent {
	static propTypes = {
		fetchPayments: PropTypes.func,
		message: PropTypes.any,
		type: PropTypes.string,
		cleanOldCoupon: PropTypes.func,
		onNext: PropTypes.func,
		user: PropTypes.object,
		userInfo: PropTypes.object,
		currency: PropTypes.any,
		payments: PropTypes.object,
		coupons: PropTypes.any,
		isLoading: PropTypes.bool,
		cartItems: PropTypes.any,
		onShowCheckOut: PropTypes.func,
		emptyCart: PropTypes.func,
		couponCode: PropTypes.any,
		couponId: PropTypes.any,
		couponAmount: PropTypes.any,
		shippingMethods: PropTypes.any,
		onChangeUserInfo: PropTypes.any,
		onPrevious: PropTypes.any,
		deleteCart: PropTypes.any,
		navigation: PropTypes.any,
		addSpinner: PropTypes.any,
		removeSpinner: PropTypes.any,
	};

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			selectedIndex: 0,
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
			// this.props.cleanOldCoupon();
			this.props.onNext();
		}
	}

	handlePaypalPayment = async payload => {
		this.props.addSpinner();

		const createOrderResponse = await WooWorker.createNewOrder(
			payload,
			response => {
				return response;
			},
			error => {
				return error;
			}
		);

		const orderID = createOrderResponse.id;
		const amount = parseFloat(createOrderResponse.total).toFixed(2);
		const currency = createOrderResponse.currency;

		if (orderID) {
			const { client_token } = await DokanWorker.getBrainTreeToken();

			try {
				const response = await requestOneTimePayment(client_token, {
					amount: amount,
					currency: currency,
					localeCode: 'en_US',
					shippingAddressRequired: false,
					userAction: 'commit',
					intent: 'authorize',
				});

				const transaction = await DokanWorker.brainTreeTransaction(
					amount,
					response.nonce
				);

				if (transaction.success) {
					const status = 'completed';

					WooWorker.setOrderStatus(orderID, status, () => {
						this.props.deleteCart(this.props.user.token);
						this.props.emptyCart();
						this.props.removeSpinner();
						this.props.onNext();
					});
				} else {
					this.props.removeSpinner();
					this.props.onNext();
					toast('Payment could not be processed!');
				}
			} catch (error) {
				this.props.removeSpinner();
				console.dir(error);
			}
		} else {
			toast('Failed to Create Order');
		}
	};

	nextStep = async () => {
		const { user, token } = this.props.user;
		const { currency } = this.props;
		const userString = await AsyncStorage.getItem('@userInfo');
		let userInfo = null;

		if (userString !== null) {
			try {
				userInfo = JSON.parse(userString);
			} catch (error) {}
		}

		if (userInfo === null) {
			this.props.navigation.navigate('Address', { from: 'CartScreen' });
			toast('Please Confirm your Shipping Address');
			return;
		}

		const { list } = this.props.payments;
		const payload = {
			// token,
			customer_id: user.id,
			set_paid: false,
			payment_method: list[this.state.selectedIndex].id,
			payment_method_title: list[this.state.selectedIndex].title,
			billing: {
				...user.billing,
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
			shipping_lines: this.getShippingMethods(),
			coupon_lines: this.getCoupons(),
			customer_note: typeof userInfo.note !== 'undefined' ? userInfo.note : '',
			currency: currency.code,
		};

		const isNoShipping = filter(
			this.props.shippingMethods,
			item => item.chosen_method === false
		);

		// if shipping is available create order else return
		if (isNoShipping.length === 0) {
			this.setState({ loading: this.props.isLoading });

			if (list[this.state.selectedIndex].id == 'cod') {
				this.setState({ loading: true });

				WooWorker.createNewOrder(
					payload,
					response => {
						this.setState({ loading: false });
						console.log(response);
						this.props.deleteCart(this.props.user.token);
						this.props.emptyCart();
						this.props.onNext();
					},
					response => {
						console.log(response);
						this.setState({ loading: false });
					}
				);
			} else if (list[this.state.selectedIndex].id === 'paypal') {
				this.handlePaypalPayment(payload);
			} else {
				// other kind of payment
				this.props.onShowCheckOut(payload, list[this.state.selectedIndex].id);
			}
		} else {
			toast('Some items cannot be shipped. Please review your Cart');
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
				item.variation_id = cartItem.variation_id;
			}
			items.push(item);
		}
		return items;
	};

	getCoupons = () => {
		const { coupons } = this.props;

		return coupons.map(item => {
			return { code: item.code };
		});
	};

	getShippingMethods = () => {
		const { shippingMethods } = this.props;
		const items = [];
		shippingMethods.map(item => {
			if (item.available_methods.length !== 0) {
				let chosenShippingID = item.chosen_method;
				let chosenShippingObject = filter(
					item.available_methods,
					item => item.id === chosenShippingID
				);

				let shippingObj = {
					method_title: chosenShippingObject[0].label,
					method_id: chosenShippingObject[0].id,
					total: chosenShippingObject[0].cost,
				};
				items.push(shippingObj);
			}
		});

		return items;
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
				<ScrollView style={{ padding: 15 }}>
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

					<Text style={styles.label}>Order Summary</Text>
					<OrderSummary
						cartItems={this.props.cartItems}
						shippingMethods={this.props.shippingMethods}
						coupons={this.props.coupons}
					/>
				</ScrollView>

				<Buttons
					// isAbsolute
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
		shippingMethods: carts.shippingMethods,
		coupons: carts.coupons,
		message: carts.message,
		customerInfo: carts.customerInfo,
		// couponCode: products.coupon && products.coupon.code,
		// couponAmount: products.coupon && products.coupon.amount,
		// discountType: products.coupon && products.coupon.type,
		// couponId: products.coupon && products.coupon.id,
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
		deleteCart: token => {
			CartRedux.actions.deleteCart(dispatch, token);
		},
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(PaymentOptions);
