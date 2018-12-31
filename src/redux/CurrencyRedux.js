/**
 * @format
 */

// import { Languages, Constants } from '@common'
// import { warn, log } from '@app/Omni'
// import CurrencyWorker from '@services/CurrencyWorker'

const types = {
	CHANGE_CURRENCY: "CHANGE_CURRENCY",
};

export const actions = {
	changeCurrency: (dispatch, currency) => {
		dispatch({ type: types.CHANGE_CURRENCY, currency });
	},
};

const initialState = {
	symbol: "$",
	name: "US Dollar",
	symbol_native: "$",
	decimal_digits: 2,
	rounding: 0,
	code: "USD",
	name_plural: "US dollars",
};

export const reducer = (state = initialState, action) => {
	const { currency } = action;
	switch (action.type) {
		case types.CHANGE_CURRENCY:
			return Object.assign({}, state, { ...currency });
		default:
			return state;
	}
};
