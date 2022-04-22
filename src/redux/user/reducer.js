import { USER_LOGIN, USER_SIGNUP } from '../types';

const initialState = {
	// local storage?
	token: '',
	name: '',
	email: '',
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case USER_LOGIN:
			return { ...state, token: payload };
		default:
			return state;
	}
};