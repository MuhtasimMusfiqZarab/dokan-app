/**
 * @format
 */

import { flatten } from "lodash";
import { HorizonLayouts, Languages } from "@common";
// import { warn } from '@app/Omni'
import WooWorker from "@services/WooCommerce/WooWorker";
import DokanWorker from "@services/Dokan/DokanWorker";

const types = {
	LAYOUT_FETCH_SUCCESS: "LAYOUT_FETCH_SUCCESS",
	LAYOUT_FETCH_MORE: "LAYOUT_FETCH_MORE",
	LAYOUT_FETCHING: "LAYOUT_FETCHING",
	LAYOUT_ALL_FETCHING: "LAYOUT_ALL_FETCHING",
	LAYOUT_ALL_FETCH_SUCCESS: "LAYOUT_ALL_FETCH_SUCCESS",
};

export const actions = {
	fetchAllProductsLayout: async (dispatch, page = 1) => {
		dispatch({ type: types.LAYOUT_ALL_FETCHING });

		const promises = [];
		HorizonLayouts.map((layout, index) => {
			promises.push(
				dispatch(
					actions.fetchProductsLayout(
						dispatch,
						layout.category,
						layout.tag,
						page,
						index,
						layout.name // weDevs
					)
				)
			);
		});
		Promise.all(promises).then((data) => {
			dispatch({ type: types.LAYOUT_ALL_FETCH_SUCCESS });
		});
	},
	fetchProductsLayout: (dispatch, categoryId = "", tagId = "", page, index, name) => {
		if (page === 1) {
			return (dispatch) => {
				dispatch({ type: types.LAYOUT_FETCHING, extra: { index } });
				switch (name) {
					case "newArrival": {
						return (
							DokanWorker.getLatestProducts(page)
								.then( (json) => {
									if (json === undefined) {
										dispatch(actions.fetchProductsFailure(Languages.getDataError));
									} else if (json.code) {
										dispatch(actions.fetchProductsFailure(json.message));
									} else {
										dispatch({
											type:
												page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
											payload: json,
											extra: { index },
											finish: json.length === 0,
										});
									}
								})
						)
					}
					case "featuredProducts": {
						return (
							DokanWorker.getFeaturedProducts(page)
								.then( (json) => {
									if (json === undefined) {
										dispatch(actions.fetchProductsFailure(Languages.getDataError));
									} else if (json.code) {
										dispatch(actions.fetchProductsFailure(json.message));
									} else {
										dispatch({
											type:
												page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
											payload: json,
											extra: { index },
											finish: json.length === 0,
										});
									}
								})
						)
					}
					case "bestSellingProducts": {
						return (
							DokanWorker.getBestSellingProducts(page)
								.then( (json) => {
									if (json === undefined) {
										dispatch(actions.fetchProductsFailure(Languages.getDataError));
									} else if (json.code) {
										dispatch(actions.fetchProductsFailure(json.message));
									} else {
										dispatch({
											type:
												page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
											payload: json,
											extra: { index },
											finish: json.length === 0,
										});
									}
								})
						)
					}
					case "topRatedProducts": {
						return (
							DokanWorker.getTopRatedProducts(page)
								.then( (json) => {
									if (json === undefined) {
										dispatch(actions.fetchProductsFailure(Languages.getDataError));
									} else if (json.code) {
										dispatch(actions.fetchProductsFailure(json.message));
									} else {
										dispatch({
											type:
												page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
											payload: json,
											extra: { index },
											finish: json.length === 0,
										});
									}
								})
						)
					}
					default: {
						return WooWorker.productsByCategoryTag(categoryId, tagId, 10, page).then(
							(json) => {
								if (json === undefined) {
									dispatch(actions.fetchProductsFailure(Languages.getDataError));
								} else if (json.code) {
									dispatch(actions.fetchProductsFailure(json.message));
								} else {
									dispatch({
										type:
											page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
										payload: json,
										extra: { index },
										finish: json.length === 0,
									});
								}
							}
						);
					}
				}
			};
		} else {
			dispatch({ type: types.LAYOUT_FETCHING, extra: { index } });
			switch (name) {
				case "newArrival": {
					return (
						DokanWorker.getLatestProducts(page)
							.then( (json) => {
								if (json === undefined) {
									dispatch(actions.fetchProductsFailure(Languages.getDataError));
								} else if (json.code) {
									dispatch(actions.fetchProductsFailure(json.message));
								} else {
									dispatch({
										type:
											page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
										payload: json,
										extra: { index },
										finish: json.length === 0,
									});
								}
							})
					)
				}
				case "featuredProducts": {
					return (
						DokanWorker.getFeaturedProducts(page)
							.then( (json) => {
								if (json === undefined) {
									dispatch(actions.fetchProductsFailure(Languages.getDataError));
								} else if (json.code) {
									dispatch(actions.fetchProductsFailure(json.message));
								} else {
									dispatch({
										type:
											page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
										payload: json,
										extra: { index },
										finish: json.length === 0,
									});
								}
							})
					)
				}
				case "bestSellingProducts": {
					return (
						DokanWorker.getBestSellingProducts(page)
							.then( (json) => {
								if (json === undefined) {
									dispatch(actions.fetchProductsFailure(Languages.getDataError));
								} else if (json.code) {
									dispatch(actions.fetchProductsFailure(json.message));
								} else {
									dispatch({
										type:
											page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
										payload: json,
										extra: { index },
										finish: json.length === 0,
									});
								}
							})
					)
				}
				case "topRatedProducts": {
					return (
						DokanWorker.getTopRatedProducts(page)
							.then( (json) => {
								if (json === undefined) {
									dispatch(actions.fetchProductsFailure(Languages.getDataError));
								} else if (json.code) {
									dispatch(actions.fetchProductsFailure(json.message));
								} else {
									dispatch({
										type:
											page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
										payload: json,
										extra: { index },
										finish: json.length === 0,
									});
								}
							})
					)
				}
				default: {
					return WooWorker.productsByCategoryTag(categoryId, tagId, 10, page).then(
						(json) => {
							if (json === undefined) {
								dispatch(actions.fetchProductsFailure(Languages.getDataError));
							} else if (json.code) {
								dispatch(actions.fetchProductsFailure(json.message));
							} else {
								dispatch({
									type:
										page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
									payload: json,
									extra: { index },
									finish: json.length === 0,
								});
							}
						}
					);
				}
			}
		}
		
	},
	fetchProductsLayoutTagId: async (
		dispatch,
		categoryId = "",
		tagId = "",
		page,
		index
	) => {
		dispatch({ type: types.LAYOUT_FETCHING, extra: { index } });
		const json = await WooWorker.productsByCategoryTag(
			categoryId,
			tagId,
			10,
			page
		);

		if (json === undefined) {
			dispatch(actions.fetchProductsFailure(Languages.getDataError));
		} else if (json.code) {
			dispatch(actions.fetchProductsFailure(json.message));
		} else {
			dispatch({
				type: page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
				payload: json,
				extra: { index },
				finish: json.length === 0,
			});
		}
	},
	fetchProductsFailure: (error) => ({
		type: types.FETCH_PRODUCTS_FAILURE,
		error,
	}),
};

const initialState = {
	layout: HorizonLayouts,
	isFetching: false,
};

export const reducer = (state = initialState, action) => {
	const { extra, type, payload, finish } = action;

	switch (type) {
		case types.LAYOUT_ALL_FETCHING: {
			return {
				...state,
				isFetching: true,
			};
		}

		case types.LAYOUT_ALL_FETCH_SUCCESS: {
			return {
				...state,
				isFetching: false,
			};
		}

		case types.LAYOUT_FETCH_SUCCESS: {
			const layout = [];
			state.layout.map((item, index) => {
				if (index === extra.index) {
					layout.push({
						...item,
						list: flatten(payload),
						isFetching: false,
						finish
					});
				} else {
					layout.push(item);
				}
			});
			return {
				...state,
				layout,
			};
		}

		case types.LAYOUT_FETCH_MORE: {
			console.log("more")
			const layout = [];
			state.layout.map((item, index) => {
				if (index === extra.index) {
					layout.push({
						...item,
						list: item.list.concat(payload),
						isFetching: false,
						finish
					});
				} else {
					layout.push(item);
				}
			});
			return {
				...state,
				layout,
			};
		}

		case types.LAYOUT_FETCHING: {
			console.log("layout fetching");
			const layout = [];
			state.layout.map((item, index) => {
				if (index === extra.index) {
					layout.push({
						...item,
						isFetching: true,
					});
				} else {
					layout.push(item);
				}
			});
			return {
				...state,
				layout,
			};
		}

		default:
			return state;
	}
};
