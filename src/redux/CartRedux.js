/** @format */

import { Languages } from '@common';
import WooWorker from '@services/WooCommerce/WooWorker';
import DokanWorker from '@services/Dokan/DokanWorker';
import Validate from '../ultils/Validate.js';

const types = {
	FETCH_ALL_CART_ITEM: 'FETCH_ALL_CART_ITEM',
	ADD_CART_ITEM: 'ADD_CART_ITEM',
	REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
	DELETE_CART_ITEM: 'DELETE_CART_ITEM',
	UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
	UPDATE_CART_ITEM_PENDING: 'UPDATE_CART_ITEM_PENDING',
	EMPTY_CART: 'EMPTY_CART',
	UPDATE_CART_LOCAL: 'UPDATE_CART_LOCAL',
	REMOVE_CART_ITEM_LOCAL: 'REMOVE_CART_ITEM_LOCAL',
	CREATE_NEW_ORDER_PENDING: 'CREATE_NEW_ORDER_PENDING',
	CREATE_NEW_ORDER_SUCCESS: 'CREATE_NEW_ORDER_SUCCESS',
	CREATE_NEW_ORDER_ERROR: 'CREATE_NEW_ORDER_ERROR',
	VALIDATE_CUSTOMER_INFO: 'VALIDATE_CUSTOMER_INFO',
	INVALIDATE_CUSTOMER_INFO: 'INVALIDATE_CUSTOMER_INFO',
	FETCH_MY_ORDER: 'FETCH_MY_ORDER',
	FETCH_MY_ORDER_PENDING: 'FETCH_MY_ORDER_PENDING',
	FETCH_CART_PENDING: 'FETCH_CART_PENDING',
	GET_SHIPPING_METHOD_PENDING: 'GET_SHIPPING_METHOD_PENDING',
	GET_SHIPPING_METHOD_SUCCESS: 'GET_SHIPPING_METHOD_SUCCESS',
	GET_SHIPPING_METHOD_FAIL: 'GET_SHIPPING_METHOD_FAIL',
	SELECTED_SHIPPING_METHOD: 'SELECTED_SHIPPING_METHOD',
	CALCULATE_SHIPPING_PENDING: 'CALCULATE_SHIPPING_PENDING',
	CALCULATE_SHIPPING_FAILED: 'CALCULATE_SHIPPING_FAILED',
	CALCULATE_SHIPPING_SUCCESS: 'CALCULATE_SHIPPING_SUCCESS',
	// POST_COUPON_PENDING: 'POST_COUPON_PENDING',
	// POST_COUPON_FAILED: 'POST_COUPON_FAILED',
	GET_COUPON_PENDING: 'GET_COUPON_PENDING',
	GET_COUPON_SUCCESS: 'GET_COUPON_SUCCESS',
	APPLY_COUPON_FAILED: 'APPLY_COUPON_FAILED',
	RESET_CART_MSG: 'RESET_CART_MSG',
	SET_BACKGROUND_PRODUCT_QUE: 'SET_BACKGROUND_PRODUCT_QUE',
	CLEAR_BACKGROUND_PRODUCT_QUE: 'CLEAR_BACKGROUND_PRODUCT_QUE',
};

export const actions = {
	fetchAllCartItems: (dispatch, token) => {
		dispatch({ type: types.FETCH_CART_PENDING });

		DokanWorker.fetchAllCartItems(token)
			.then(data => {
				return data;
			})
			.then(cartData => {
				DokanWorker.getShippingMethods(token).then(shippingData => {
					dispatch({
						type: types.FETCH_ALL_CART_ITEM,
						product: cartData.cartProduct,
						totalPrice: cartData.cartTotalPrice,
						totalItems: cartData.cartTotalItems,
						subTotal: cartData.cartSubTotal,
						discount: cartData.discount,
						shippingTotal: cartData.shippingTotal,
						shippingMethods: shippingData,
						message: '',
					});
				});
			})
			.catch(error => {
				console.log(error);
			});
	},
	addCartItem: (dispatch, product, variation, token) => {
		dispatch({ type: types.FETCH_CART_PENDING });

		if (variation === null) {
			DokanWorker.addCartItem(product.id, null, 1, token)
				.then(() => {
					actions.fetchAllCartItems(dispatch, token);
				})
				.catch(error => {
					console.log(error);
					// toast('Something Went Wrong');
				});
		} else {
			DokanWorker.addCartItem(null, variation.id, 1, token)
				.then(() => {
					actions.fetchAllCartItems(dispatch, token);
				})
				.catch(error => {
					console.log(error);
					// toast('Something Went Wrong');
				});
		}
	},
	addCartItemsBatch: (dispatch, items, token) => {
		dispatch({ type: types.FETCH_CART_PENDING });

		let itemsArray = [];

		items.forEach(item => {
			if (item.product) {
				let data = {
					product_id: item.product.id,
					quantity: item.quantity,
				};
				itemsArray.push(data);
			} else {
				if (item.variation_id) {
					let data = {
						variation_id: item.variation_id,
						quantity: item.quantity,
					};
					itemsArray.push(data);
				} else {
					let data = {
						product_id: item.product_id,
						quantity: item.quantity,
					};
					itemsArray.push(data);
				}
			}
		});

		// First delete the existing cart
		DokanWorker.deleteCart(token)
			.then(data => {
				if (data.length === 0) {
					// Then add batch items
					DokanWorker.addCartItemsBatch(itemsArray, token)
						.then(data => {
							if (data.create.length !== 0) {
								actions.fetchAllCartItems(dispatch, token);
							} else {
								console.log('Failed to add multiple items to cart');
							}
						})
						.catch(error => console.log(error));
				} else {
					console.log('failed to delete cart');
				}
			})
			.catch(error => console.log(error));
	},
	fetchMyOrder: (dispatch, user) => {
		dispatch({ type: types.FETCH_MY_ORDER_PENDING });

		WooWorker.ordersByCustomerId(user.id, 40, 1)
			.then(data => {
				dispatch({
					type: types.FETCH_MY_ORDER,
					data,
				});
			})
			.catch(error => {
				console.log(error);
			});
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
	deleteCart: (dispatch, token) => {
		DokanWorker.deleteCart(token)
			.then(() => {
				dispatch({
					type: types.EMPTY_CART,
				});
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
	updateCartItemLocally: (dispatch, productKey, quantity, updateType) => {
		dispatch({
			type: types.UPDATE_CART_LOCAL,
			productKey: productKey,
			quantity: quantity,
			updateType: updateType,
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
	applyCoupon: (dispatch, code, token) => {
		dispatch({
			type: types.GET_COUPON_PENDING,
		});
		DokanWorker.postCoupon(code, token)
			.then(data => {
				if (typeof data === 'string') {
					dispatch({
						type: types.APPLY_COUPON_FAILED,
						message: data,
					});
				} else {
					DokanWorker.getCoupons(token)
						.then(data => {
							dispatch({
								type: types.GET_COUPON_SUCCESS,
								coupons: data,
							});
							actions.fetchAllCartItems(dispatch, token);
						})
						.catch(error => {
							console.log(error);
						});
				}
			})
			.catch(error => {
				console.log(error);
			});
	},
	getAllCoupons: (dispatch, token) => {
		DokanWorker.getCoupons(token)
			.then(data => {
				dispatch({
					type: types.GET_COUPON_SUCCESS,
					coupons: data,
				});
			})
			.catch(error => {
				console.log(error);
			});
	},
	validateCustomerInfo: (dispatch, customerInfo, type) => {
		const { first_name, last_name, address_1, email, phone } = customerInfo;
		if (type === 'shipping') {
			if (
				first_name.length == 0 ||
				last_name.length == 0
				// address_1.length == 0
			) {
				dispatch({
					type: types.INVALIDATE_CUSTOMER_INFO,
					message: Languages.RequireEnterAllFileds,
				});
			} else {
				dispatch({
					type: types.VALIDATE_CUSTOMER_INFO,
					message: '',
					customerInfo,
				});
			}
		} else {
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
	resetCartmsg: dispatch => {
		dispatch({
			type: types.RESET_CART_MSG,
		});
	},
	setBackgroundProductsQue: (dispatch, product) => {
		dispatch({ type: types.SET_BACKGROUND_PRODUCT_QUE, product: product });
	},
	clearBackgroundProductsQue: dispatch =>
		dispatch({
			type: types.CLEAR_BACKGROUND_PRODUCT_QUE,
		}),
};

const initialState = {
	backgroundProductQue: [],
	cartItems: [],
	totalItems: 0,
	totalPrice: 0,
	subTotal: 0,
	discount: 0,
	shippingTotal: 0,
	shippingMethods: [],
	coupons: [],
	myOrders: [],
	isFetching: false,
	isOrderFetching: false,
	isCouponApplying: false,
	message: '',
};

export const reducer = (state = initialState, action) => {
	const {
		type,
		product,
		subTotal,
		discount,
		shippingTotal,
		totalPrice,
		totalItems,
		shippingMethods,
		coupons,
		message,
		productKey,
		quantity,
		updateType,
	} = action;

	switch (type) {
		case types.FETCH_ALL_CART_ITEM: {
			return Object.assign({}, state, {
				cartItems: product,
				subTotal: subTotal,
				discount: discount,
				shippingTotal: shippingTotal,
				totalItems: totalItems,
				totalPrice: Number(totalPrice),
				shippingMethods: shippingMethods,
				isFetching: false,
				isCouponApplying: false,
				message,
			});
		}
		case types.ADD_CART_ITEM: {
			return Object.assign({}, state, {
				cartItems: product,
				totalItems: totalItems,
				totalPrice: Number(totalPrice),
				shippingMethods: shippingMethods,
				isFetching: false,
			});
		}
		case types.DELETE_CART_ITEM: {
			return Object.assign({}, state, {
				cartItems: product,
				totalItems: totalItems,
				totalPrice: Number(totalPrice),
				shippingMethods: shippingMethods,
				isFetching: false,
			});
		}
		case types.UPDATE_CART_ITEM: {
			return Object.assign({}, state, {
				cartItems: product,
				totalItems: totalItems,
				totalPrice: Number(totalPrice),
				shippingMethods: shippingMethods,
				isFetching: false,
			});
		}
		case types.UPDATE_CART_LOCAL: {
			const currentProductPrice = state.cartItems.filter(
				item => item.key === productKey
			)[0].data.price;
			const updatedCartItems = state.cartItems.map(item => {
				if (item.key === productKey) {
					item.quantity = quantity;
					return item;
				} else {
					return item;
				}
			});

			return Object.assign({}, state, {
				cartItems: updatedCartItems,
				totalPrice:
					updateType === 'increase'
						? parseFloat(state.totalPrice) + parseFloat(currentProductPrice)
						: parseFloat(state.totalPrice) - parseFloat(currentProductPrice),
				subTotal:
					updateType === 'increase'
						? parseFloat(state.subTotal) + parseFloat(currentProductPrice)
						: parseFloat(state.subTotal) - parseFloat(currentProductPrice),
				totalItems:
					updateType === 'increase'
						? state.totalItems + 1
						: state.totalItems - 1,
			});
		}
		case types.EMPTY_CART:
			return Object.assign({}, state, {
				type: types.EMPTY_CART,
				cartItems: [],
				totalItems: 0,
				totalPrice: 0,
				shippingMethods: [],
				coupons: [],
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
							total: state.totalItems - 1,
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
		case types.FETCH_MY_ORDER_PENDING: {
			return {
				...state,
				isOrderFetching: true,
			};
		}
		case types.FETCH_MY_ORDER:
			return Object.assign({}, state, {
				type: types.FETCH_MY_ORDER,
				isOrderFetching: false,
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
		case types.GET_COUPON_PENDING: {
			return Object.assign({}, state, {
				...state,
				isCouponApplying: true,
			});
		}
		case types.GET_COUPON_SUCCESS: {
			return Object.assign({}, state, {
				...state,
				coupons: coupons,
			});
		}
		case types.APPLY_COUPON_FAILED: {
			return Object.assign({}, state, {
				...state,
				isCouponApplying: false,
				message: message,
			});
		}
		case types.RESET_CART_MSG: {
			return Object.assign({}, state, {
				...state,
				message: '',
			});
		}
		case types.SET_BACKGROUND_PRODUCT_QUE: {
			if (state.backgroundProductQue.length === 0) {
				return {
					...state,
					backgroundProductQue: state.backgroundProductQue.concat(product),
				};
			} else {
				const newArray = state.backgroundProductQue.map(item => {
					if (item.key === product.key) {
						return {
							...item,
							quantity: product.quantity,
						};
					} else {
						return state.backgroundProductQue.concat(product);
					}
				});

				return {
					...state,
					backgroundProductQue: newArray,
				};
			}
		}
		case types.CLEAR_BACKGROUND_PRODUCT_QUE: {
			return {
				...state,
				backgroundProductQue: [],
			};
		}
		default: {
			return state;
		}
	}
};
