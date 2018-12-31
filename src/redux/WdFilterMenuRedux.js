/** @format */

import { Constants } from "@common";

export const actions = {
	openFilterMenu: () => {
		return { type: Constants.EmitCode.FilterMenuOpen };
	},
	closeFilterMenu: () => {
		return { type: Constants.EmitCode.FilterMenuClose };
	},
	toggleFilterMenu: (isOpen) => {
		return { type: Constants.EmitCode.FilterMenuToggle, isOpen };
	},
};

const initialState = {
	isOpen: false,
};

export const reducer = (state = initialState, action) => {
	const { type, isOpen } = action;

	switch (type) {
		case Constants.EmitCode.FilterMenuOpen:
			return {
				...state,
				isOpen: true,
			};

		case Constants.EmitCode.FilterMenuClose:
			return {
				...state,
				isOpen: false,
			};
		case Constants.EmitCode.FilterMenuToggle:
			if (typeof isOpen === "undefined") {
				return {
					...state,
					isOpen: !state.isOpen,
				};
			}
			return {
				...state,
				isOpen,
			};

		default:
			return state;
	}
};
