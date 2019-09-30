/**
 * @format
 */

const types = {
	LOGOUT: 'LOGOUT',
	LOGIN: 'LOGIN_SUCCESS',
	FINISH_INTRO: 'FINISH_INTRO',
	CHANGE_USER_INFO: 'CHANGE_USER_INFO',
	UPDATE_USER_INFO: 'UPDATE_USER_INFO',
};

export const actions = {
	login: (user, token, loginType) => {
		return { type: types.LOGIN, user, token, loginType };
	},
	logout() {
		return { type: types.LOGOUT };
	},
	finishIntro() {
		return { type: types.FINISH_INTRO };
	},
	editUser() {
		return { types: types.CHANGE_USER_INFO };
	},
	updateUserInfo: user => {
		return { type: types.UPDATE_USER_INFO, user };
	},
};

const initialState = {
	user: null,
	token: null,
	loginType: 'regular',
	loggedIn: false,
	finishIntro: null,
};

export const reducer = (state = initialState, action) => {
	const { type, user, token, loginType } = action;

	switch (type) {
		case types.LOGOUT:
			return Object.assign({}, initialState);
		case types.LOGIN:
			return { ...state, user, token, loginType, loggedIn: true };
		case types.FINISH_INTRO:
			return { ...state, finishIntro: true };
		case types.UPDATE_USER_INFO:
			return { ...state, user };
		default:
			return state;
	}
};
