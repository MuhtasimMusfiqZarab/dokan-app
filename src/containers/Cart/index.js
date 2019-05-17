/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	WebView,
	Text,
	TouchableOpacity,
	AsyncStorage,
	ScrollView,
	Dimensions,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { Languages, Images, Config, Constants, Events } from '@common';
import { BlockTimer } from '@app/Omni';
import Modal from 'react-native-modalbox';
import { StepIndicator, StripePanel, ModalBox, Spinner } from '@components';
import base64 from 'base-64';
import { isObject } from 'lodash';
import MyCart from './MyCart';
import Payment from './Payment';
import FinishOrder from './FinishOrder';
import PaymentEmpty from './Empty';
import Buttons from './Buttons';
import CancelSaveButtons from './CancelSaveButtons';
import styles from './styles';
import CartModal from './CartModal';
import { Button } from 'react-native-paper';
import { requestOneTimePayment } from 'react-native-paypal';

class Cart extends PureComponent {
	static propTypes = {
		user: PropTypes.object,
		onMustLogin: PropTypes.func.isRequired,
		finishOrder: PropTypes.func.isRequired,
		onBack: PropTypes.func.isRequired,
		navigation: PropTypes.object.isRequired,
		onFinishOrder: PropTypes.func.isRequired,
		onViewProduct: PropTypes.func,
		cartItems: PropTypes.array,
		onViewHome: PropTypes.func,
		emptyCart: PropTypes.any,
		isProcessing: PropTypes.bool,
		isCartFetching: PropTypes.bool,
		subTotal: PropTypes.any,
		shippingTotal: PropTypes.any,
		discount: PropTypes.number,
		totalPrice: PropTypes.number,
		totalItems: PropTypes.number,
		shippingMethods: PropTypes.array,
		updateShippingMethod: PropTypes.func,
	};

	static defaultProps = {
		cartItems: [],
	};

	constructor(props) {
		super(props);

		this.state = {
			currentIndex: 0,
			// createdOrder: {},
			userInfo: null,
			order: '',
			isLoading: false,
			orderId: null,
			paymentState: false,
			shouldOpenCartModal: false,
			bottomButtons: 'prevNext',
		};
		this.chosenShippingObj = {};

		this.props.navigation.setParams({
			title: `${Languages.ShoppingCart} (${this.props.totalItems})`,
		});
	}

	async componentDidMount() {
		this.props.shippingMethods.map(item => {
			this.chosenShippingObj[item.store_name] = item.chosen_method;
		});

		const userString = await AsyncStorage.getItem('@userInfo');
		let userInfo = null;

		if (userString !== null) {
			try {
				userInfo = JSON.parse(userString);
			} catch (error) {}
		}

		this.setState({ userInfo: userInfo });
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		// Update toal items number in Cart Header
		if (nextProps.totalItems !== this.props.totalItems) {
			this.props.navigation.setParams({
				title: `${Languages.ShoppingCart} (${nextProps.totalItems})`,
			});
		}

		// reset current index when update cart item
		if (this.props.cartItems && nextProps.cartItems) {
			if (nextProps.cartItems.length !== 0) {
				if (this.props.cartItems.length !== nextProps.cartItems.length) {
					this.updatePageIndex(0);
					this.onChangeTabIndex(0);
				}
			}
		}
	}

	checkUserLogin = () => {
		const { user } = this.props.user;
		if (user === null) {
			this.props.onMustLogin();
			return false;
		}
		return true;
	};

	onNext = () => {
		// close if cart modal is open
		Events.closeCartModal();

		// check validate before moving next
		let valid = true;
		switch (this.state.currentIndex) {
			case 0:
				valid = this.checkUserLogin();
				break;
			default:
				break;
		}
		if (valid && typeof this.tabCartView !== 'undefined') {
			const nextPage = this.state.currentIndex + 1;
			this.tabCartView.goToPage(nextPage);
		}
	};

	renderCheckOut = () => {
		const params = base64.encode(
			encodeURIComponent(JSON.stringify(this.state.order))
		);
		// warn(params)
		const userAgentAndroid =
			'Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30';

		const checkOutUrl = `${Config.WooCommerce.url}/${
			Constants.WordPress.checkout
		}?order=${params}`;

		// warn([checkOutUrl, this.state.order])
		return (
			<Modal
				ref={modal => (this.checkoutModal = modal)}
				backdropPressToClose={false}
				backButtonClose
				backdropColor="#fff"
				swipeToClose={true}>
				{/* <WebView
					style={styles.webView}
					source={{ uri: checkOutUrl }}
					userAgent={userAgentAndroid}
					onNavigationStateChange={status =>
						this._onNavigationStateChange(status)
					}
					scalesPageToFit
				/>
				<TouchableOpacity
					style={styles.iconZoom}
					onPress={() => this.checkoutModal.close()}>
					<Text style={styles.textClose}>{Languages.close}</Text>
        </TouchableOpacity> */}
				<Button mode="contained" onPress={() => this.handlePaypalPayment()}>
					Pay via Paypal
				</Button>
			</Modal>
		);
	};

	handlePaypalPayment = async () => {
		const clientToken =
			'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI0MzU1YWVkNjUwMzE4ZjFkNmExNGI3ODhhYjkxYzY2NmNiNTI4MjZhOTFkMGY3MjhjODRmMzQxNmZmODhiZDJmfGNyZWF0ZWRfYXQ9MjAxOS0wNS0xMFQwNToxNTo1Ni4wMDYwODk4MDcrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTJrcTRjdm10NDRjczRieWNcdTAwMjZwdWJsaWNfa2V5PXE3N25tcHoyYjhwZHB6cXIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMmtxNGN2bXQ0NGNzNGJ5Yy9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgifSwiY2hhbGxlbmdlcyI6W10sImVudmlyb25tZW50Ijoic2FuZGJveCIsImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy8ya3E0Y3ZtdDQ0Y3M0YnljL2NsaWVudF9hcGkiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tLzJrcTRjdm10NDRjczRieWMifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiTHVtaW5vdXMgSW5jIiwiY2xpZW50SWQiOm51bGwsInByaXZhY3lVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vcHAiLCJ1c2VyQWdyZWVtZW50VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3RvcyIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImFsbG93SHR0cCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsImVudmlyb25tZW50Ijoib2ZmbGluZSIsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJiaWxsaW5nQWdyZWVtZW50c0VuYWJsZWQiOnRydWUsIm1lcmNoYW50QWNjb3VudElkIjoibHVtaW5vdXNpbmMiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwibWVyY2hhbnRJZCI6IjJrcTRjdm10NDRjczRieWMiLCJ2ZW5tbyI6Im9mZiJ9';
		const {
			nonce,
			payerId,
			email,
			firstName,
			lastName,
			phone,
		} = await requestOneTimePayment(clientToken, {
			amount: '5', // required
			// any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
			currency: 'GBP',
			// any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
			localeCode: 'en_GB',
			shippingAddressRequired: false,
			userAction: 'commit', // display 'Pay Now' on the PayPal review page
			// one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
			intent: 'authorize',
		});

		console.log(nonce, payerId, email, firstName, lastName, phone);
	};

	_onClosedModal = () => {
		if (this.state.orderId !== null) {
			this.props.finishOrder();
			this.checkoutModal.close();
		}
		this.setState({ isLoading: false });
	};

	_onNavigationStateChange = status => {
		const { url } = status;

		if (
			url.indexOf(Config.WooCommerce.url) == 0 &&
			url.indexOf('order-received') != -1
		) {
			let params = status.url.split('?');
			if (params.length > 1) {
				params = params[1].split('&');
				params.forEach(val => {
					const now = val.split('=');
					if (now[0] == 'key' && now['1'].indexOf('wc_order') == 0) {
						this.setState({ orderId: now['1'].indexOf('wc_order') });
					}
				});
			}
		}
	};

	onShowCheckOut = async (order, payment) => {
		await this.setState({ order });
		if (payment === 'stripe') {
			this.stripeModal.openModal();
		}
		this.checkoutModal.open();
	};

	onPrevious = () => {
		if (this.state.currentIndex === 0) {
			this.props.onBack();
			return;
		}
		this.tabCartView.goToPage(this.state.currentIndex - 1);
	};

	updatePageIndex = page => {
		this.setState({ currentIndex: isObject(page) ? page.i : page });
	};

	onChangeTabIndex = page => {
		if (this.tabCartView) {
			this.tabCartView.goToPage(page);
		}
	};

	finishOrder = () => {
		const { onFinishOrder } = this.props;
		onFinishOrder();
		BlockTimer.execute(() => {
			this.tabCartView.goToPage(0);
		}, 1500);
	};

	onChangeUserInfo = formValues => {
		//weDevs
		this.setState({ userInfo: formValues });
	};

	closeStripeModal = () => {
		this.stripeModal.closeModal();
	};

	renderStripeLayout = () => {
		return (
			<ModalBox ref={smodal => (this.stripeModal = smodal)}>
				<StripePanel
					order={this.state.order}
					closeStripeModal={this.closeStripeModal}
					emptyCart={this.props.emptyCart}
					onNext={this.onNext}
				/>
			</ModalBox>
		);
	};

	openCartModal = () => {
		Events.openCartModal('modalCartTotal');
	};

	setBottomButtons = btnType => {
		btnType === 'cancelSave'
			? this.setState({ bottomButtons: 'cancelSave' })
			: this.setState({ bottomButtons: 'prevNext' });
	};

	onSelectNewShippingMethod = (storeName, shippingID) => {
		this.chosenShippingObj[storeName] = shippingID;
	};

	onCancelCartModal = () => {
		Events.closeCartModal();
	};
	onSaveCartModal = async () => {
		let shippingMethodsObj = {
			shipping_method: Object.values(this.chosenShippingObj),
		};

		await this.props.updateShippingMethod(
			shippingMethodsObj,
			this.props.user.token
		);

		Events.closeCartModal();
	};

	render() {
		const {
			onViewProduct,
			navigation,
			cartItems,
			onViewHome,
			isCartFetching,
			shippingMethods,
			user,
			addSpinner,
			removeSpinner,
		} = this.props;
		const { currentIndex, bottomButtons } = this.state;

		// console.log(user);

		if (currentIndex === 0 && cartItems && cartItems.length === 0) {
			return (
				<PaymentEmpty onViewHome={onViewHome} isCartFetching={isCartFetching} />
			);
		}

		const steps = [
			{
				label: Languages.MyCart,
				icon: Images.IconCartGradient,
				gradientColorFrom: '#F9769D',
				gradientColorTo: '#BB6DF7',
			},
			{
				label: Languages.Payment,
				icon: Images.IconPaymentGradient,
				gradientColorFrom: '#7ED500',
				gradientColorTo: '#00BF8D',
			},
			{
				label: Languages.Order,
				icon: Images.IconOrderGradient,
				gradientColorFrom: '#C444FB',
				gradientColorTo: '#5B56D7',
			},
		];

		return (
			<View style={styles.fill}>
				{this.renderCheckOut()}
				{this.props.isProcessing ? (
					<Spinner mode="overlay" color="#000" />
				) : null}

				<View style={styles.indicator}>
					<StepIndicator
						steps={steps}
						onChangeTab={this.onChangeTabIndex}
						currentIndex={currentIndex}
					/>
				</View>
				<View style={styles.content}>
					<ScrollableTabView
						ref={tabView => {
							this.tabCartView = tabView;
						}}
						locked
						onChangeTab={this.updatePageIndex}
						style={{ backgroundColor: '#fff' }}
						initialPage={0}
						tabBarPosition="overlayTop"
						prerenderingSiblingsNumber={1}
						contentProps={{ keyboardShouldPersistTaps: 'always' }}
						renderTabBar={() => <View style={{ padding: 0, margin: 0 }} />}>
						<MyCart
							key="cart"
              onNext={this.onNext}
              addSpinner={addSpinner}
							removeSpinner={removeSpinner}
							onPrevious={this.onPrevious}
							navigation={navigation}
							onViewProduct={onViewProduct}
							shippingMethods={shippingMethods}
							userCountry={user !== null ? user.user.billing.country : ''}
						/>
						<Payment
							key="payment"
							addSpinner={addSpinner}
							removeSpinner={removeSpinner}
							onPrevious={this.onPrevious}
							onNext={this.onNext}
							userInfo={this.state.userInfo}
							onChangeUserInfo={this.onChangeUserInfo}
							isLoading={this.state.isLoading}
							onShowCheckOut={this.onShowCheckOut}
							navigation={navigation}
						/>
						<FinishOrder key="finishOrder" finishOrder={this.finishOrder} />
					</ScrollableTabView>

					{this.renderStripeLayout()}
					<CartModal
						subTotal={this.props.subTotal}
						shippingTotal={this.props.shippingTotal}
						discount={this.props.discount}
						totalPrice={this.props.totalPrice}
						shippingMethods={shippingMethods}
						onSelectNewShippingMethod={this.onSelectNewShippingMethod}
						setBottomButtons={this.setBottomButtons}
						navigation={this.props.navigation}
						userCountry={user !== null ? user.user.billing.country : ''}
					/>
				</View>
				{currentIndex === 0 && bottomButtons === 'prevNext' && (
					<Buttons
						// isAbsolute
						onPrevious={this.onPrevious}
						onNext={this.onNext}
						totalPrice={this.props.totalPrice}
						isCartFetching={this.props.isCartFetching}
						openCartModal={this.openCartModal}
					/>
				)}
				{currentIndex === 0 && bottomButtons === 'cancelSave' && (
					<CancelSaveButtons
						// isAbsolute
						onCancelCartModal={this.onCancelCartModal}
						onSaveCartModal={this.onSaveCartModal}
						isCartFetching={this.props.isCartFetching}
					/>
				)}
			</View>
		);
	}
}

const mapStateToProps = ({ carts, user, spinner }) => ({
	cartItems: carts.cartItems,
	totalItems: carts.total,
	subTotal: carts.subTotal,
	shippingTotal: carts.shippingTotal,
	discount: carts.discount,
	totalPrice: carts.totalPrice,
	shippingMethods: carts.shippingMethods,
	user,
	isProcessing: spinner.isOpen,
	isCartFetching: carts.isFetching,
});
function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const CartRedux = require('@redux/CartRedux');
	const SpinnerRedux = require('@redux/SpinnerRedux');

	return {
		...ownProps,
		...stateProps,
		emptyCart: () => CartRedux.actions.emptyCart(dispatch),
		finishOrder: () => CartRedux.actions.finishOrder(dispatch),
		addSpinner: () => SpinnerRedux.actions.addSpinner(dispatch),
		removeSpinner: () => SpinnerRedux.actions.removeSpinner(dispatch),
		updateShippingMethod: (shippingMethodsObj, token) =>
			CartRedux.actions.updateShippingMethods(
				dispatch,
				shippingMethodsObj,
				token
			),
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(Cart);
