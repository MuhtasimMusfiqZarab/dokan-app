/** @format */

import { Constants } from '@common';

export const actions = {
	addSpinner: () => {
		return { type: Constants.EmitCode.AddSpinner };
	},
	removeSpinner: () => {
		return { type: Constants.EmitCode.RemoveSpinner };
	},
};

const initialState = {
	isOpen: false,
};

export const reducer = (state = initialState, action) => {
	const { type } = action;

	switch (type) {
		case Constants.EmitCode.AddSpinner:
			return {
				...state,
				isOpen: true,
			};
		case Constants.EmitCode.RemoveSpinner:
			return {
				...state,
				isOpen: false,
			};
		default:
			return state;
	}
};
