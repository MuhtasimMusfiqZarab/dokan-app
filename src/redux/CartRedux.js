/** @format */

import { toast } from '@app/Omni';
import { Constants, Languages } from '@common';
import WooWorker from '@services/WooCommerce/WooWorker';
import DokanWorker from '@services/Dokan/DokanWorker';
import Validate from '../ultils/Validate.js';
import { find, filter } from 'lodash';

const types = {
	FETCH_ALL_CART_ITEM: 'FETCH_ALL_CART_ITEM',
	ADD_CART_ITEM: 'ADD_CART_ITEM',
	REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
	DELETE_CART_ITEM: 'DELETE_CART_ITEM',
	UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
	UPDATE_CART_ITEM_PENDING: 'UPDATE_CART_ITEM_PENDING',
	EMPTY_CART: 'EMPTY_CART',
	CREATE_NEW_ORDER_PENDING: 'CREATE_NEW_ORDER_PENDING',
	CREATE_NEW_ORDER_SUCCESS: 'CREATE_NEW_ORDER_SUCCESS',
	CREATE_NEW_ORDER_ERROR: 'CREATE_NEW_ORDER_ERROR',
	VALIDATE_CUSTOMER_INFO: 'VALIDATE_CUSTOMER_INFO',
	INVALIDATE_CUSTOMER_INFO: 'INVALIDATE_CUSTOMER_INFO',
	FETCH_MY_ORDER: 'FETCH_MY_ORDER',
	FETCH_CART_PENDING: 'FETCH_CART_PENDING',
	GET_SHIPPING_METHOD_PENDING: 'GET_SHIPPING_METHOD_PENDING',
	GET_SHIPPING_METHOD_SUCCESS: 'GET_SHIPPING_METHOD_SUCCESS',
	GET_SHIPPING_METHOD_FAIL: 'GET_SHIPPING_METHOD_FAIL',
	SELECTED_SHIPPING_METHOD: 'SELECTED_SHIPPING_METHOD',
	CALCULATE_SHIPPING_PENDING: 'CALCULATE_SHIPPING_PENDING',
	CALCULATE_SHIPPING_FAILED: 'CALCULATE_SHIPPING_FAILED',
	CALCULATE_SHIPPING_SUCCESS: 'CALCULATE_SHIPPING_SUCCESS',
};

export const actions = {
	fetchAllCartItems: (dispatch, token) => {
		dispatch({ type: types.FETCH_CART_PENDING });

		DokanWorker.fetchAllCartItems(token)
			.then(data => data)
			.then(cartData => {
				DokanWorker.getShippingMethods(token).then(shippingData => {
					dispatch({
						type: types.FETCH_ALL_CART_ITEM,
						product: cartData.cartProduct,
						totalPrice: cartData.cartTotalPrice,
						totalItems: cartData.cartTotalItems,
						shippingMethods: shippingData,
					});
				});
			})
			.catch(error => {
				console.log(error);
			});
	},
	addCartItem: (dispatch, product, variation, token) => {
		dispatch({ type: types.FETCH_CART_PENDING });

		DokanWorker.addCartItem(product.id, 1, token)
			.then(() => {
				actions.fetchAllCartItems(dispatch, token);
			})
			.catch(error => {
				console.log(error);
				// toast('Something Went Wrong');
			});
	},
	fetchMyOrder: (dispatch, user) => {
		dispatch({ type: types.FETCH_CART_PENDING });

		WooWorker.ordersByCustomerId(user.id, 40, 1)
			.then(data => {
				dispatch({
					type: types.FETCH_MY_ORDER,
					data,
				});
			})
			.catch(err => {});
	},
	removeCartItem: (dispatch, product, variation) => {
		dispatch({
			type: types.REMOVE_CART_ITEM,
			product,
			variation,
		});
	},
	deleteCartItem: (dispatch, productKey, token) => {
		dispatch({ type: types.FETCH_CART_PENDING });

		DokanWorker.deleteCartItem(productKey, token)
			.then(() => {
				actions.fetchAllCartItems(dispatch, token);
			})
			.catch(error => {
				console.log(error);
			});
	},
	updateCartItem: (dispatch, productKey, quantity, token) => {
		dispatch({ type: types.UPDATE_CART_ITEM_PENDING });

		DokanWorker.updateCartItem(productKey, quantity, token)
			.then(() => {
				actions.fetchAllCartItems(dispatch, token);
			})
			.catch(error => {
				console.log(error);
			});
	},
	calculateShipping: (
		dispatch,
		token,
		countryCode = '',
		state = '',
		postCode = '',
		city = ''
	) => {
		dispatch({ type: types.CALCULATE_SHIPPING_PENDING });

		DokanWorker.calculateShipping(token, countryCode, state, postCode, city)
			.then(() => {
				actions.fetchAllCartItems(dispatch, token);
			})
			.catch(error => {
				console.log(error);
			});
	},
	updateShippingMethods: (dispatch, shippingMethodsObj, token) => {
		dispatch({ type: types.CALCULATE_SHIPPING_PENDING });

		DokanWorker.updateShippingMethod(shippingMethodsObj, token)
			.then(() => {
				actions.fetchAllCartItems(dispatch, token);
			})
			.catch(error => {
				console.log(error);
			});
	},
	emptyCart: dispatch => {
		dispatch({
			type: types.EMPTY_CART,
		});
	},
	validateCustomerInfo: (dispatch, customerInfo) => {
		const { first_name, last_name, address_1, email, phone } = customerInfo;
		if (
			first_name.length == 0 ||
			last_name.length == 0 ||
			// address_1.length == 0 ||
			email.length == 0 ||
			phone.length == 0
		) {
			dispatch({
				type: types.INVALIDATE_CUSTOMER_INFO,
				message: Languages.RequireEnterAllFileds,
			});
		} else if (!Validate.isEmail(email)) {
			dispatch({
				type: types.INVALIDATE_CUSTOMER_INFO,
				message: Languages.InvalidEmail,
			});
		} else {
			dispatch({
				type: types.VALIDATE_CUSTOMER_INFO,
				message: '',
				customerInfo,
			});
		}
	},
	createNewOrder: async (dispatch, payload) => {
		dispatch({ type: types.CREATE_NEW_ORDER_PENDING });
		const json = await WooWorker.createOrder(payload);

		// console.log('json', json);
		if (json.hasOwnProperty('id')) {
			// dispatch({type: types.EMPTY_CART});
			dispatch({ type: types.CREATE_NEW_ORDER_SUCCESS, orderId: json.id });
		} else {
			dispatch({
				type: types.CREATE_NEW_ORDER_ERROR,
				message: Languages.CreateOrderError,
			});
		}
	},
	getShippingMethod: async dispatch => {
		dispatch({ type: types.GET_SHIPPING_METHOD_PENDING });
		const json = await WooWorker.getShippingMethod();

		if (json === undefined) {
			dispatch({
				type: types.GET_SHIPPING_METHOD_FAIL,
				message: Languages.ErrorMessageRequest,
			});
		} else if (json.code) {
			dispatch({ type: types.GET_SHIPPING_METHOD_FAIL, message: json.message });
		} else {
			dispatch({ type: types.GET_SHIPPING_METHOD_SUCCESS, shippings: json });
		}
	},
	selectShippingMethod: (dispatch, shippingMethod) => {
		dispatch({ type: types.SELECTED_SHIPPING_METHOD, shippingMethod });
	},
	finishOrder: async dispatch => {
		dispatch({ type: types.CREATE_NEW_ORDER_SUCCESS });
	},
};

const initialState = {
	cartItems: [],
	total: 0,
	totalPrice: 0,
	shippingMethods: [],
	myOrders: [],
	isFetching: false,
	isUpdating: false,
};

export const reducer = (state = initialState, action) => {
	const { type, product, totalPrice, totalItems, shippingMethods } = action;

	switch (type) {
		case types.FETCH_ALL_CART_ITEM: {
			return Object.assign({}, state, {
				cartItems: product,
				total: totalItems,
				totalPrice: Number(totalPrice),
				shippingMethods: shippingMethods,
				isFetching: false,
			});
		}
		case types.ADD_CART_ITEM: {
			return Object.assign({}, state, {
				cartItems: product,
				total: totalItems,
				totalPrice: Number(totalPrice),
				shippingMethods: shippingMethods,
				isFetching: false,
			});
		}
		case types.DELETE_CART_ITEM: {
			return Object.assign({}, state, {
				cartItems: product,
				total: totalItems,
				totalPrice: Number(totalPrice),
				shippingMethods: shippingMethods,
				isFetching: false,
			});
		}
		case types.UPDATE_CART_ITEM: {
			return Object.assign({}, state, {
				cartItems: product,
				total: totalItems,
				totalPrice: Number(totalPrice),
				shippingMethods: shippingMethods,
				isFetching: false,
			});
		}
		case types.EMPTY_CART:
			return Object.assign({}, state, {
				type: types.EMPTY_CART,
				cartItems: [],
				total: 0,
				totalPrice: 0,
			});
		case types.REMOVE_CART_ITEM: {
			const index = state.cartItems.findIndex(cartItem =>
				compareCartItem(cartItem, action)
			); // check if existed
			return index == -1
				? state // This should not happen, but catch anyway
				: Object.assign(
						{},
						state,
						state.cartItems[index].quantity == 1
							? {
									cartItems: state.cartItems.filter(
										cartItem => !compareCartItem(cartItem, action)
									),
							  }
							: {
									cartItems: state.cartItems.map(item =>
										cartItem(item, action)
									),
							  },
						{
							total: state.total - 1,
							totalPrice:
								state.totalPrice -
								Number(
									action.variation === undefined ||
										action.variation == null ||
										action.variation.price === undefined
										? action.product.price
										: action.variation.price
								),
						}
				  );
		}
		case types.INVALIDATE_CUSTOMER_INFO:
			return Object.assign({}, state, {
				message: action.message,
				type: types.INVALIDATE_CUSTOMER_INFO,
			});
		case types.VALIDATE_CUSTOMER_INFO:
			return Object.assign({}, state, {
				message: null,
				type: types.VALIDATE_CUSTOMER_INFO,
				customerInfo: action.customerInfo,
			});
		case types.CREATE_NEW_ORDER_SUCCESS:
			return Object.assign({}, state, {
				type: types.CREATE_NEW_ORDER_SUCCESS,
				cartItems: [],
				total: 0,
				totalPrice: 0,
			});
		case types.CREATE_NEW_ORDER_ERROR:
			return Object.assign({}, state, {
				type: types.CREATE_NEW_ORDER_ERROR,
				message: action.message,
			});
		case types.FETCH_MY_ORDER:
			return Object.assign({}, state, {
				type: types.FETCH_MY_ORDER,
				isFetching: false,
				myOrders: action.data,
			});
		case types.FETCH_CART_PENDING: {
			return {
				...state,
				isFetching: true,
			};
		}
		case types.UPDATE_CART_ITEM_PENDING: {
			return {
				...state,
				isFetching: true,
			};
		}
		case types.GET_SHIPPING_METHOD_PENDING: {
			return Object.assign({}, state, {
				...state,
				isFetching: true,
				error: null,
			});
		}
		case types.GET_SHIPPING_METHOD_FAIL: {
			return Object.assign({}, state, {
				isFetching: false,
				error: action.error,
			});
		}
		case types.GET_SHIPPING_METHOD_SUCCESS: {
			return Object.assign({}, state, {
				isFetching: false,
				shippings: action.shippings,
				error: null,
			});
		}
		case types.SELECTED_SHIPPING_METHOD: {
			return Object.assign({}, state, {
				...state,
				shippingMethod: action.shippingMethod,
			});
		}
		case types.CALCULATE_SHIPPING_PENDING: {
			return Object.assign({}, state, {
				...state,
				isFetching: true,
			});
		}
		case types.CALCULATE_SHIPPING_SUCCESS: {
			return Object.assign({}, state, {
				...state,
				shippingMethods: shippingMethods,
				isFetching: false,
			});
		}
		default: {
			return state;
		}
	}
};

const compareCartItem = (cartItem, action) => {
	if (
		cartItem.variation !== undefined &&
		action.variation !== undefined &&
		cartItem.variation != null &&
		action.variation != null
	)
		return (
			cartItem.product.product_id === action.product.product_id &&
			cartItem.variation.variation_id === action.variation.variation_id
		);
	return cartItem.product.product_id === action.product.product_id;
};

const cartItem = (
	state = { product: undefined, quantity: 1, variation: undefined },
	action
) => {
	switch (action.type) {
		case types.ADD_CART_ITEM:
			return state.product === undefined
				? Object.assign({}, state, {
						product: action.product,
						variation: action.variation,
				  })
				: !compareCartItem(state, action)
				? state
				: Object.assign({}, state, {
						quantity:
							state.quantity < Constants.LimitAddToCart
								? state.quantity + 1
								: state.quantity,
				  });
		case types.REMOVE_CART_ITEM:
			return !compareCartItem(state, action)
				? state
				: Object.assign({}, state, { quantity: state.quantity - 1 });
		default:
			return state;
	}
};
