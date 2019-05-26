/**
 * @format
 */

import { Constants, Icons } from '@common';
import DokanWorker from '@services/Dokan/DokanWorker';

const types = {
	FETCH_VENDORS_PENDING: 'FETCH_VENDORS_PENDING',
	FETCH_VENDORS_MORE: 'FETCH_VENDORS_MORE',
	FETCH_VENDORS_SUCCESS: 'FETCH_VENDORS_SUCCESS',
	FETCH_VENDORS_FAILURE: 'FETCH_VENDORS_FAILURE',
	FETCH_FEATURED_VENDORS_PENDING: 'FETCH_FEATURED_VENDORS_PENDING',
	FETCH_FEATURED_VENDORS_SUCCESS: 'FETCH_FEATURED_VENDORS_SUCCESS',
	FETCH_FEATURED_VENDORS_FAILURE: 'FETCH_FEATURED_VENDORS_FAILURE',
	FETCH_VENDOR_PRODUCTS: 'FETCH_VENDOR_PRODUCTS',
	FETCH_VENDOR_PRODUCTS_PENDING: 'FETCH_VENDOR_PRODUCTS_PENDING',
	FETCH_VENDOR_PRODUCTS_SUCCESS: 'FETCH_VENDOR_PRODUCTS_SUCCESS',
	FETCH_VENDOR_PRODUCTS_FAILURE: 'FETCH_VENDOR_PRODUCTS_FAILURE',
	FETCH_VENDOR_REVIEWS_PENDING: 'FETCH_VENDOR_REVIEWS_PENDING',
	FETCH_VENDOR_REVIEWS_FAILURE: 'FETCH_VENDOR_REVIEWS_FAILURE',
	FETCH_VENDOR_REVIEWS_SUCCESS: 'FETCH_VENDOR_REVIEWS_SUCCESS',
	CLEAR_VENDORS: 'CLEAR_VENDORS',
	CLEAR_FEATURED_VENDORS: 'CLEAR_FEATURED_VENDORS',
	SWITCH_LAYOUT_VENDOR: 'SWITCH_LAYOUT_VENDOR',
};

export const actions = {
	fetchVendors: async (dispatch, page = 1, per_page = 5) => {
		dispatch({ type: types.FETCH_VENDORS_PENDING });

		const json = await DokanWorker.getVendors(page, per_page);

		if (json === undefined) {
			dispatch(actions.fetchVendorsFailure("Can't get data from server"));
		} else if (json.code) {
			dispatch(actions.fetchVendorsFailure(json.message));
		} else if (page > 1 && json.length !== 0) {
			dispatch(actions.fetchVendorMore(json));
		} else {
			dispatch(actions.fetchVendorsSuccess(json));
		}
	},
	fetchVendorsSuccess: items => {
		return { type: types.FETCH_VENDORS_SUCCESS, items };
	},
	fetchVendorMore: items => {
		return { type: types.FETCH_VENDORS_MORE, items };
	},
	fetchVendorsFailure: error => {
		return { type: types.FETCH_VENDORS_FAILURE, error };
	},
	fetchFeaturedVendors: async dispatch => {
		dispatch({ type: types.FETCH_FEATURED_VENDORS_PENDING });

		const json = await DokanWorker.getFeaturedVendors();

		if (json === undefined) {
			dispatch(
				actions.fetchFeaturedVendorsFailure("Can't get data from server")
			);
		} else if (json.code) {
			dispatch(actions.fetchFeaturedVendorsFailure(json.message));
		} else {
			dispatch(actions.fetchFeaturedVendorsSuccess(json));
		}
	},
	fetchFeaturedVendorsSuccess: items => {
		return { type: types.FETCH_FEATURED_VENDORS_SUCCESS, items };
	},
	fetchFeaturedVendorsFailure: error => {
		return { type: types.FETCH_FEATURED_VENDORS_FAILURE, error };
	},
	fetchVendorProducts: async (dispatch, vendorID) => {
		dispatch({ type: types.FETCH_VENDOR_PRODUCTS_PENDING });

		const json = await DokanWorker.getVendorProducts(vendorID);

		if (json === undefined) {
			dispatch(actions.fetchVendorProductFailure("Can't get data from server"));
		} else if (json.code) {
			dispatch(actions.fetchFeaturedVendorsFailure(json.message));
		} else {
			dispatch(actions.fetchVendorProductSuccess(json));
		}
	},
	fetchVendorProductSuccess: items => {
		return { type: types.FETCH_VENDOR_PRODUCTS_SUCCESS, items };
	},
	fetchVendorProductsFailure: error => {
		return { type: types.FETCH_VENDOR_PRODUCTS_FAILURE, error };
	},
	fetchReviewsByVendorId: async (dispatch, vendorId) => {
		dispatch({ type: types.FETCH_VENDOR_REVIEWS_PENDING });
		const json = await DokanWorker.getVendorReviews(vendorId);

		if (json === undefined) {
			dispatch({
				type: types.FETCH_VENDOR_REVIEWS_FAILURE,
				message: Languages.ErrorMessageRequest,
			});
		} else if (json.code) {
			dispatch({
				type: types.FETCH_VENDOR_REVIEWS_FAILURE,
				message: json.message,
			});
		} else {
			dispatch({ type: types.FETCH_VENDOR_REVIEWS_SUCCESS, reviews: json });
		}
	},
	clearVendors: dispatch => {
		dispatch({ type: types.CLEAR_VENDORS });
	},
	clearFeaturedVendors: dispatch => {
		dispatch({ type: types.CLEAR_FEATURED_VENDORS });
	},
	switchLayoutVendorPage: (layout, layoutChangeIcon) => {
		return { type: types.SWITCH_LAYOUT_VENDOR, layout, layoutChangeIcon };
	},
};

const initialState = {
	isFetching: false,
	isFeaturedFetching: false,
	finish: false,
	error: null,
	vendorList: [],
	featuredVendorList: [],
	vendorProducts: [],
	vendorReviews: [],
	selectedVendor: null,
	layoutVendorScreen: Constants.Layout.simple,
	layoutChangeIcon: Icons.MaterialCommunityIcons.Categories,
};

export const reducer = (state = initialState, action) => {
	const { type, error, items } = action;

	switch (type) {
		case types.FETCH_VENDORS_PENDING: {
			return {
				...state,
				isFetching: true,
				error: null,
			};
		}
		case types.FETCH_VENDORS_MORE: {
			return {
				...state,
				isFetching: false,
				vendorList: state.vendorList.concat(items),
				finish: items.length === 0,
				error: null,
			};
		}
		case types.FETCH_VENDORS_SUCCESS: {
			return {
				...state,
				isFetching: false,
				vendorList: state.vendorList.concat(items),
				// vendorList: items || [],
				finish: items.length === 0,
				error: null,
			};
		}
		case types.FETCH_VENDORS_FAILURE: {
			return {
				...state,
				isFetching: false,
				vendorList: [],
				error,
			};
		}
		case types.FETCH_FEATURED_VENDORS_PENDING: {
			return {
				...state,
				isFeaturedFetching: true,
				error: null,
			};
		}
		case types.FETCH_FEATURED_VENDORS_SUCCESS: {
			return {
				...state,
				isFeaturedFetching: false,
				featuredVendorList: items || [],
				error: null,
			};
		}
		case types.FETCH_FEATURED_VENDORS_FAILURE: {
			return {
				...state,
				isFetching: false,
				featuredVendorList: [],
				error,
			};
		}
		case types.CLEAR_VENDORS: {
			return {
				...state,
				vendorList: [],
			};
		}
		case types.CLEAR_FEATURED_VENDORS: {
			return {
				...state,
				featuredVendorList: [],
			};
		}
		case types.FETCH_VENDOR_REVIEWS_PENDING: {
			return Object.assign({}, state, {
				isFetching: true,
				error: null,
			});
		}
		case types.FETCH_VENDOR_REVIEWS_FAILURE: {
			return Object.assign({}, state, {
				isFetching: false,
				error,
			});
		}
		case types.FETCH_VENDOR_REVIEWS_SUCCESS: {
			return Object.assign({}, state, {
				isFetching: false,
				vendorReviews: action.reviews,
			});
		}
		case types.SET_SELECTED_VENDOR: {
			return {
				...state,
				selectedVendor: vendor,
			};
		}
		case types.FETCH_VENDOR_PRODUCTS_PENDING: {
			return {
				...state,
				isFetching: true,
				error: null,
			};
		}
		case types.FETCH_VENDOR_PRODUCTS_SUCCESS: {
			return {
				...state,
				isFetching: false,
				vendorProducts: items || [],
				error: null,
			};
		}
		case types.FETCH_VENDOR_PRODUCTS_FAILURE: {
			return {
				...state,
				isFetching: false,
				vendorProducts: [],
				error,
			};
		}
		case types.SWITCH_LAYOUT_VENDOR: {
			return {
				...state,
				layoutVendorScreen: action.layout,
				layoutChangeIcon: action.layoutChangeIcon,
			};
		}
		default: {
			return state;
		}
	}
};
