/** @format */

import React, { Component } from 'react';
import {
	Animated,
	Platform,
	RefreshControl,
	FlatList,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from '@components';
import { Constants, Languages, Color } from '@common';
import styles from './styles';
import OrderEmpty from './Empty';
import FilterButtons from './FilterButtons';
import WooWorker from '@services/WooCommerce/WooWorker';

const cardMargin = Constants.Dimension.ScreenWidth(0.05);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class MyOrders extends Component {
	state = {
		scrollY: new Animated.Value(0),
		activeSections: [],
		isSpinner: false,
		orderFilter: 'All',
	};

	componentDidMount() {
		this.fetchProductsData();
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.props.carts.cartItems != nextProps.carts.cartItems) {
			this.fetchProductsData();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			(typeof nextProps.carts.myOrders !== 'undefined' &&
				nextProps.carts.myOrders.length != this.props.carts.myOrders.length) ||
			nextState.isSpinner !== this.state.isSpinner ||
			nextState.orderFilter !== this.state.orderFilter
		);
	}

	fetchProductsData = () => {
		const { user } = this.props.user;
		if (typeof user === 'undefined' || user === null) return;

		this.props.fetchMyOrder(user);
	};

	renderError(error) {
		return (
			<OrderEmpty
				text={error}
				onReload={this.fetchProductsData}
				onViewHome={this.props.onViewHomeScreen}
			/>
		);
	}

	setSections = sections => {
		this.setState({
			activeSections: sections.includes(undefined) ? [] : sections,
		});
	};

	renderRow = ({ item }) => {
		const order = item;
		const products = order.line_items;

		if (typeof order.line_items === 'undefined') {
			return this.renderError(Languages.NoOrder);
		}

		const renderAttribute = (label, context, _style) => {
			return (
				<View style={styles.row}>
					<Text style={styles.rowLabel}>{label}</Text>
					<Text style={[styles.rowLabel, _style]}>{context}</Text>
				</View>
			);
		};

		const renderOrderDetails = products => {
			return (
				<View style={[styles.row, { marginBottom: 15 }]}>
					<View style={{ flex: 2 }}>
						{products.map((item, index) => {
							return (
								<Text
									key={`item-${index}`}
									style={{ color: '#000', fontSize: 16, marginBottom: 5 }}>
									{item.name} x {item.quantity}
								</Text>
							);
						})}
					</View>
					<View
						style={{
							flex: 1,
							alignItems: 'flex-end',
							justifyContent: 'center',
						}}>
						<Text style={{ color: Color.wdgray }}>Total Price</Text>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 16,
								fontFamily: Constants.fontFamilyLato,
								color: '#333',
							}}>
							{order.total} {order.currency}
						</Text>
					</View>
				</View>
			);
		};

		const dateFormat = date => {
			const year = date.substr(0, 4);
			const month = date.substr(5, 2);
			const day = date.substr(8, 2);
			return `${day}/${month}/${year}`;
		};

		const onPressOrderDetail = async () => {
			this.setState({ isSpinner: true });
			const response = await WooWorker.getOrderById(order.id);
			this.setState({ isSpinner: false });
			this.props.navigate('OrderDetail', { orderDetail: response });
		};

		return (
			<TouchableOpacity
				style={[styles.orderContainer, { marginHorizontal: cardMargin }]}
				onPress={() => onPressOrderDetail()}>
				{renderOrderDetails(products)}
				{renderAttribute('Order Code', `#${order.number}`, {
					color: '#E9485E',
				})}
				{renderAttribute(Languages.OrderDate, dateFormat(order.date_created))}
				{renderAttribute(Languages.OrderStatus, order.status.toUpperCase(), {
					color: '#1ABC9C',
				})}
				{renderAttribute(Languages.OrderPayment, order.payment_method_title, {
					color: '#1A9ED4',
				})}
			</TouchableOpacity>
		);
	};

	onSelectAll = () => {
		this.setState({ orderFilter: 'All' });
	};

	onSelectComplete = () => {
		this.setState({ orderFilter: 'Complete' });
	};

	render() {
		const { orderFilter } = this.state;
		let data = [];
		if (orderFilter === 'All') {
			data = this.props.carts.myOrders;
		} else {
			data = this.props.carts.myOrders.filter(
				order => order.status !== 'pending'
			);
		}
		const orderCount = data.length;

		if (typeof data === 'undefined' || data.length == 0) {
			return (
				<OrderEmpty
					text={Languages.NoOrder}
					onReload={this.fetchProductsData}
					onViewHome={this.props.onViewHomeScreen}
				/>
			);
		}

		return (
			<View style={styles.listView}>
				<FilterButtons
					onSelectAll={this.onSelectAll}
					onSelectComplete={this.onSelectComplete}
				/>
				<Text
					style={{
						margin: cardMargin,
						color: Color.wdDeepGray,
						fontSize: 20,
					}}>
					{orderCount > 1 ? `${orderCount} Items` : `${orderCount} Item`}
				</Text>
				<AnimatedFlatList
					data={data}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
						{ useNativeDriver: Platform.OS !== 'android' }
					)}
					scrollEventThrottle={1}
					keyExtractor={(item, index) => `${item.id} || ${index}`}
					contentContainerStyle={styles.flatlist}
					renderItem={this.renderRow}
					refreshControl={
						<RefreshControl
							refreshing={this.props.carts.isFetching}
							onRefresh={this.fetchProductsData}
						/>
					}
				/>
				{this.state.isSpinner ? (
					<Spinner mode="overlay" color="#000" backgroundColor="#E9E9EF" />
				) : null}
			</View>
		);
	}
}
const mapStateToProps = ({ user, carts }) => ({ user, carts });
function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('@redux/CartRedux');
	return {
		...ownProps,
		...stateProps,
		fetchMyOrder: user => {
			actions.fetchMyOrder(dispatch, user);
		},
	};
}
export default connect(
	mapStateToProps,
	null,
	mergeProps
)(MyOrders);
