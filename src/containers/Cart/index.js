/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, AsyncStorage } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { Languages, Images, Config, Constants, Events } from '@common';
import { BlockTimer } from '@app/Omni';
import { StepIndicator, StripePanel, ModalBox, Spinner } from '@components';
import { isObject } from 'lodash';
import MyCart from './MyCart';
import Payment from './Payment';
import FinishOrder from './FinishOrder';
import PaymentEmpty from './Empty';
import Buttons from './Buttons';
import CancelSaveButtons from './CancelSaveButtons';
import styles from './styles';
import CartModal from './CartModal';

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
		addSpinner: PropTypes.func,
		removeSpinner: PropTypes.func,
		backgroundProductQue: PropTypes.array,
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
		this.setState({ userInfo: formValues });
	};

	closeStripeModal = () => {
		this.stripeModal.closeModal();
	};

	renderStripeLayout = () => {
		return (
			<ModalBox
				ref={smodal => (this.stripeModal = smodal)}
				swipeToClose={false}>
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
	totalItems: carts.totalItems,
	backgroundProductQue: carts.backgroundProductQue,
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
