/** @format */

import { Constants, Languages } from '@common';
import DokanWorker from '@services/Dokan/DokanWorker';

const types = {
	FETCH_APP_BANNERS: 'FETCH_APP_BANNERS',
	FETCH_APP_BANNERS_PENDING: 'FETCH_APP_BANNERS_PENDING',
	FETCH_APP_BANNERS_SUCCESS: 'FETCH_APP_BANNERS_SUCCESS',
	FETCH_APP_BANNERS_FAIL: 'FETCH_APP_BANNERS_FAIL',
};

export const actions = {
	fetchAppBanners: dispatch => {
		DokanWorker.getAppBanner()
			.then(data => {
				if (data.length !== 0) {
					dispatch({
						type: types.FETCH_APP_BANNERS_SUCCESS,
						data,
					});
				} else {
					dispatch({
						type: types.FETCH_APP_BANNERS_FAIL,
						error: 'Fetching banners failed',
					});
				}
			})
			.catch(err => {
				console.log(err);
			});
	},
};

const initialState = {
	bannerItems: [],
	finish: false,
	error: '',
};

export const reducer = (state = initialState, action) => {
	const { type } = action;

	switch (type) {
		case types.FETCH_APP_BANNERS_FAIL: {
			return Object.assign({}, state, {
				finish: false,
				error: 'Fetching banners failed',
			});
		}
		case types.FETCH_APP_BANNERS_SUCCESS: {
			return Object.assign({}, state, {
				finish: true,
				bannerItems: action.data,
				error: null,
			});
		}
		default: {
			return state;
		}
	}
};
