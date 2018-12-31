/**
 *
 * @format
 */

import { Constants, Icons } from "@common";
import DokanWorker from "@services/Dokan/DokanWorker";

const types = {
	FETCH_VENDORS_PENDING: "FETCH_VENDORS_PENDING",
	FETCH_VENDORS_SUCCESS: "FETCH_VENDORS_SUCCESS",
	FETCH_VENDORS_FAILURE: "FETCH_VENDORS_FAILURE",
	FETCH_FEATURED_VENDORS_PENDING: "FETCH_FEATURED_VENDORS_PENDING",
	FETCH_FEATURED_VENDORS_SUCCESS: "FETCH_FEATURED_VENDORS_SUCCESS",
	FETCH_FEATURED_VENDORS_FAILURE: "FETCH_FEATURED_VENDORS_FAILURE",
	FETCH_VENDOR_PRODUCTS: "FETCH_VENDOR_PRODUCTS",
	FETCH_VENDOR_PRODUCTS_PENDING: "FETCH_VENDOR_PRODUCTS_PENDING",
	FETCH_VENDOR_PRODUCTS_SUCCESS: "FETCH_VENDOR_PRODUCTS_SUCCESS",
	FETCH_VENDOR_PRODUCTS_FAILURE: "FETCH_VENDOR_PRODUCTS_FAILURE",
	FETCH_VENDOR_REVIEW: "FETCH_VENDOR_REVIEW",
	SWITCH_LAYOUT_VENDOR: "SWITCH_LAYOUT_VENDOR",
};

export const actions = {
	fetchVendors: async (dispatch) => {
		dispatch({ type: types.FETCH_VENDORS_PENDING });
		
		const json = await DokanWorker.getVendors();

		if (json === undefined) {
			dispatch(actions.fetchVendorsFailure("Can't get data from server"));
		} else if (json.code) {
			dispatch(actions.fetchVendorsFailure(json.message));
		} else {
			dispatch(actions.fetchVendorsSuccess(json));
		}
	},
	fetchVendorsSuccess: (items) => {
		return { type: types.FETCH_VENDORS_SUCCESS, items };
	},
	fetchVendorsFailure: (error) => {
		return { type: types.FETCH_VENDORS_FAILURE, error };
	},
	fetchFeaturedVendors: async (dispatch) => {
		dispatch({ type: types.FETCH_FEATURED_VENDORS_PENDING });
		
		const json = await DokanWorker.getFeaturedVendors();

		if (json === undefined) {
			dispatch(actions.fetchFeaturedVendorsFailure("Can't get data from server"));
		} else if (json.code) {
			dispatch(actions.fetchFeaturedVendorsFailure(json.message));
		} else {
			dispatch(actions.fetchFeaturedVendorsSuccess(json));
		}
	},
	fetchFeaturedVendorsSuccess: (items) => {
		return { type: types.FETCH_FEATURED_VENDORS_SUCCESS, items };
	},
	fetchFeaturedVendorsFailure: (error) => {
		return { type: types.FETCH_FEATURED_VENDORS_FAILURE, error };
	},
	fetchVendorProducts: async (dispatch, vendorID) => {
		dispatch({ type: types.FETCH_VENDOR_PRODUCTS_PENDING });

		const json = await DokanWorker.getVendorProducts(vendorID)

		if (json === undefined) {
			dispatch(actions.fetchVendorProductFailure("Can't get data from server"));
		} else if (json.code) {
			dispatch(actions.fetchFeaturedVendorsFailure(json.message));
		} else {
			dispatch(actions.fetchVendorProductSuccess(json));
		}
	},
	fetchVendorProductSuccess: (items) => {
		return { type: types.FETCH_VENDOR_PRODUCTS_SUCCESS, items };
	},
	fetchVendorProductsFailure: (error) => {
		return { type: types.FETCH_VENDOR_PRODUCTS_FAILURE, error };
	},
	switchLayoutVendorPage: (layout, layoutChangeIcon) => {
		return { type: types.SWITCH_LAYOUT_VENDOR, layout, layoutChangeIcon };
	},
};

const initialState = {
	isFetching: false,
	error: null,
	vendorList: [],
	featuredVendorList: [],
	vendorProducts: [],
	selectedVendor: null,
	layoutVendorScreen: Constants.Layout.twoColumn,
	layoutChangeIcon: Icons.MaterialCommunityIcons.Categories,
};

export const reducer = (state = initialState, action) => {
	const { type, mode, error, items, value } = action;

	switch (type) {
		case types.FETCH_VENDORS_PENDING: {
			return {
				...state,
				isFetching: true,
				error: null,
			};
		}
		case types.FETCH_VENDORS_SUCCESS: {
			return {
				...state,
				isFetching: false,
				vendorList: items || [],
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
				isFetching: true,
				error: null,
			};
		}
		case types.FETCH_FEATURED_VENDORS_SUCCESS: {
			return {
				...state,
				isFetching: false,
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
				error
			};
		}
		case types.SWITCH_LAYOUT_VENDOR: {
			return {
				...state,
				layoutVendorScreen: action.layout,
				layoutChangeIcon: action.layoutChangeIcon
			}
		}
		default: {
			return state;
		}
	}
};
